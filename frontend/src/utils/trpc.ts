import { createTRPCReact, httpBatchLink } from '@trpc/react-query'

import type { AppRouter } from '../../../backend/src/router'

export const trpc = createTRPCReact<AppRouter>({


  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',

      async headers() {
        return { } // TODO: ADD AUTH
      }
    })
  ]
})
