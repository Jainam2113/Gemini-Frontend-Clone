'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'

interface OTPFormProps {
    phoneNumber: string
    countryCode: string
    onBack: () => void
    onSuccess: () => void
}

export const OTPForm: React.FC<OTPFormProps> = ({
                                                    phoneNumber,
                                                    countryCode,
                                                    onBack,
                                                    onSuccess
                                                }) => {
    const { verifyOTP, sendOTP, isLoading } = useAuth()
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [resendTimer, setResendTimer] = useState(60)
    const [canResend, setCanResend] = useState(false)
    const [error, setError] = useState('')
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    useEffect(() => {
        const timer = setInterval(() => {
            setResendTimer((prev) => {
                if (prev <= 1) {
                    setCanResend(true)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const handleOTPChange = (index: number, value: string) => {
        if (value.length > 1) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)
        setError('')

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handleSubmit = async () => {
        const otpValue = otp.join('')
        if (otpValue.length !== 6) {
            setError('Please enter complete OTP')
            return
        }

        try {
            const success = await verifyOTP(otpValue, phoneNumber, countryCode)
            if (success) {
                onSuccess()
            }
        } catch {
            setError('Invalid OTP. Please try again.')
        }
    }

    const handleResend = async () => {
        if (!canResend) return

        await sendOTP(phoneNumber, countryCode)
        setResendTimer(60)
        setCanResend(false)
        setOtp(['', '', '', '', '', ''])
        inputRefs.current[0]?.focus()
    }

    return (
        <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
            <button
                onClick={onBack}
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
            </button>

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Enter OTP
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    We&apos;ve sent a 6-digit code to {countryCode} {phoneNumber}
                </p>
            </div>

            <div className="space-y-6">
                <div className="flex justify-center space-x-3">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                inputRefs.current[index] = el
                            }}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 transition-all"
                            value={digit}
                            onChange={(e) => handleOTPChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            disabled={isLoading}
                            maxLength={1}
                        />
                    ))}
                </div>

                {error && (
                    <p className="text-sm text-red-600 dark:text-red-400 text-center">
                        {error}
                    </p>
                )}

                <Button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                    disabled={isLoading || otp.join('').length !== 6}
                >
                    {isLoading ? 'Verifying...' : 'Verify OTP'}
                </Button>

                <div className="text-center">
                    {canResend ? (
                        <button
                            onClick={handleResend}
                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                            disabled={isLoading}
                        >
                            Resend OTP
                        </button>
                    ) : (
                        <p className="text-gray-600 dark:text-gray-400">
                            Resend OTP in {resendTimer}s
                        </p>
                    )}
                </div>
            </div>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    For testing, use OTP: <span className="font-mono font-bold text-green-600">123456</span>
                </p>
            </div>
        </div>
    )
}