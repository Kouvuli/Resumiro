import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import multer from 'multer'
import fs from 'fs'
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import CryptoJS from 'crypto-js'
import { Client } from 'pg'
import { createDiffieHellman } from 'crypto'

interface MulterRequest extends NextApiRequest {
  file: any
}

type Data = {
  message: string
  status: string
  data?: any
}
const outputFolderName = './public/uploads'
let timeNow = 0
let fileExtension = ''
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, outputFolderName)
  },
  filename: function (req, file, cb) {
    fileExtension = file.originalname.split('.').pop()!
    timeNow = Date.now()
    cb(null, `${file.fieldname}-${timeNow}.${fileExtension}`)
  }
})

var upload = multer({ storage: storage })

const apiRoute = nc<MulterRequest, NextApiResponse<Data>>({
  onError(error, req, res) {
    res.status(501).json({
      message: `Sorry something Happened! ${error.message}`,
      status: 'error'
    })
  },
  onNoMatch(req, res) {
    res
      .status(405)
      .json({ message: `Method '${req.method}' Not Allowed`, status: 'error' })
  }
})

apiRoute.use(upload.single('file'))

apiRoute.post(async (req, res) => {
  const file = req.file
  if (!file) {
    res
      .status(400)
      .json({ message: 'Khong co file trong request', status: 'error' })
  }

  let storageWeb3 = new Web3Storage({
    token: `${process.env.WEB3_STORAGE_API_KEY}`
  })


  const fileName = `${file.fieldname}-${timeNow}.${fileExtension}`
  // const pathFile = await getFilesFromPath(`${outputFolderName}/${fileName}`)
  const pathFile = `${outputFolderName}/${fileName}`

  // generate DH keys and get public key
  const dh = createDiffieHellman(256)
  const publicKey = dh.generateKeys('hex')

  // Fetch private key from PostgreSQL database using Diffie-Hellman algorithm
  const client = new Client({
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT!),
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
  })
  await client.connect()
  const { rows } = await client.query('SELECT private_key FROM key_table WHERE id=$1', [1])
  const privateKey = rows[0].private_key
  await client.end()

  // encrypt file content with AES
  const fileContent = fs.readFileSync(pathFile)
  const fileUint8Array = new Uint8Array(fileContent)
  const fileWordArray = CryptoJS.lib.WordArray.create(Array.from(fileUint8Array))
  const encryptedContent = CryptoJS.AES.encrypt(fileWordArray, privateKey).toString()
  

  // combine encrypted content and public key
  // const dataToUpload = JSON.stringify({ publicKey, encryptedContent })
  const dataToUpload = new Blob([JSON.stringify({ publicKey, encryptedContent })])


  const cid = await storageWeb3.put(dataToUpload, { name: fileName  })
  const url = `https://ipfs.io/ipfs/${cid}/${fileName}`
  fs.unlinkSync(`${outputFolderName}/${fileName}`)

  res.status(200).json({
    message: 'Upload file successfully',
    status: 'success',
    data: url
  })
})

export const config = {
  api: {
    bodyParser: false // Disallow body parsing, consume as stream
  }
}
export default apiRoute
