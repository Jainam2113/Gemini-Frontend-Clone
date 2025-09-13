'use client'

import React, { useState } from 'react'
import { LoginForm } from '@/components/auth/LoginForm'
import { OTPForm } from '@/components/auth/OTPForm'
import { useRouter } from 'next/navigation'

const AuthPage: React.FC = () => {
    const router = useRouter()
    const [showOTP, setShowOTP] = useState(false)
    const [phoneData, setPhoneData] = useState<{
        phoneNumber: string
        countryCode: string
    } | null>(null)

    const handleOTPSent = (phoneNumber: string, countryCode: string) => {
        setPhoneData({ phoneNumber, countryCode })
        setShowOTP(true)
    }

    const handleBackToLogin = () => {
        setShowOTP(false)
        setPhoneData(null)
    }

    const handleLoginSuccess = () => {
        router.push('/')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                    {showOTP && phoneData ? (
                        <OTPForm
                            phoneNumber={phoneData.phoneNumber}
                            countryCode={phoneData.countryCode}
                            onBack={handleBackToLogin}
                            onSuccess={handleLoginSuccess}
                        />
                    ) : (
                        <LoginForm onOTPSent={handleOTPSent} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default AuthPage
