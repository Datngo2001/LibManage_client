import axios from "axios"
import axiosClient from "./_axiosClient"

export async function searchBookTitle({ title, page, limit }, cancel) {
    const url = `booktitle/search`
    const response = await axiosClient.get(url, {
        params: {
            title: title,
            page: page,
            limit: limit
        },
        cancelToken: new axios.CancelToken(c => cancel = c)
    })

    return response
}

export async function getBookTitle() {
    const url = 'booktitle'
    const response = await axiosClient.get(url)

    return response
}

export async function getBookTitleById(id) {
    const url = `booktitle/${id}`
    const response = await axiosClient.get(url)

    return response
}

export async function createBookTitle(
    {
        title,
        author,
        image,
        description,
        categoryIds,
    }
) {
    const data = {
        title: title,
        author: author,
        image: image,
        description: description,
        categoryIds: categoryIds,
    }
    const url = 'booktitle'
    const response = await axiosClient.post(
        url,
        data
    )

    return response
}

export async function updateBookTitle(id,
    {
        title,
        author,
        image,
        description,
        categoryIds,
    }
) {
    const url = `booktitle/${id}`
    const data = {
        title: title,
        author: author,
        image: image,
        description: description,
        categoryIds: categoryIds,
    }

    const response = await axiosClient.put(url, data)

    return response
}

export async function deleteBookTitle(id) {
    const url = `booktitle/${id}`
    const response = await axiosClient.delete(url)

    return response
}

export async function getAllBooksByTitleId(id) {
    const url = `booktitle/${id}/books`
    const response = await axiosClient.get(url)

    return response
}

export async function getAllBooksAvalableByTitleId(id) {
    const url = `booktitle/${id}/books/avalable`
    const response = await axiosClient.get(url)

    return response
}