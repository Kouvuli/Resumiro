import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import multer from 'multer'
import fs from 'fs'
import { Web3Storage, getFilesFromPath } from 'web3.storage'

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
  const pathFile = await getFilesFromPath(`${outputFolderName}/${fileName}`)
  const cid = await storageWeb3.put(pathFile, { name: fileName })
  const url = `https://ipfs.io/ipfs/${cid}/${fileName}`
  fs.unlinkSync(`${outputFolderName}/${fileName}`)

  res.status(200).json({
    message: 'Upload file successfully',
    status: 'ok',
    data: url
  })
})

export const config = {
  api: {
    bodyParser: false // Disallow body parsing, consume as stream
  }
}
export default apiRoute
