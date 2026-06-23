import * as React from 'react'
import type { Difficulty, ThreadTag } from '@/types/api'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'Easy' | 'Medium' | 'Hard' | ThreadTag
}

export function Badge({ className = '', variant = 'default', ...props }: BadgeProps) {
  const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none'
  
  const styles: Record<string, string> = {
    default: 'bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900',
    outline: 'border border-zinc-200 text-zinc-950 dark:border-zinc-800 dark:text-zinc-50',
    // Difficulty Badges
    Easy: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/55 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50',
    Medium: 'bg-amber-100 text-amber-800 dark:bg-amber-950/55 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50',
    Hard: 'bg-rose-100 text-rose-800 dark:bg-rose-950/55 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50',
    // Thread Tags
    'Help Needed': 'bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-400',
    'Solution Share': 'bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-400',
    'Challenge': 'bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-400',
    'Discussion': 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300',
  }

  return (
    <div
      className={`${baseClasses} ${styles[variant] || styles.default} ${className}`}
      {...props}
    />
  )
}
