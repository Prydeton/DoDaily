import React from 'react'

import { TaskTicker } from '/src/components'

import { PageContainer } from './Day.styles'
import { Task } from '/../backend/src/router'

interface DayProps {
  date: string | undefined
  tasks: Task[]
}

const Day: React.FC<DayProps> = ({ date, tasks }) => {
  return <PageContainer className={date ? 'open' : 'close'}>
    {tasks.map(task => <TaskTicker key="1" task={task} />)}
  </PageContainer>
}

export default Day
