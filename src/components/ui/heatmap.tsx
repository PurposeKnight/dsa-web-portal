'use client'

import * as React from 'react'
import type { HeatmapDay } from '@/types/api'

interface HeatmapProps {
  data: HeatmapDay[]
}

export function Heatmap({ data }: HeatmapProps) {
  // Configures visual ranges for commit counts
  const getColorClass = (count: number) => {
    if (count === 0) return 'bg-zinc-100 dark:bg-zinc-900'
    if (count <= 2) return 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800'
    if (count <= 5) return 'bg-emerald-300 dark:bg-emerald-800 text-emerald-100'
    if (count <= 8) return 'bg-emerald-500 dark:bg-emerald-600'
    return 'bg-emerald-700 dark:bg-emerald-400'
  }

  // Format month labels or tooltips
  const formatDateLabel = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    } catch {
      return dateStr
    }
  }

  return (
    <div className="overflow-x-auto pb-2">
      <div className="inline-grid grid-flow-col grid-rows-7 gap-[3px] p-2 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800/50">
        {data.map((day, idx) => (
          <div
            key={day.date + idx}
            className={`h-[10px] w-[10px] rounded-[1.5px] cursor-pointer transition-colors group relative ${getColorClass(day.count)}`}
          >
            {/* Simple CSS-only hover tooltip */}
            <div className="absolute bottom-full left-1/2 z-10 mb-1.5 hidden -translate-x-1/2 whitespace-nowrap rounded bg-zinc-900 px-2 py-1 text-[10px] font-medium text-white shadow-md group-hover:block dark:bg-zinc-100 dark:text-zinc-900 pointer-events-none">
              {day.count} {day.count === 1 ? 'solved' : 'solved'} on {formatDateLabel(day.date)}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 mt-2 px-2 select-none">
        <span>Less</span>
        <div className="h-[9px] w-[9px] rounded-[1px] bg-zinc-100 dark:bg-zinc-900" />
        <div className="h-[9px] w-[9px] rounded-[1px] bg-emerald-100 dark:bg-emerald-950" />
        <div className="h-[9px] w-[9px] rounded-[1px] bg-emerald-300 dark:bg-emerald-800" />
        <div className="h-[9px] w-[9px] rounded-[1px] bg-emerald-500 dark:bg-emerald-600" />
        <div className="h-[9px] w-[9px] rounded-[1px] bg-emerald-700 dark:bg-emerald-400" />
        <span>More</span>
      </div>
    </div>
  )
}
