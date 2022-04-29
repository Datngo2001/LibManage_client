import axiosClient from "./_axiosClient"

export async function getBorrowBill() {
    const url = 'borrowbill'
    const response = await axiosClient.get(url)

    return response
}

export async function getBorrowBillById(id) {
    const url = `borrowbill/${id}`
    const response = await axiosClient.get(url)

    return response
}


export async function createBorrowBill(
    {
        userId,
        planReturnDate,
        bookIds,
    }
) {
    const data = {
        userId: userId,
        planReturnDate: planReturnDate,
        bookIds: bookIds,
    }
    const url = 'borrowbill'
    const response = await axiosClient.post(
        url,
        data
    )

    return response
}

export async function updateBorrowBill(id,
    {
        userId,
        planReturnDate,
        bookIds,
    }
) {
    const url = `borrowbill/${id}`
    const data = {
        userId: userId,
        planReturnDate: planReturnDate,
        bookIds: bookIds,
    }

    const response = await axiosClient.put(url, data)

    return response
}

export async function deleteBorrowBill(id) {
    const url = `borrowbill/${id}`
    const response = await axiosClient.delete(url)

    return response
}