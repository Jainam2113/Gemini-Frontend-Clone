import React from 'react'
import { ToastContainer } from '@/components/ui/Toast'

interface LayoutProps {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            {children}
            <ToastContainer />
        </>
    )
}