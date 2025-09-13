import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Gemini Clone - AI Chat Application',
    description: 'A conversational AI chat application built with Next.js, React, and Redux',
    keywords: ['AI', 'Chat', 'Gemini', 'React', 'Next.js', 'TypeScript'],
    authors: [{ name: 'Your Name' }],
    viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    )
}
