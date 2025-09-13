import React, { useState, useRef } from 'react'
import { useChat } from '@/hooks/useChat'
import { Send, Paperclip, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ImageUpload } from './ImageUpload'

export const MessageInput: React.FC = () => {
    const { sendMessage, isAITyping, currentChatroom } = useChat()
    const [message, setMessage] = useState('')
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [showImageUpload, setShowImageUpload] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!currentChatroom) return
        if (!message.trim() && !selectedImage) return

        // Send the message
        sendMessage(message.trim() || 'Image', selectedImage ? 'image' : 'text', selectedImage || undefined)

        // Reset form
        setMessage('')
        setSelectedImage(null)
        setShowImageUpload(false)

        // Reset textarea height
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e as any)
        }
    }

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value)

        // Auto-resize textarea
        const textarea = e.target
        textarea.style.height = 'auto'
        textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
    }

    const canSend = (message.trim().length > 0 || selectedImage) && !isAITyping

    return (
        <div className="p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50">

            {/* Image preview */}
            {selectedImage && (
                <div className="mb-3 relative inline-block">
                    <img
                        src={selectedImage}
                        alt="Preview"
                        className="h-20 w-20 object-cover rounded-xl shadow-md"
                    />
                    <button
                        onClick={() => {
                            setSelectedImage(null)
                            setShowImageUpload(false)
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex items-end space-x-3">

                {/* Attachment button */}
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowImageUpload(!showImageUpload)}
                    className="mb-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    disabled={isAITyping}
                >
                    <Paperclip className="h-5 w-5 text-gray-500" />
                </Button>

                {/* Message input */}
                <div className="flex-1 relative">
          <textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter a prompt here"
              className="w-full resize-none rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              rows={1}
              disabled={isAITyping}
              style={{ minHeight: '44px', maxHeight: '120px' }}
          />
                </div>

                {/* Send button */}
                <Button
                    type="submit"
                    disabled={!canSend}
                    className={`mb-2 p-3 rounded-full transition-all ${
                        canSend
                            ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl'
                            : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    <Send className="h-5 w-5" />
                </Button>
            </form>

            {/* Image upload component */}
            {showImageUpload && (
                <div className="mt-3">
                    <ImageUpload
                        onImageSelect={setSelectedImage}
                        onClose={() => setShowImageUpload(false)}
                    />
                </div>
            )}
        </div>
    )
}
