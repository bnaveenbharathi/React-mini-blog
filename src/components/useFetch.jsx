

import { useState, useEffect } from "react";



const useFetch = (url) => {

    const [data, SetData] = useState(null);
    const [isPending, setIsPending] = useState(true)
    const [error, SetError] = useState(null)

    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw Error("Could Not Fetch")
                }
                return res.json()
            }).then(data => {
                SetData(data)
                setIsPending(false)
            }).catch(err => {
                setIsPending(false)
                SetError(err.message)
            })

    },
     [url])
return {data,isPending,error}
}

export default useFetch