import { createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// helper to validate that an API call is coming from an authenticated user
// returns the user or an error response
export async function getAuthenticatedUser() {
  const supabase = createAdminClient()
  // in a real flow this would validate the JWT from the request headers
  // for now this is a placeholder we'll wire up properly when middleware is integrated
  return { supabase, user: null as any }
}

// standard error response
export function apiError(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status })
}

// standard success response
export function apiSuccess<T>(data: T, status: number = 200) {
  return NextResponse.json(data, { status })
}
