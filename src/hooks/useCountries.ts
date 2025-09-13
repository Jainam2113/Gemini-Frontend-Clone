import { useState, useEffect } from 'react'
import { Country } from '@/store/types'

export const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCountries = async () => {
            setLoading(true)
            setError(null)

            try {
                const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag')
                const data = await response.json()

                const filteredCountries = data
                    .filter((country: Country) => country.idd?.root)
                    .sort((a: Country, b: Country) => a.name.common.localeCompare(b.name.common))

                setCountries(filteredCountries)
            } catch {
                setError('Failed to fetch countries')
            } finally {
                setLoading(false)
            }
        }

        fetchCountries()
    }, [])

    return { countries, loading, error }
}
