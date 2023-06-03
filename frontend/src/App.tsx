import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'

import { PageContainer } from './App.styles'
import { Header } from './components'
import { trpc } from './libs'
import { Auth, Calendar, Settings } from './pages'
import { useAuthStore } from './Stores'

const App: React.FC = () => {
  const {
    session,
    getAuthHeader
  } = useAuthStore()

  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }}))
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3001/trpc',
          headers() {
            return {
              Authorization: getAuthHeader(),
            }
          }
        }),
      ],

    }),
  )

  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {session ? (<>
          <Header isSettingsOpen={isSettingsOpen} setIsSettingsOpen={setIsSettingsOpen} />
          <PageContainer>
            <Calendar />
            <Settings isOpen={isSettingsOpen} />
          </PageContainer>
        </>) : (
          <Auth />
        )}
      </QueryClientProvider>
    </trpc.Provider>
  )

}

export default App
