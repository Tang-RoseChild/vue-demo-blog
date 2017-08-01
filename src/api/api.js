import axios from 'axios'
import mock from '../mock/mock.js'

// function get (url, callback, errCallback) {
//   axios.get(url)
//   .then(function (resp) {
//     callback(resp)
//   })
//   .catch(function (error) {
//     errCallback(error)
//   })
// }

function post (url, data, callback, errCallback) {
  axios.post(url, data)
  .then(function (resp) {
    callback(resp)
  })
  .catch(function (error) {
    console.log('error >> ', error)
    errCallback(error)
  })
}

let apiPrefix = '/api'
function BlogList (callback, errCallback) {
  if (process.env.NODE_ENV === 'development') {
    let resp = {data: {
      blogs: mock.blogs
    }}
    callback(resp)
  } else {
    post(apiPrefix + '/blog/list', null, callback, errCallback)
  }
}

function BlogUpload (data, callback, errCallback) {
  if (process.env.NODE_ENV === 'development') {
    let resp = {data: {
      success: data.tag === 'demo',
      blog: mock.uploadBlogInfo
    }}
    callback(resp)
  } else {
    post(apiPrefix + '/blog/upload', data, callback, errCallback)
  }
}

function BlogGet (data, callback, errCallback) {
  if (process.env.NODE_ENV === 'development') {
    let resp = {data: {
      blog: mock.blogs[0]
    }}
    callback(resp)
  } else {
    post(apiPrefix + '/blog/', data, callback, errCallback)
  }
}

function BlogUpdate (data, callback, errCallback) {
  if (process.env.NODE_ENV === 'development') {
    let resp = {data: {
      success: data.tag === 'demo',
      blog: mock.uploadBlogInfo
    }}
    callback(resp)
  } else {
    post(apiPrefix + '/blog/update', data, callback, errCallback)
  }
}

export const BlogAPI = {
  list: BlogList,
  upload: BlogUpload,
  get: BlogGet,
  update: BlogUpdate
}

function Login (data, callback, errCallback) {
  if (process.env.NODE_ENV === 'development') {
    let resp = {data: {success: false}}
    if (data.password === mock.loginInfo.password) {
      resp.data.success = true
      resp.data.account = mock.loginInfo
    }
    callback(resp)
  } else {
    post(apiPrefix + '/account/login', data, callback, errCallback)
  }
}

export const AdminAPI = {
  Login
}
