import axiosClient from "./_axiosClient"

export async function getPermission() {
    const url = 'permission'
    const response = await axiosClient.get(url)

    return response
}

export async function getGroupById(id) {
    const url = `permission/${id}`
    const response = await axiosClient.get(url)

    return response
}