import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Chatroom, Message } from '../types'

interface ChatState {
    chatrooms: Chatroom[]
    currentChatroom: string | null
    isLoadingMessages: boolean
    isAITyping: boolean
    messagePage: number
    hasMoreMessages: boolean
}

const initialState: ChatState = {
    chatrooms: [],
    currentChatroom: null,
    isLoadingMessages: false,
    isAITyping: false,
    messagePage: 1,
    hasMoreMessages: true
}

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async ({ chatroomId, content, type = 'text', imageUrl }: {
        chatroomId: string,
        content: string,
        type?: 'text' | 'image',
        imageUrl?: string
    }, { dispatch }) => {
        const userMessage: Message = {
            id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            content,
            sender: 'user',
            timestamp: Date.now(),
            type,
            imageUrl
        }

        // Simulate AI response with throttling
        setTimeout(() => {
            dispatch(setAITyping(true))
        }, 500)

        setTimeout(() => {
            const aiMessage: Message = {
                id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                content: generateAIResponse(),
                sender: 'ai',
                timestamp: Date.now() + 1000,
                type: 'text'
            }
            dispatch(addAIMessage({ chatroomId, message: aiMessage }))
            dispatch(setAITyping(false))
        }, 2000 + Math.random() * 2000)

        return { chatroomId, message: userMessage }
    }
)

const generateAIResponse = (): string => {
    const responses = [
        "That's an interesting point! Let me think about that...",
        "I understand what you're asking. Here's my perspective:",
        "Great question! Based on what you've shared:",
        "I can help you with that. Consider this approach:",
        "Thanks for sharing that information. My analysis suggests:",
        "Let me provide you with a comprehensive answer:"
    ]
    return responses[Math.floor(Math.random() * responses.length)] + " " +
        "This is a simulated AI response to demonstrate the chat functionality."
}

// REMOVE THE loadMoreMessages function - no more auto dummy messages
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        createChatroom: (state, action: PayloadAction<{ name: string }>) => {
            const newChatroom: Chatroom = {
                id: `chatroom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                name: action.payload.name,
                messages: [], // Start with empty messages - no dummy data
                createdAt: Date.now()
            }
            state.chatrooms.unshift(newChatroom)
        },
        deleteChatroom: (state, action: PayloadAction<string>) => {
            state.chatrooms = state.chatrooms.filter(room => room.id !== action.payload)
            if (state.currentChatroom === action.payload) {
                state.currentChatroom = null
            }
        },
        setCurrentChatroom: (state, action: PayloadAction<string>) => {
            state.currentChatroom = action.payload
            state.messagePage = 1
            state.hasMoreMessages = false // Disable infinite scroll
        },
        addUserMessage: (state, action: PayloadAction<{ chatroomId: string, message: Message }>) => {
            const chatroom = state.chatrooms.find(room => room.id === action.payload.chatroomId)
            if (chatroom) {
                chatroom.messages.push(action.payload.message)
                chatroom.lastMessage = action.payload.message
            }
        },
        addAIMessage: (state, action: PayloadAction<{ chatroomId: string, message: Message }>) => {
            const chatroom = state.chatrooms.find(room => room.id === action.payload.chatroomId)
            if (chatroom) {
                chatroom.messages.push(action.payload.message)
                chatroom.lastMessage = action.payload.message
            }
        },
        setAITyping: (state, action: PayloadAction<boolean>) => {
            state.isAITyping = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.fulfilled, (state, action) => {
                const { chatroomId, message } = action.payload
                const chatroom = state.chatrooms.find(room => room.id === chatroomId)
                if (chatroom) {
                    chatroom.messages.push(message)
                    chatroom.lastMessage = message
                }
            })
    }
})

export const {
    createChatroom,
    deleteChatroom,
    setCurrentChatroom,
    addUserMessage,
    addAIMessage,
    setAITyping
} = chatSlice.actions
export default chatSlice.reducer