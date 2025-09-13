import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { phoneSchema, PhoneFormData } from '@/lib/validations'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { CountrySelector } from './CountrySelector'

interface LoginFormProps {
    onOTPSent: (phoneNumber: string, countryCode: string) => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ onOTPSent }) => {
    const { sendOTP, isLoading } = useAuth()
    const [selectedCountry, setSelectedCountry] = useState<string>('')

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm<PhoneFormData>({
        resolver: zodResolver(phoneSchema)
    })

    const countryCode = watch('countryCode')

    React.useEffect(() => {
        setValue('countryCode', selectedCountry)
    }, [selectedCountry, setValue])

    const onSubmit = async (data: PhoneFormData) => {
        await sendOTP(data.phoneNumber, data.countryCode)
        onOTPSent(data.phoneNumber, data.countryCode)
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Welcome to Gemini Clone
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Enter your phone number to get started
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <CountrySelector
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                    error={errors.countryCode?.message}
                />

                <Input
                    {...register('phoneNumber')}
                    type="tel"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    error={errors.phoneNumber?.message}
                    disabled={isLoading}
                />

                <Button
                    type="submit"
                    className="w-full"
                    loading={isLoading}
                    disabled={!countryCode}
                >
                    Send OTP
                </Button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    )
}