import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { RootState, AppDispatch } from '@/store'
import {
    createChatroom,
    deleteChatroom,
    setCurrentChatroom,
    sendMessage
} from '@/store/slices/chatSlice'
import { addToast } from '@/store/slices/uiSlice'
import { TOAST_MESSAGES } from '@/lib/constants'

export const useChat = () => {
    const dispatch = useDispatch<AppDispatch>()
    const chat = useSelector((state: RootState) => state.chat)
    const searchQuery = useSelector((state: RootState) => state.ui.searchQuery)

    const filteredChatrooms = chat.chatrooms.filter(room =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const currentChatroom = chat.chatrooms.find(room => room.id === chat.currentChatroom)

    const handleCreateChatroom = useCallback((name: string) => {
        dispatch(createChatroom({ name }))
        dispatch(addToast({ message: TOAST_MESSAGES.CHATROOM_CREATED, type: 'success' }))
    }, [dispatch])

    const handleDeleteChatroom = useCallback((id: string) => {
        dispatch(deleteChatroom(id))
        dispatch(addToast({ message: TOAST_MESSAGES.CHATROOM_DELETED, type: 'success' }))
    }, [dispatch])

    const handleSetCurrentChatroom = useCallback((id: string) => {
        dispatch(setCurrentChatroom(id))
    }, [dispatch])

    const handleSendMessage = useCallback((content: string, type: 'text' | 'image' = 'text', imageUrl?: string) => {
        if (!chat.currentChatroom) return
        if (!content.trim() && !imageUrl) return

        dispatch(sendMessage({
            chatroomId: chat.currentChatroom,
            content: content || 'Image',
            type,
            imageUrl
        }))
    }, [dispatch, chat.currentChatroom])

    return {
        ...chat,
        filteredChatrooms,
        currentChatroom,
        createChatroom: handleCreateChatroom,
        deleteChatroom: handleDeleteChatroom,
        setCurrentChatroom: handleSetCurrentChatroom,
        sendMessage: handleSendMessage
    }
}