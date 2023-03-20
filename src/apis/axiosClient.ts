import axios, { ParamsSerializerOptions } from 'axios'
import queryString from 'query-string'

const request = (url: string) => {
  const axiosClient = axios.create({
    baseURL: url,
    headers: {
      'content-type': 'application/json'
    },
    paramsSerializer: {
      serialize: (params: ParamsSerializerOptions) => {
        return queryString.stringify(params)
      }
    }
  })

  axiosClient.interceptors.request.use(async config => {
    // if (config.url === '/auth/signin') {
    //   config.method = 'POST'
    // }
    // if (config.url === '/file') {
    //   config.headers['content-Type'] = 'multipart/form-data'
    // }
    return config
  })
  axiosClient.interceptors.response.use(
    response => {
      // if (response && response.data) {
      //   return response.data
      // }
      return response
    },
    error => {
      throw error
    }
  )
  return axiosClient
}

export default request
