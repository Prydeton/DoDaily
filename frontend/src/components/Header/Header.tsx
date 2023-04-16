import { LineChart, Menu } from 'lucide-react'

import { trpc } from '/src/utils/trpc'

import { Container, NavActionItem, NavTitleItem } from './Header.styles'

const Header: React.FC = () => {
  const taskQuery = trpc.getAllUserTasks.useQuery()

  return <Container>
    <NavActionItem onClick={() => console.log(taskQuery.data)}><LineChart /></NavActionItem>
    <NavTitleItem>Do Daily</NavTitleItem>
    <NavActionItem onClick={() => console.log('STATS')}><Menu /></NavActionItem>
  </Container>
}

export default Header
