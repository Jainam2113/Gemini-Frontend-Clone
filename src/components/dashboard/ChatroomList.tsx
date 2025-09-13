import React, { useState } from 'react'
import { useChat } from '@/hooks/useChat'
import { formatTime } from '@/lib/utils'
import { MessageCircle, Trash2, Bot, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

interface ChatroomListProps {
    onSelectChatroom: (id: string) => void
    selectedChatroomId?: string
}

export const ChatroomList: React.FC<ChatroomListProps> = ({
                                                              onSelectChatroom,
                                                              selectedChatroomId
                                                          }) => {
    const { filteredChatrooms, deleteChatroom } = useChat()
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [chatroomToDelete, setChatroomToDelete] = useState<string | null>(null)

    const handleDeleteClick = (chatroomId: string, e: React.MouseEvent) => {
        e.stopPropagation()
        setChatroomToDelete(chatroomId)
        setDeleteModalOpen(true)
    }

    const confirmDelete = () => {
        if (chatroomToDelete) {
            deleteChatroom(chatroomToDelete)
            setDeleteModalOpen(false)
            setChatroomToDelete(null)
        }
    }

    if (filteredChatrooms.length === 0) {
        return (
            <div className="text-center py-8">
                <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No conversations yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Type in the search bar above to create your first chat
                    </p>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="space-y-3">
                {filteredChatrooms.map((chatroom) => (
                    <div
                        key={chatroom.id}
                        onClick={() => onSelectChatroom(chatroom.id)}
                        className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                            selectedChatroomId === chatroom.id
                                ? 'backdrop-blur-xl bg-blue-500/20 border-blue-300/30 shadow-lg shadow-blue-500/10 dark:bg-blue-600/20 dark:border-blue-500/30'
                                : 'backdrop-blur-sm bg-white/40 hover:bg-white/60 border-white/20 dark:bg-gray-800/40 dark:hover:bg-gray-700/60 dark:border-gray-700/20 hover:shadow-lg'
                        } border`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0 flex items-start space-x-3">
                                {/* Chat Avatar */}
                                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                                    selectedChatroomId === chatroom.id
                                        ? 'bg-blue-500 shadow-lg shadow-blue-500/25'
                                        : 'bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-600 dark:to-gray-700'
                                }`}>
                                    <MessageCircle className="h-5 w-5 text-white" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className={`text-sm font-medium truncate ${
                                        selectedChatroomId === chatroom.id
                                            ? 'text-blue-700 dark:text-blue-300'
                                            : 'text-gray-900 dark:text-white'
                                    }`}>
                                        {chatroom.name}
                                    </h3>

                                    {chatroom.lastMessage ? (
                                        <div className="flex items-center mt-1 space-x-1">
                                            {chatroom.lastMessage.sender === 'user' ? (
                                                <User className="h-3 w-3 text-gray-400 flex-shrink-0" />
                                            ) : (
                                                <Bot className="h-3 w-3 text-blue-400 flex-shrink-0" />
                                            )}
                                            <p className={`text-xs truncate ${
                                                selectedChatroomId === chatroom.id
                                                    ? 'text-blue-600 dark:text-blue-400'
                                                    : 'text-gray-600 dark:text-gray-400'
                                            }`}>
                                                {chatroom.lastMessage.type === 'image' ? '📷 Image' : chatroom.lastMessage.content}
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                            No messages yet
                                        </p>
                                    )}

                                    {/* Message count and time */}
                                    <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                        selectedChatroomId === chatroom.id
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-400'
                    }`}>
                      {chatroom.messages.length} messages
                    </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-500">
                      {chatroom.lastMessage
                          ? formatTime(chatroom.lastMessage.timestamp)
                          : formatTime(chatroom.createdAt)
                      }
                    </span>
                                    </div>
                                </div>
                            </div>

                            {/* Delete button */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => handleDeleteClick(chatroom.id, e)}
                                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded-lg"
                                >
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Delete confirmation modal with glassmorphism */}
            <Modal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Delete Conversation"
                size="sm"
            >
                <div className="space-y-4">
                    <div className="p-4 rounded-xl backdrop-blur-sm bg-red-50/50 dark:bg-red-900/20 border border-red-200/20 dark:border-red-700/20">
                        <p className="text-gray-700 dark:text-gray-300">
                            Are you sure you want to delete this conversation? This action cannot be undone and all messages will be permanently lost.
                        </p>
                    </div>
                    <div className="flex justify-end space-x-3">
                        <Button
                            variant="secondary"
                            onClick={() => setDeleteModalOpen(false)}
                            className="backdrop-blur-sm bg-white/60 dark:bg-gray-800/60"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="danger"
                            onClick={confirmDelete}
                            className="bg-red-500 hover:bg-red-600 text-white shadow-lg"
                        >
                            Delete Forever
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}