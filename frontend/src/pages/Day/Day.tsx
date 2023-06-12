import React from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown } from 'lucide-react'

import { TaskTicker } from '/src/components'

import { CloseDrawButton, Container, Cover } from './Day.styles'
import { Task } from '/../backend/src/router'

interface DayProps {
  openedDate: string | null
  tasks: Task[]
  closeFn: () => void
}

const Day: React.FC<DayProps> = ({ openedDate, tasks, closeFn }) => {
  return createPortal(
    <Cover onClick={e => e.currentTarget === e.target && closeFn()} className={openedDate ? 'open' : 'close'}>
      <Container className={openedDate ? 'open' : 'close'}>
        <CloseDrawButton onClick={() => closeFn()}>
          <ChevronDown />
        </CloseDrawButton>
        {tasks.map(task => <TaskTicker key={task.id} task={task} />)}
      </Container>
    </Cover>,
    document.body)
}

export default Day
