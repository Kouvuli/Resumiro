import CryptoJS from 'crypto-js'

export const randomToken = () => {
  return Math.random().toString(36).substr(2)
}

export const encryptText = (text: string, key: string): string => {
  const encryptedText = CryptoJS.AES.encrypt(text, key).toString()
  return encryptedText
}

export const decryptText = (encryptedText: string, key: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, key)
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8)
  return decryptedText
}
