import React from 'react'
import { cn } from '@/lib/utils'

interface SkeletonProps {
    className?: string
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
    return (
        <div
            className={cn(
                'animate-pulse rounded-md bg-gray-300 dark:bg-gray-700',
                className
            )}
        />
    )
}

export const MessageSkeleton: React.FC = () => {
    return (
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex space-x-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export const ChatroomSkeleton: React.FC = () => {
    return (
        <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3 p-3">
                    <Skeleton className="h-12 w-12 rounded-lg" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                    <Skeleton className="h-3 w-8" />
                </div>
            ))}
        </div>
    )
}

export const LoadingSkeleton: React.FC<{ type: 'message' | 'chatroom' }> = ({ type }) => {
    if (type === 'message') {
        return <MessageSkeleton />
    }

    return <ChatroomSkeleton />
}