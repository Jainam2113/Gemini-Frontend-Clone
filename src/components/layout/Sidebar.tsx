import React from 'react'
import { ChatroomList } from '@/components/dashboard/ChatroomList'
import { CreateChatroom } from '@/components/dashboard/CreateChatroom'
import { SearchBar } from '@/components/dashboard/SearchBar'
import { useChat } from '@/hooks/useChat'

interface SidebarProps {
    onSelectChatroom: (id: string) => void
    selectedChatroomId?: string
    className?: string
}

export const Sidebar: React.FC<SidebarProps> = ({
                                                    onSelectChatroom,
                                                    selectedChatroomId,
                                                    className = ''
                                                }) => {
    const { chatrooms } = useChat()

    return (
        <div className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col ${className}`}>
            {/* Search bar */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <SearchBar />
            </div>

            {/* Create chatroom button */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <CreateChatroom />
            </div>

            {/* Chat list */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="mb-4">
                    <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Your Conversations ({chatrooms.length})
                    </h2>
                </div>
                <ChatroomList
                    onSelectChatroom={onSelectChatroom}
                    selectedChatroomId={selectedChatroomId}
                />
            </div>
        </div>
    )
}
