import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'

import { trpc } from '/src/libs'

import { Label, TickButton, TickerForm } from './TaskTicker.styles'
import { Task } from '/../backend/src/router'

interface TaskTickerProps {
  task: Task
}

const TaskTicker: React.FC<TaskTickerProps> = ({ task: { id, name, order, date, is_complete } }) => {
  const queryClient = useQueryClient()
  const taskMutation = trpc.updateTaskComplete.useMutation({
    onMutate: task => {
      console.log({'Before': queryClient.getQueryData(getQueryKey(trpc.getCalendar, undefined, 'query'))})
      queryClient.setQueryData(getQueryKey(trpc.getCalendar, undefined, 'query'), old => ({
        ...old, [date]: [...old[date].filter(etask => etask.id !== task.taskId), ...[{...task, id: task.taskId}] ]
        // .map(etask => etask.id === task.taskId ? ({...etask, is_complete: task?.isComplete}) : etask )
      })
      )
      console.log({'After': queryClient.getQueryData(getQueryKey(trpc.getCalendar, undefined, 'query'))})
      console.log({'what I want in query data': task})
    }
  })

  const {
    handleSubmit,
    reset,
    control,
    formState: { isDirty },
  } = useForm()

  const onSubmit: SubmitHandler = async values => {
    const task = await taskMutation.mutateAsync({ taskId: id, name, order, date, isComplete: !is_complete })
  }

  return <TickerForm onSubmit={handleSubmit(onSubmit)}>
    <Label>{is_complete ? 'true' : 'false'}</Label>
    <Label>{name}</Label>
    <Label>{id}</Label>
    <Label>{date}</Label>
    <TickButton></TickButton>
  </TickerForm>
}

export default TaskTicker
