import { useState } from 'react'

const useJobSearch = () => {
    const [jobs, setJobs] = useState()
    const [jobName, setJobName] = useState()
    const onChangeHandler = (e) => {
        setJobName(e.target.value)
    }

    //we dont find any good api for jobs in github public apis this api i found but gave cores error either gave me the api or clearifly but u need
    const onSubmitHandler = async () => {
        const headers = new Headers()
        headers.append("Authorization", 'Token d2447ebe8746d3cf1c8ac02ef2442d0f1c84d300')
        headers.append("Content-Type", "application/json");
        try {
            const resp = await fetch(`https://findwork.dev/api/jobs/?location=london&search=${jobName}&sort_by=relevance`, {
                headers: headers,
                mode: 'cors'
            })
            const data = await resp.json()
            setJobs(data)

        } catch (e) {

            return e
        }
    }
    return {
        state: {
            jobs
        }, action: {
            onSubmitHandler,
            onChangeHandler
        }
    }
}

export default useJobSearch