import { useEffect, useState } from "react"

export function swr<T>(fn: () => Promise<T>) {
  let [loading, setLoading] = useState(false)
  let [value, setValue] = useState(undefined as undefined | T)
  let [error, setError] = useState(undefined as any)
  useEffect(() => {
    let outdate = false
    setLoading(true)
    fn().then(v => {
      setValue(v)
      setLoading(false)
    }).catch(e => {
      setError(e)
      setLoading(false)
    })
    return () => { outdate = true }
  }, [])
  return [loading, value, error]
}