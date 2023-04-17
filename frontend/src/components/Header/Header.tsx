import { LineChart, Menu } from 'lucide-react'

import { trpc } from '/src/utils/trpc'

import { Container, NavActionItem, NavTitleItem } from './Header.styles'

interface HeaderProps {
  isSettingsOpen: boolean
  setIsSettingsOpen: (isOpen: boolean) => void
}

const Header: React.FC<HeaderProps> = ({ isSettingsOpen, setIsSettingsOpen }: HeaderProps ) => {
  const taskQuery = trpc.getAllUserTasks.useQuery()

  return (
    <Container>
      <NavActionItem onClick={() => console.log('STATS')}><LineChart /></NavActionItem>
      <NavTitleItem>Do Daily</NavTitleItem>
      <NavActionItem onClick={() => {
        setIsSettingsOpen(!isSettingsOpen)
        console.log('Opening settigns')
      }}><Menu /></NavActionItem>
    </Container>
  )
}

export default Header
