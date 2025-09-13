import React, { useState } from 'react'
import { ChatroomList } from './ChatroomList'
import { CreateChatroom } from './CreateChatroom'
import { SearchBar } from './SearchBar'
import { ChatRoom } from '@/components/chat/ChatRoom'
import { useAuth } from '@/hooks/useAuth'
import { useChat } from '@/hooks/useChat'
import { Button } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { LogOut, Send, Image, Sparkles } from 'lucide-react'

export const Dashboard: React.FC = () => {
    const { logout, user } = useAuth()
    const { chatrooms, createChatroom } = useChat()
    const [selectedChatroomId, setSelectedChatroomId] = useState<string | null>(null)
    const [showMobileChatList, setShowMobileChatList] = useState(true)
    const [centerSearchQuery, setCenterSearchQuery] = useState('')

    const handleSelectChatroom = (id: string) => {
        setSelectedChatroomId(id)
        setShowMobileChatList(false)
    }

    const handleBackToChatList = () => {
        setSelectedChatroomId(null)
        setShowMobileChatList(true)
    }

    const handleCenterSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (centerSearchQuery.trim()) {
            const newChatroomName = centerSearchQuery.length > 50 ? centerSearchQuery.slice(0, 50) + '...' : centerSearchQuery
            createChatroom(newChatroomName)
            setCenterSearchQuery('')

            // Find the newly created chatroom and select it
            setTimeout(() => {
                const newChatroom = chatrooms[0] // Latest chatroom
                if (newChatroom) {
                    handleSelectChatroom(newChatroom.id)
                }
            }, 100)
        }
    }

    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">

            {/* Sidebar */}
            <div className={`${
                showMobileChatList ? 'block' : 'hidden'
            } md:block w-full md:w-80 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 flex flex-col`}>

                {/* Header */}
                <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                <Sparkles className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Gemini Clone
                                </h1>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <ThemeToggle />
                            <Button variant="ghost" size="sm" onClick={logout}>
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {user?.countryCode} {user?.phoneNumber}
                    </div>

                    <SearchBar />
                </div>

                <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
                    <CreateChatroom />
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Recent ({chatrooms.length})
                    </h2>
                    <ChatroomList
                        onSelectChatroom={handleSelectChatroom}
                        selectedChatroomId={selectedChatroomId ?? undefined}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className={`${showMobileChatList ? 'hidden' : 'block'} md:block flex-1 flex flex-col`}>
                {selectedChatroomId ? (
                    <ChatRoom chatroomId={selectedChatroomId} onBack={handleBackToChatList} />
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl">

                        {/* Gemini-style interface */}
                        <div className="w-full max-w-3xl mx-auto px-6 py-12">

                            {/* Header */}
                            <div className="text-center mb-12">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-2xl">
                                    <Sparkles className="h-10 w-10 text-white" />
                                </div>
                                <h1 className="text-5xl font-light text-gray-800 dark:text-gray-200 mb-2">
                                    Hello, Friend
                                </h1>
                                <p className="text-xl text-gray-600 dark:text-gray-400">
                                    How can I help you today?
                                </p>
                            </div>

                            {/* Search bar */}
                            <form onSubmit={handleCenterSearchSubmit} className="mb-8">
                                <div className="relative flex items-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-2xl hover:shadow-3xl transition-all duration-300">
                                    <input
                                        type="text"
                                        value={centerSearchQuery}
                                        onChange={(e) => setCenterSearchQuery(e.target.value)}
                                        placeholder="Enter a prompt here"
                                        className="flex-1 bg-transparent border-none outline-none px-6 py-4 text-lg text-gray-800 dark:text-gray-200 placeholder-gray-500"
                                    />

                                    <div className="flex items-center pr-2">
                                        <button type="button" className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                            <Image className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                        </button>

                                        <button
                                            type="submit"
                                            disabled={!centerSearchQuery.trim()}
                                            className={`p-3 rounded-full transition-all ml-2 ${
                                                centerSearchQuery.trim()
                                                    ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                                            }`}
                                        >
                                            <Send className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {/* Suggestion chips */}
                            <div className="flex flex-wrap gap-3 justify-center">
                                {[
                                    "Explain quantum computing",
                                    "Write a story about a magic backpack",
                                    "Help me plan a trip to Japan",
                                    "What are some creative writing prompts?"
                                ].map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCenterSearchQuery(suggestion)}
                                        className="px-4 py-2 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 text-sm text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-200"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="text-center pb-8">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Gemini may display inaccurate info, including about people, so double-check its responses.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}