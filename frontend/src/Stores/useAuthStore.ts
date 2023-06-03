import { AuthError, Session, User } from '@supabase/supabase-js'
import { create } from 'zustand'

import { supabase } from '/src/libs'

interface AuthState {
  session: Session | null
  setSession: (session: Session | null) => void
  login: (email: string, password: string) => Promise<User | AuthError | null>
  signup: (email: string, password: string) => Promise<User | AuthError | null>
  logout: () => Promise<void>
  getAuthHeader: () => string | null
}

const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  setSession: session => set({ session }),
  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) return Promise.reject(error)

    set({ session: data.session })
    return Promise.resolve(data.user)
  },
  signup: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) return Promise.reject(error)

    set({ session: data.session })
    return Promise.resolve(data.user)
  },
  logout: async () => {
    const { error } = await supabase.auth.signOut()

    if (error) return Promise.reject(error)

    set({ session: null })
    return Promise.resolve()
  },
  getAuthHeader: () => {
    console.log('Getting auth')
    return get().session ? `Bearer ${get().session?.access_token}` : null
  }
}))

export default useAuthStore
