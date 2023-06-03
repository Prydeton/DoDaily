import { LineChart, Menu } from 'lucide-react'

import { trpc } from '/src/libs'

import { Container, NavActionItem, NavTitleItem } from './Header.styles'

interface HeaderProps {
  isSettingsOpen: boolean
  setIsSettingsOpen: (isOpen: boolean) => void
}

const Header: React.FC<HeaderProps> = ({ isSettingsOpen, setIsSettingsOpen }: HeaderProps ) => {


  return (
    <Container>
      <NavActionItem onClick={() => console.log('test')}><LineChart /></NavActionItem>
      <NavTitleItem>Do Daily</NavTitleItem>
      <NavActionItem onClick={() => setIsSettingsOpen(!isSettingsOpen)}><Menu /></NavActionItem>
    </Container>
  )
}

export default Header
