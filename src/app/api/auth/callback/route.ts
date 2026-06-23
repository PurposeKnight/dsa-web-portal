import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // check if user profile exists, create if not
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const { data: existingUser } = await (supabase as any)
          .from('users')
          .select('id')
          .eq('id', user.id)
          .single()

        if (!existingUser) {
          await (supabase as any).from('users').insert({
            id: user.id,
            username: user.user_metadata.user_name || user.email?.split('@')[0] || 'user',
            email: user.email!,
            avatar_url: user.user_metadata.avatar_url || null,
          })
        }
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // something went wrong, send them back to login
  return NextResponse.redirect(`${origin}/auth/error`)
}
