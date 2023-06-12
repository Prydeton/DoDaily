import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'

import supabase from './supabase'

export const createContext = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  const getUserFromHeader = async () => {
    if (req.headers.authorization) {
      const user = await supabase.auth.getUser(req.headers.authorization.split(' ')[1])
      if (user.data) {
        return user.data.user
      }
      return null
    }
    return null
  }
  console.log({headers: req.headers})
  const user = await getUserFromHeader()

  return { user }
}
type Context = inferAsyncReturnType<typeof createContext>
const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure
export const middleware = t.middleware

const isAuthenticated = middleware(async opts => {
  const { ctx } = opts

  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User is not authenticated' })
  }

  return opts.next({
    ctx: {
      user: ctx.user
    }
  })
})

export const authenticatedProcedure = publicProcedure.use(isAuthenticated)
