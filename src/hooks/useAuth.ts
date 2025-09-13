import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { RootState, AppDispatch } from '@/store'
import { logout, sendOTP, verifyOTP, fetchCountries } from '@/store/slices/authSlice'
import { addToast } from '@/store/slices/uiSlice'
import { TOAST_MESSAGES } from '@/lib/constants'

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>()
    const auth = useSelector((state: RootState) => state.auth)

    const handleSendOTP = useCallback(async (phoneNumber: string, countryCode: string) => {
        try {
            await dispatch(sendOTP({ phoneNumber, countryCode })).unwrap()
            dispatch(addToast({ message: TOAST_MESSAGES.OTP_SENT, type: 'success' }))
        } catch {
            dispatch(addToast({ message: TOAST_MESSAGES.ERROR_GENERIC, type: 'error' }))
        }
    }, [dispatch])

    const handleVerifyOTP = useCallback(async (otp: string, phoneNumber: string, countryCode: string) => {
        try {
            await dispatch(verifyOTP({ otp, phoneNumber, countryCode })).unwrap()
            dispatch(addToast({ message: TOAST_MESSAGES.LOGIN_SUCCESS, type: 'success' }))
            return true
        } catch {
            dispatch(addToast({ message: TOAST_MESSAGES.OTP_INVALID, type: 'error' }))
            return false
        }
    }, [dispatch])

    const handleLogout = useCallback(() => {
        dispatch(logout())
        dispatch(addToast({ message: TOAST_MESSAGES.LOGOUT_SUCCESS, type: 'success' }))
    }, [dispatch])

    const handleFetchCountries = useCallback(() => {
        dispatch(fetchCountries())
    }, [dispatch])

    return {
        ...auth,
        sendOTP: handleSendOTP,
        verifyOTP: handleVerifyOTP,
        logout: handleLogout,
        fetchCountries: handleFetchCountries
    }
}
