'use client'

import * as React from 'react'

interface AvatarProps {
  src?: string | null
  alt?: string
  fallback: string
  className?: string
}

export function Avatar({ src, alt = '', fallback, className = '' }: AvatarProps) {
  const [error, setError] = React.useState(false)

  // Grabs initials from the fallback text (e.g., "John Doe" -> "JD")
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }

  return (
    <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 ${className}`}>
      {src && !error ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setError(true)}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm font-bold text-zinc-600 dark:text-zinc-300 select-none">
          {getInitials(fallback)}
        </div>
      )}
    </div>
  )
}
