import { AuthError, Session, User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { supabase } from '/src/libs'

interface AuthState {
  session: Session | null
  login: (email: string, password: string) => Promise<User | AuthError | null>
  signup: (email: string, password: string) => Promise<User | AuthError | null>
  logout: () => Promise<void>
}

const useAuthStore = create<AuthState>()(persist(set => ({
  session: null,
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
}), { name: 'daily-do-auth' }))

export default useAuthStore
