import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/Button'
import { MessageCircle, LogOut, Menu } from 'lucide-react'

interface HeaderProps {
    onMenuClick?: () => void
    showMenuButton?: boolean
}

export const Header: React.FC<HeaderProps> = ({
                                                  onMenuClick,
                                                  showMenuButton = false
                                              }) => {
    const { user, logout } = useAuth()

    return (
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    {showMenuButton && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onMenuClick}
                            className="md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    )}
                    <div className="flex items-center space-x-2">
                        <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                            Gemini Clone
                        </h1>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    {user && (
                        <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-400">
                            {user.countryCode} {user.phoneNumber}
                        </div>
                    )}
                    <ThemeToggle />
                    {user && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={logout}
                            title="Logout"
                        >
                            <LogOut className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
        </header>
    )
}
