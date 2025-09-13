'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import AuthPage from './auth/page'
import { Dashboard } from '@/components/dashboard/Dashboard'

export default function HomePage() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.user?.isAuthenticated)

  if (!isAuthenticated) {
    return <AuthPage />
  }

  return <Dashboard />
}