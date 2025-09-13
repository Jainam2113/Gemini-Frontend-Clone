'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { redirect } from 'next/navigation'
import { useParams } from 'next/navigation'
import { RootState } from '@/store'
import { ChatRoom } from '@/components/chat/ChatRoom'
import { useRouter } from 'next/navigation'

export default function ChatPage() {
    const router = useRouter()
    const params = useParams()
    const chatroomId = params.id as string

    const isAuthenticated = useSelector((state: RootState) => state.auth.user?.isAuthenticated)

    if (!isAuthenticated) {
        redirect('/auth')
    }

    const handleBack = () => {
        router.push('/dashboard')
    }

    return (
        <div className="h-screen bg-gray-50 dark:bg-gray-900">
            <ChatRoom chatroomId={chatroomId} onBack={handleBack} />
        </div>
    )
}