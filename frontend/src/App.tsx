import { Container } from './App.styles'
import { Header } from './components'
import { Calendar } from './pages'

const App: React.FC = () => {
  return <Container>
    <Header />
    <Calendar />
  </Container>
}

export default App
