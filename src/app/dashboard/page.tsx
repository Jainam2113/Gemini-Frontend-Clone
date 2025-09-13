'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { redirect } from 'next/navigation'
import { RootState } from '@/store'
import { Dashboard } from '@/components/dashboard/Dashboard'

export default function DashboardPage() {
    const isAuthenticated = useSelector((state: RootState) => state.auth.user?.isAuthenticated)

    if (!isAuthenticated) {
        redirect('/auth')
    }

    return <Dashboard />
}
