'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import toast, { Toaster } from 'react-hot-toast'

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()

  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Registers user. Passing options.data stores the metadata like username 
      // in user_metadata, which can be synced into the profiles database.
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      })

      if (error) throw error

      toast.success('Registration successful!')
      setIsSuccess(true)
    } catch (err: any) {
      toast.error(err.message || 'Failed to sign up')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-black font-sans">
        <Card className="w-full max-w-md shadow-lg border-zinc-200 dark:border-zinc-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight text-center text-emerald-600 dark:text-emerald-400">
              Check your email
            </CardTitle>
            <CardDescription className="text-center mt-2">
              We have sent a verification link to <span className="font-semibold text-zinc-900 dark:text-zinc-100">{email}</span>.
              Please verify your email address to log in.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center border-t border-zinc-100 p-4 dark:border-zinc-900">
            <Link href="/login" className="text-sm font-semibold text-zinc-950 dark:text-zinc-50 hover:underline">
              Back to Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-black font-sans">
      <Toaster position="top-center" />
      <Card className="w-full max-w-md shadow-lg border-zinc-200 dark:border-zinc-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Register to join study groups and start solving algorithms
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="codemaster"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 bg-white text-zinc-950 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 bg-white text-zinc-950 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 bg-white text-zinc-950 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-600"
              />
            </div>
            <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
              Sign Up
            </Button>
          </CardContent>
        </form>
        <CardFooter className="justify-center border-t border-zinc-100 p-4 dark:border-zinc-900">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-zinc-950 dark:text-zinc-50 hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
