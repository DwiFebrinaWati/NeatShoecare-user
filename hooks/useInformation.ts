// hooks/useInformation.ts
"use client"

import { useEffect, useState } from "react"

export interface Information {
  id?: string
  address?: string
  linkAddress?: string
  phoneNumber?: string
  instagramUsername?: string
  instagramLink?: string
  openHour?: string
  closeHour?: string
}

export function useInformation() {
  const [information, setInformation] = useState<Information | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    let mounted = true
    async function fetchInfo() {
      try {
        const res = await fetch("/api/information")
        const json = await res.json()
        if (!mounted) return
        setInformation(Array.isArray(json.data) ? json.data[0] : json.data)
      } catch (err) {
        if (!mounted) return
        setError(err)
      } finally {
        if (!mounted) return
        setLoading(false)
      }
    }
    fetchInfo()
    return () => {
      mounted = false
    }
  }, [])

  return { information, loading, error }
}
