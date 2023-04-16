import { LineChart, Menu } from 'lucide-react'

import { Container, NavActionItem, NavTitleItem } from './Header.styles'

const Header: React.FC = () => {
  return <Container>
    <NavActionItem onClick={() => console.log('STATS')}><LineChart /></NavActionItem>
    <NavTitleItem>Do Daily</NavTitleItem>
    <NavActionItem onClick={() => console.log('STATS')}><Menu /></NavActionItem>
  </Container>
}

export default Header
