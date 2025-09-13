import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Moon, Sun } from 'lucide-react'
import { RootState } from '@/store'
import { toggleDarkMode } from '@/store/slices/uiSlice'
import { Button } from '@/components/ui/Button'

export const ThemeToggle: React.FC = () => {
    const dispatch = useDispatch()
    const isDarkMode = useSelector((state: RootState) => state.ui.isDarkMode)

    React.useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDarkMode])

    const handleToggle = () => {
        dispatch(toggleDarkMode())
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleToggle}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDarkMode ? (
                <Sun className="h-4 w-4" />
            ) : (
                <Moon className="h-4 w-4" />
            )}
        </Button>
    )
}