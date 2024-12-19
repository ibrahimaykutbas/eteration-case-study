import { useState, useCallback } from 'react'

const useApi = apiFunc => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const request = useCallback(
    async (...args) => {
      setLoading(true)
      setError(null)

      try {
        const response = await apiFunc(...args)
        setData(response)
        return response
      } catch (error) {
        setError(error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [apiFunc]
  )

  return { data, error, loading, request }
}

export default useApi