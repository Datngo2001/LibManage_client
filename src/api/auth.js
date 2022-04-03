import axiosClient from "./_axiosClient"

export async function login({ username, password }) {
  const data = {
    username: username || '',
    password: password || ''
  }
  console.log(JSON.stringify(data))

  const url = 'login'
  const response = await axiosClient.post(
    url,
    data
  )

  return response.json()
}

export async function getUser() {

}

export async function signIn(email, password) {

}

export async function changePassword(email, recoveryCode) {

}

export async function resetPassword(email) {

}
