import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Login() {
  const { user, error, isLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/dashboard') // Redirect to dashboard if already logged in
    }
  }, [user, router])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <a
            href="/api/auth/login"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in with Auth0
          </a>
        </div>
      </div>
    </div>
  )
}
