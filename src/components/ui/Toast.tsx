import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPortal } from 'react-dom'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import { RootState } from '@/store'
import { removeToast } from '@/store/slices/uiSlice'
import { cn } from '@/lib/utils'

interface ToastItemProps {
    id: string
    message: string
    type: 'success' | 'error' | 'info'
    onClose: (id: string) => void
}

const ToastItem: React.FC<ToastItemProps> = ({ id, message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id)
        }, 5000)

        return () => clearTimeout(timer)
    }, [id, onClose])

    const icons = {
        success: CheckCircle,
        error: XCircle,
        info: Info
    }

    const styles = {
        success: 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-200',
        error: 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-200',
        info: 'bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200'
    }

    const Icon = icons[type]

    return (
        <div
            className={cn(
                'flex items-center p-4 mb-4 rounded-lg border-l-4 shadow-lg transition-all duration-300 transform translate-x-0',
                styles[type]
            )}
        >
            <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
            <div className="flex-1">
                <p className="text-sm font-medium">{message}</p>
            </div>
            <button
                onClick={() => onClose(id)}
                className="ml-3 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    )
}

export const ToastContainer: React.FC = () => {
    const dispatch = useDispatch()
    const toasts = useSelector((state: RootState) => state.ui.toasts)

    const handleClose = (id: string) => {
        dispatch(removeToast(id))
    }

    if (toasts.length === 0) return null

    const toastContent = (
        <div className="fixed top-4 right-4 z-50 w-96">
            {toasts.map((toast) => (
                <ToastItem
                    key={toast.id}
                    {...toast}
                    onClose={handleClose}
                />
            ))}
        </div>
    )

    return createPortal(toastContent, document.body)
}