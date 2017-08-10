let user = {
  mobile: '',
  name: '',
  avatar: ''
}

let token = null

export function getToken () {
  return token
}

export function setToken (val) {
  token = val
}

export default user
