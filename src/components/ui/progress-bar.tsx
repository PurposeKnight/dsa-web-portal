import * as React from 'react'

interface ProgressBarProps {
  value: number // Out of 100 or custom max
  max?: number
  label?: string
  subLabel?: string
  className?: string
  colorClass?: string
}

export function ProgressBar({
  value,
  max = 100,
  label,
  subLabel,
  className = '',
  colorClass = 'bg-zinc-900 dark:bg-zinc-50'
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className={`w-full ${className}`}>
      {(label || subLabel) && (
        <div className="flex justify-between items-center text-xs font-semibold mb-1 text-zinc-500 dark:text-zinc-400">
          {label && <span>{label}</span>}
          {subLabel && <span>{subLabel}</span>}
        </div>
      )}
      <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
