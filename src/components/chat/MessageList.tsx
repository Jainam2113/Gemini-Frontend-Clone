import React, { useEffect, useRef } from 'react'
import { useChat } from '@/hooks/useChat'
import { formatTime, copyToClipboard } from '@/lib/utils'
import { Copy, User, Bot } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { addToast } from '@/store/slices/uiSlice'
import { TOAST_MESSAGES } from '@/lib/constants'

export const MessageList: React.FC = () => {
    const dispatch = useDispatch()
    const { currentChatroom } = useChat()
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [currentChatroom?.messages])

    const handleCopyMessage = async (content: string) => {
        try {
            await copyToClipboard(content)
            dispatch(addToast({ message: TOAST_MESSAGES.MESSAGE_COPIED, type: 'success' }))
        } catch {
            dispatch(addToast({ message: 'Failed to copy message', type: 'error' }))
        }
    }

    if (!currentChatroom) return null

    const messages = currentChatroom.messages

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {messages.length === 0 ? (
                <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Bot className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                        Start a conversation
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Send a message to begin chatting with Gemini
                    </p>
                </div>
            ) : (
                messages.map((message) => (
                    <div
                        key={message.id} // Now using proper unique IDs
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`group relative max-w-[80%] md:max-w-[70%] ${
                            message.sender === 'user' ? 'mr-4' : 'ml-4'
                        }`}>

                            {/* Message bubble */}
                            <div className={`px-6 py-4 rounded-3xl shadow-lg backdrop-blur-sm border ${
                                message.sender === 'user'
                                    ? 'bg-blue-500 text-white border-blue-400/20'
                                    : 'bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-white border-white/20 dark:border-gray-700/20'
                            }`}>

                                {/* Sender info */}
                                <div className={`flex items-center mb-2 ${
                                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                                }`}>
                                    {message.sender === 'user' ? (
                                        <>
                                            <span className="text-xs opacity-75 mr-2">You</span>
                                            <User className="h-3 w-3" />
                                        </>
                                    ) : (
                                        <>
                                            <Bot className="h-3 w-3 mr-2" />
                                            <span className="text-xs opacity-75">Gemini</span>
                                        </>
                                    )}
                                </div>

                                {/* Message content */}
                                {message.type === 'image' && message.imageUrl ? (
                                    <div className="mb-3">
                                        <img
                                            src={message.imageUrl}
                                            alt="Uploaded"
                                            className="max-w-full h-auto rounded-2xl shadow-md"
                                        />
                                        {message.content && (
                                            <p className="mt-3 whitespace-pre-wrap break-words">{message.content}</p>
                                        )}
                                    </div>
                                ) : (
                                    <p className="whitespace-pre-wrap break-words leading-relaxed">{message.content}</p>
                                )}

                                {/* Timestamp */}
                                <div className={`text-xs opacity-60 mt-2 ${
                                    message.sender === 'user' ? 'text-right' : 'text-left'
                                }`}>
                                    {formatTime(message.timestamp)}
                                </div>
                            </div>

                            {/* Copy button */}
                            <button
                                onClick={() => handleCopyMessage(message.content)}
                                className={`absolute top-2 ${
                                    message.sender === 'user' ? 'left-2' : 'right-2'
                                } opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20`}
                                title="Copy message"
                            >
                                <Copy className="h-3 w-3" />
                            </button>
                        </div>
                    </div>
                ))
            )}
            <div ref={messagesEndRef} />
        </div>
    )
}
