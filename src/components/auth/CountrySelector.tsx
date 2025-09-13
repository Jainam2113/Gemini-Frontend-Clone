import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { useCountries } from '@/hooks/useCountries'
import { cn } from '@/lib/utils'

interface CountrySelectorProps {
    value: string
    onChange: (value: string) => void
    error?: string
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
                                                                    value,
                                                                    onChange,
                                                                    error
                                                                }) => {
    const { countries, loading } = useCountries()
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const dropdownRef = useRef<HTMLDivElement>(null)

    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.cca2.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const selectedCountry = countries.find(country =>
        country.idd.root + (country.idd.suffixes?.[0] || '') === value
    )

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleSelect = (country: any) => {
        const dialCode = country.idd.root + (country.idd.suffixes?.[0] || '')
        onChange(dialCode)
        setIsOpen(false)
        setSearchQuery('')
    }

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Country
            </label>
            <div className="relative" ref={dropdownRef}>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        'flex h-10 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white',
                        error && 'border-red-500 focus:ring-red-500'
                    )}
                    disabled={loading}
                >
                    <div className="flex items-center">
                        {selectedCountry ? (
                            <>
                                <span className="mr-2">{selectedCountry.flag}</span>
                                <span>{selectedCountry.name.common}</span>
                                <span className="ml-2 text-gray-500">
                  ({selectedCountry.idd.root}{selectedCountry.idd.suffixes?.[0]})
                </span>
                            </>
                        ) : (
                            <span className="text-gray-500">Select country</span>
                        )}
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>

                {isOpen && (
                    <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800">
                        <div className="p-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search countries..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                        </div>
                        <div className="max-h-60 overflow-auto">
                            {filteredCountries.map((country) => (
                                <button
                                    key={country.cca2}
                                    type="button"
                                    onClick={() => handleSelect(country)}
                                    className="flex w-full items-center px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <span className="mr-3">{country.flag}</span>
                                    <span className="flex-1">{country.name.common}</span>
                                    <span className="text-sm text-gray-500">
                    {country.idd.root}{country.idd.suffixes?.[0]}
                  </span>
                                </button>
                            ))}
                            {filteredCountries.length === 0 && (
                                <div className="px-3 py-2 text-gray-500">No countries found</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {error && (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
        </div>
    )
}