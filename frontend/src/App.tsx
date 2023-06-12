import { useMemo, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'

import { PageContainer } from './App.styles'
import { Header } from './components'
import { trpc } from './libs'
import { Auth, Calendar, Settings } from './pages'
import { useAuthStore } from './Stores'

const App: React.FC = () => {
  const { session } = useAuthStore()

  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }}))

  const trpcClient = useMemo(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3001/trpc',
          ...(session ? {
            headers() {
              return {
                Authorization: `Bearer ${session.access_token}`
              }}}
            : {}
          )
        }),
      ],
    }), [session])

  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (session ?
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Header isSettingsOpen={isSettingsOpen} setIsSettingsOpen={setIsSettingsOpen} />
        <PageContainer>
          <Calendar />
          <Settings isOpen={isSettingsOpen} />
        </PageContainer>
      </QueryClientProvider>
    </trpc.Provider>
    : (
      <Auth />
    )
  )
}
export default App
