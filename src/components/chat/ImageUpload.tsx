import React, { useRef } from 'react'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { convertToBase64 } from '@/lib/utils'
import { useDispatch } from 'react-redux'
import { addToast } from '@/store/slices/uiSlice'
import { APP_CONFIG } from '@/lib/constants'

interface ImageUploadProps {
    onImageSelect: (imageUrl: string) => void
    onClose: () => void
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
                                                            onImageSelect,
                                                            onClose
                                                        }) => {
    const dispatch = useDispatch()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type
        if (!APP_CONFIG.FILE_UPLOAD.ALLOWED_TYPES.includes(file.type)) {
            dispatch(addToast({
                message: 'Please select a valid image file (JPEG, PNG, GIF, or WebP)',
                type: 'error'
            }))
            return
        }

        // Validate file size
        if (file.size > APP_CONFIG.FILE_UPLOAD.MAX_SIZE) {
            dispatch(addToast({
                message: 'File size must be less than 5MB',
                type: 'error'
            }))
            return
        }

        try {
            const base64 = await convertToBase64(file)
            onImageSelect(base64)
            onClose()
            dispatch(addToast({
                message: 'Image uploaded successfully!',
                type: 'success'
            }))
        } catch {
            dispatch(addToast({
                message: 'Failed to upload image',
                type: 'error'
            }))
        }
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault()
        const files = Array.from(e.dataTransfer.files)
        const imageFile = files.find(file =>
            APP_CONFIG.FILE_UPLOAD.ALLOWED_TYPES.includes(file.type)
        )

        if (imageFile) {
            const event = {
                target: {files: [imageFile]}
            } as unknown as React.ChangeEvent<HTMLInputElement>
            handleFileSelect(event)
        }
    }

    return (
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
            <div className="flex justify-between items-start mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    Upload Image
                </h4>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="h-6 w-6 p-0"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>

            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
            >
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    PNG, JPG, GIF, WebP up to 5MB
                </p>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
            />
        </div>
    )
}