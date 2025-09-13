export const APP_CONFIG = {
    APP_NAME: 'Gemini Clone',
    OTP_LENGTH: 6,
    MESSAGE_PAGE_SIZE: 20,
    AI_RESPONSE_DELAY: {
        MIN: 2000,
        MAX: 4000
    },
    FILE_UPLOAD: {
        MAX_SIZE: 5 * 1024 * 1024, // 5MB
        ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    }
}

export const TOAST_MESSAGES = {
    OTP_SENT: 'OTP sent successfully!',
    OTP_INVALID: 'Invalid OTP. Please try again.',
    LOGIN_SUCCESS: 'Logged in successfully!',
    LOGOUT_SUCCESS: 'Logged out successfully!',
    CHATROOM_CREATED: 'Chatroom created successfully!',
    CHATROOM_DELETED: 'Chatroom deleted successfully!',
    MESSAGE_SENT: 'Message sent!',
    MESSAGE_COPIED: 'Message copied to clipboard!',
    IMAGE_UPLOADED: 'Image uploaded successfully!',
    ERROR_GENERIC: 'Something went wrong. Please try again.'
}

export const AI_RESPONSES = [
    "That's an interesting point! Let me think about that...",
    "I understand what you're asking. Here's my perspective:",
    "Great question! Based on what you've shared:",
    "I can help you with that. Consider this approach:",
    "Thanks for sharing that information. My analysis suggests:",
    "Let me provide you with a comprehensive answer:",
    "I see what you mean. Here's how I would approach this:",
    "That's a thoughtful question. From my understanding:",
    "Excellent point! Let me elaborate on that:",
    "I appreciate you bringing this up. Here's what I think:"
]