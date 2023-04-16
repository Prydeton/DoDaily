import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'

import { Container } from './App.styles'
import { Header } from './components'
import { Calendar } from './pages'
import { trpc } from './utils/trpc'

const App: React.FC = () => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3001/trpc',
          // TODO Auth headers
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Container>
          <Header />
          <Calendar />
        </Container>
      </QueryClientProvider>
    </trpc.Provider>
  )

}

export default App
