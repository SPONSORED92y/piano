import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useFetch = (url) => {
    const navigate = useNavigate()

    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController()
        fetch(url, {
            mode: 'cors',
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            signal: abortCont.signal,
        })
            .then(res => {
                if (!res.ok) {
                    navigate('/login')
                    // throw Error('could not fetch the data for that resource')
                }
                return res.json()
            })
            .then(data => {
                setIsPending(false)
                setData(data)
                // //console.log(data)
                setError(null)
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    //console.log('fetch aborted')
                } else {
                    setIsPending(false)
                    setError(err.message)
                }
            })

        return () => abortCont.abort()
    }, [url])

    return { data, isPending, error }
}
export default useFetch