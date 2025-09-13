export interface User {
    id: string
    phoneNumber: string
    countryCode: string
    isAuthenticated: boolean
}

export interface Country {
    name: {
        common: string
    }
    cca2: string
    idd: {
        root: string
        suffixes: string[]
    }
    flag: string
}

export interface Message {
    id: string
    content: string
    sender: 'user' | 'ai'
    timestamp: number
    type: 'text' | 'image'
    imageUrl?: string
}

export interface Chatroom {
    id: string
    name: string
    messages: Message[]
    createdAt: number
    lastMessage?: Message
}

export interface UIState {
    isDarkMode: boolean
    isLoading: boolean
    searchQuery: string
    toasts: Array<{
        id: string
        message: string
        type: 'success' | 'error' | 'info'
    }>
}

export interface AuthState {
    user: User | null
    countries: Country[]
    isLoading: boolean
    otpSent: boolean
    error: string | null
}

export interface ChatState {
    chatrooms: Chatroom[]
    currentChatroom: string | null
    isLoadingMessages: boolean
    isAITyping: boolean
    messagePage: number
    hasMoreMessages: boolean
}
