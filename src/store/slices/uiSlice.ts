import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
    isDarkMode: boolean
    isLoading: boolean
    searchQuery: string
    toasts: Array<{
        id: string
        message: string
        type: 'success' | 'error' | 'info'
    }>
}

const initialState: UIState = {
    isDarkMode: false,
    isLoading: false,
    searchQuery: '',
    toasts: []
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload
        },
        addToast: (state, action: PayloadAction<{ message: string, type: 'success' | 'error' | 'info' }>) => {
            const toast = {
                id: Date.now().toString(),
                ...action.payload
            }
            state.toasts.push(toast)
        },
        removeToast: (state, action: PayloadAction<string>) => {
            state.toasts = state.toasts.filter(toast => toast.id !== action.payload)
        }
    }
})

export const { toggleDarkMode, setLoading, setSearchQuery, addToast, removeToast } = uiSlice.actions
export default uiSlice.reducer