import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { Check } from 'lucide-react'

import { trpc } from '/src/libs'

import { Container, Label, TickButton } from './TaskTicker.styles'
import { Calendar, Task } from '/../backend/src/router'

interface TaskTickerProps {
  task: Task
}

const TaskTicker: React.FC<TaskTickerProps> = ({ task: { id, name, order, date, isComplete } }) => {
  const queryClient = useQueryClient()
  const taskMutation = trpc.updateTaskComplete.useMutation({
    onMutate: async task => {
      const calendarQueryKey = getQueryKey(trpc.getCalendar, undefined, 'query')

      await queryClient.cancelQueries(calendarQueryKey)

      const previousCalendar = queryClient.getQueryData<Calendar>(calendarQueryKey)

      if (previousCalendar)
        queryClient.setQueryData(calendarQueryKey, {
          ...previousCalendar, [date]: [...previousCalendar[date].filter(etask => etask.id !== task.id), ...[task] ]
        })
    }
  })

  const toggleComplete = async () => {
    taskMutation.mutateAsync({ id, name, order, date, isComplete: !isComplete })
  }

  return <Container>
    <Label>{name}</Label>
    <TickButton onClick={() => toggleComplete()} className={isComplete ? 'complete' : 'not_complete'}>
      <Check />
    </TickButton>
  </Container>
}

export default TaskTicker
