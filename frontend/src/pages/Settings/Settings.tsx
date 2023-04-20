import { TaskManagementList } from '/src/components'

import { Container } from './Settings.styles'

interface SettingsProps {
  isOpen: boolean
}

const Settings: React.FC<SettingsProps> = ({ isOpen }: SettingsProps) => {
  return (
    <Container className={isOpen ? 'open' : 'close'}>
      <TaskManagementList />
    </Container>
  )
}

export default Settings
