import React from 'react'
import { Bot } from 'lucide-react'

export const TypingIndicator: React.FC = () => {
    return (
        <div className="flex justify-start px-4 pb-4">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg px-4 py-2 max-w-xs">
                <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
            Gemini is typing...
          </span>
                </div>
            </div>
        </div>
    )
}