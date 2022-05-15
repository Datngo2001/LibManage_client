import axiosClient from "./_axiosClient"

export async function getUsers() {
    const url = 'users'
    const response = await axiosClient.get(url)

    return response
}

export async function createUser(
    {
        username,
        password,
        groupIds,
        fname,
        lname
    }
) {
    const data = {
        username: username,
        password: password,
        groupIds: groupIds,
        fname: fname,
        lname: lname
    }
    const url = 'users'
    const response = await axiosClient.post(
        url,
        data
    )

    return response
}


export async function getUserById(id) {
    const url = `users/${id}`
    const response = await axiosClient.get(url)

    return response
}

export async function updateUser(id,
    {
        username,
        password,
        groupIds,
        fname,
        lname
    }
) {
    const url = `users/${id}`
    const data = {
        username: username,
        password: password,
        groupIds: groupIds,
        fname: fname,
        lname: lname
    }

    const response = await axiosClient.put(url, data)

    return response
}

export async function deleteUser(id) {
    const url = `users/${id}`
    const response = await axiosClient.delete(url)

    return response
}

export async function getUserBorrowStatus() {
    const url = `users/borrow/status`
    const response = await axiosClient.get(url)

    return response
}

export async function getUserBorrowNotify() {
    const url = `users/borrow/notifies`
    const response = await axiosClient.get(url)

    return response
}

export async function updateUserProfile(
    {
        username,
        password,
        fname,
        lname
    }
) {
    const url = `users/profile`
    const data = {
        username: username,
        password: password,
        fname: fname,
        lname: lname
    }

    const response = await axiosClient.put(url, data)

    return response
}
