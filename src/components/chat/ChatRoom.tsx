import React, { useEffect, useRef } from 'react'
import { MessageList } from './MessageList'
import { MessageInput } from './MessageInput'
import { TypingIndicator } from './TypingIndicator'
import { useChat } from '@/hooks/useChat'
import { ArrowLeft, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ChatRoomProps {
    chatroomId: string
    onBack: () => void
}

export const ChatRoom: React.FC<ChatRoomProps> = ({ chatroomId, onBack }) => {
    const { currentChatroom, setCurrentChatroom, isAITyping } = useChat()
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (chatroomId && chatroomId !== currentChatroom?.id) {
            setCurrentChatroom(chatroomId)
        }
    }, [chatroomId, currentChatroom?.id, setCurrentChatroom])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [currentChatroom?.messages, isAITyping])

    if (!currentChatroom) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Chatroom not found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        The chatroom you&apos;re looking for doesn&apos;t exist.
                    </p>
                    <Button onClick={onBack} className="mt-4">
                        Go Back
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onBack}
                        className="mr-3 md:hidden"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {currentChatroom.name}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {currentChatroom.messages.length} messages
                        </p>
                    </div>
                </div>
                <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-hidden">
                <MessageList />
                {isAITyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <MessageInput />
            </div>
        </div>
    )
}