import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Search, X } from 'lucide-react'
import { RootState } from '@/store'
import { setSearchQuery } from '@/store/slices/uiSlice'
import { useDebounce } from '@/hooks/useDebounce'

export const SearchBar: React.FC = () => {
    const dispatch = useDispatch()
    const searchQuery = useSelector((state: RootState) => state.ui.searchQuery)
    const debouncedSearchQuery = useDebounce(searchQuery, 300)

    React.useEffect(() => {
        // This effect will run when debouncedSearchQuery changes
        // The actual filtering is handled in the useChat hook
    }, [debouncedSearchQuery])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value))
    }

    const clearSearch = () => {
        dispatch(setSearchQuery(''))
    }

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
                type="text"
                placeholder="Search chatrooms..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            />
            {searchQuery && (
                <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
            )}
        </div>
    )
}
