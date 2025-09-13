import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { User, Country } from '../types'

interface AuthState {
    user: User | null
    countries: Country[]
    isLoading: boolean
    otpSent: boolean
    error: string | null
}

const initialState: AuthState = {
    user: null,
    countries: [],
    isLoading: false,
    otpSent: false,
    error: null
}

export const fetchCountries = createAsyncThunk(
    'auth/fetchCountries',
    async () => {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag')
        const countries = await response.json()
        return countries.filter((country: Country) => country.idd?.root)
    }
)

export const sendOTP = createAsyncThunk(
    'auth/sendOTP',
    async ({ phoneNumber: _phoneNumber, countryCode: _countryCode }: { phoneNumber: string, countryCode: string }) => {
        // Simulate API call
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve()
            }, 2000)
        })
    }
)

export const verifyOTP = createAsyncThunk(
    'auth/verifyOTP',
    async ({ otp, phoneNumber, countryCode }: { otp: string, phoneNumber: string, countryCode: string }) => {
        // Simulate OTP verification
        return new Promise<User>((resolve, reject) => {
            setTimeout(() => {
                if (otp === '123456') {
                    resolve({
                        id: Date.now().toString(),
                        phoneNumber,
                        countryCode,
                        isAuthenticated: true
                    })
                } else {
                    reject(new Error('Invalid OTP'))
                }
            }, 1500)
        })
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.otpSent = false
            state.error = null
        },
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.countries = action.payload
            })
            .addCase(sendOTP.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(sendOTP.fulfilled, (state) => {
                state.isLoading = false
                state.otpSent = true
            })
            .addCase(sendOTP.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message || 'Failed to send OTP'
            })
            .addCase(verifyOTP.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(verifyOTP.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
                state.otpSent = false
            })
            .addCase(verifyOTP.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message || 'Invalid OTP'
            })
    }
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
