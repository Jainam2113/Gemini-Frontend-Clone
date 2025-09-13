'use client'

import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/store'
import { Layout } from '@/components/layout/Layout'
import { Skeleton } from '@/components/ui/LoadingSkeleton'

interface ProvidersProps {
    children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <Provider store={store}>
            <PersistGate
                loading={
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-48" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>
                }
                persistor={persistor}
            >
                <Layout>
                    {children}
                </Layout>
            </PersistGate>
        </Provider>
    )
}
