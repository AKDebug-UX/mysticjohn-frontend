import { Suspense } from 'react'
import BookingsClient from '@/components/BookingsClient'

export default function BookingsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      }
    >
      <BookingsClient />
    </Suspense>
  )
}