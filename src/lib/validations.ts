import { z } from 'zod'

export const phoneSchema = z.object({
    countryCode: z.string().min(1, 'Country code is required'),
    phoneNumber: z.string()
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, 'Phone number must not exceed 15 digits')
        .regex(/^\d+$/, 'Phone number must contain only digits')
})

export const otpSchema = z.object({
    otp: z.string()
        .length(6, 'OTP must be exactly 6 digits')
        .regex(/^\d+$/, 'OTP must contain only digits')
})

export const messageSchema = z.object({
    content: z.string()
        .min(1, 'Message cannot be empty')
        .max(1000, 'Message must not exceed 1000 characters')
})

export const chatroomSchema = z.object({
    name: z.string()
        .min(1, 'Chatroom name is required')
        .max(50, 'Chatroom name must not exceed 50 characters')
        .regex(/^[a-zA-Z0-9\s]+$/, 'Chatroom name can only contain letters, numbers, and spaces')
})

export const imageUploadSchema = z.object({
    file: z.any()
        .refine((file) => file?.size <= 5000000, 'File size must be less than 5MB')
        .refine(
            (file) => ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file?.type),
            'Only JPEG, PNG, GIF, and WebP images are allowed'
        )
})

export type PhoneFormData = z.infer<typeof phoneSchema>
export type OTPFormData = z.infer<typeof otpSchema>
export type MessageFormData = z.infer<typeof messageSchema>
export type ChatroomFormData = z.infer<typeof chatroomSchema>