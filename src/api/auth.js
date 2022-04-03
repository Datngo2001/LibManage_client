import axiosClient from "./_axiosClient"

export async function login({ username, password }) {
  const data = {
    username: username || '',
    password: password || ''
  }

  const url = 'login'
  const response = await axiosClient.post(
    url,
    data
  )

  return response
}

export async function getUser() {

}

export async function signIn(email, password) {

}

export async function changePassword(email, recoveryCode) {

}

export async function resetPassword(email) {

}
