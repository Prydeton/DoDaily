import { Dispatch, SetStateAction } from 'react'

import { Container } from './DayGlobe.styles'
import { Task } from '/../backend/src/router'

interface DayGlobeProps {
  setOpenedDate: Dispatch<SetStateAction<string | undefined>>
  tasks: Task[],
  date: string
}

const DayGlobe: React.FC<DayGlobeProps> = ({ setOpenedDate, tasks, date }: DayGlobeProps) => {
  return (
    <Container onClick={() => setOpenedDate(date)}>
      {date}
    </Container>
  )
}

export default DayGlobe
