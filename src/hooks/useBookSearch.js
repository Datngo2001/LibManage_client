import axios from 'axios';
import { useEffect, useState } from 'react'
import axiosClient from '../api/_axiosClient';

function useBookSearch(query, page, limit) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [books, setBooks] = useState([])
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        setBooks([])
    }, [query])

    useEffect(() => {
        let cancel;
        setLoading(true)
        setError(false)
        axiosClient.request({
            method: 'GET',
            url: 'booktitle/search',
            params: {
                title: query,
                page: page,
                limit: limit
            },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setLoading(false)
            setBooks(books => [...books, ...res.data])
            setHasMore(res.data.length > 0)
        }).catch(err => {
            if (axios.isCancel(err)) return
            setError(true)
        })
        return () => cancel()
    }, [query, page])

    return { loading, error, books, hasMore }
}

export default useBookSearch