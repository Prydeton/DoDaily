import * as trpcExpress from '@trpc/server/adapters/express'
import cors from 'cors'
import express, { Application } from 'express'

import { env } from './config'
import { createContext } from './libs/trpc'
import { appRouter } from './router'

const startApp = async () => {
  const app: Application = express()

  app.use(express.json())
  app.use(cors())


  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    }))

  return app.listen(env.PORT)
}

export default startApp
