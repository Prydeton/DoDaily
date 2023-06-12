import { Fragment, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { closestCenter, DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import dayjs from 'dayjs'
import { Trash2 } from 'lucide-react'

import { Button, DragHandle, Spinner } from '/src/components/'
import { trpc } from '/src/libs'
import { useAuthStore } from '/src/Stores'

import { ButtonContainer, Container, List, Row } from './TaskManagementList.styles'
import { Calendar, Task as TaskType } from '/../backend/src/router'
import TextInput from '../TextInput/TextInput'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface InputItemProps {
  id: string
  name?: string

  style?: React.CSSProperties
  active?: boolean
  sortableProps?: ReturnType<typeof useSortable>
  onChange?: (name: string) => void

  onRemove?: () => void
}

export const InputItem = ({
  onChange,
  onRemove,
  active,
  sortableProps,
  style,
  name,
}: InputItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = sortableProps ?? {}
  return <Row
    ref={setNodeRef}
    style={{
      ...transform && {
        transform: CSS.Transform.toString(transform),
        transition,
      },
      ...style,
    }}
  >
    <DragHandle {...attributes} {...listeners} active={active} />

    <TextInput
      value={name}
      onChange={e => onChange?.(e.target.value)}
    />

    <Button
      title={'Delete'}
      onClick={onRemove}
    ><Trash2 /></Button>
  </Row>
}

const Sortable = ({ ...props }: InputItemProps) => {
  const sortableProps = useSortable({ id: props.id })
  return <InputItem sortableProps={sortableProps} {...props} />
}

const TaskManagementList: React.FC = () => {
  interface Task {
    id: string
    name: string
  }

  interface TasksFieldValues {
    tasks: Task[]
  }

  const defaultValues: TasksFieldValues = {
    tasks: [{
      id: crypto.randomUUID(),
      name: ''
    }]
  }

  const queryClient = useQueryClient()
  const tasksQuery = trpc.getCalendar.useQuery()
  const { session } = useAuthStore()

  const tasksMutation = trpc.updateTasks.useMutation({
    onMutate: async ({ tasks }) => {
      const calendarQueryKey = getQueryKey(trpc.getCalendar, undefined, 'query')

      await queryClient.cancelQueries(calendarQueryKey)

      const previousCalendar = queryClient.getQueryData<Calendar>(calendarQueryKey)

      if (previousCalendar) {
        console.log({previousCalendar})
        const cachedDay = previousCalendar[dayjs().format('YYYY-MM-DD')]
        console.log({cachedDay})
        const newDay: Task[] = tasks.reduce((acc: TaskType[], curr: Task, index: number) => {
          console.log({curr})
          const cachedTaskIndex = cachedDay.findIndex(newTask => newTask.id === curr.id)
          const cachedTask = cachedDay[cachedTaskIndex]
          if (cachedTask) {
            acc.push({ ...cachedTask, name: curr.name, order: index })
          } else {
            acc.push({ ...curr, order: index, date: dayjs().format('YYYY-MM-DD'), isComplete: false, userId: session!.user.id })
          }
          return acc
        }, [])
        console.log({newDay})
        queryClient.setQueryData(calendarQueryKey, {
          ...previousCalendar, [dayjs().format('YYYY-MM-DD')]: newDay
        })
      }

      const  updatedCalendar = queryClient.getQueryData<Calendar>(calendarQueryKey)
      console.log({updatedCalendar})
    }
  })

  const [isTasksSubmitting, setIsTasksSubmitting] = useState(false)

  const {
    handleSubmit,
    reset,
    control,
    formState: { isDirty },
  } = useForm({ defaultValues })

  const [active, setActive] = useState<InputItemProps>()

  useEffect(() => {
    if (tasksQuery.data) {
      const tasks = tasksQuery.data
      if (tasks) reset({ tasks: tasks[dayjs().format('YYYY-MM-DD')] })
    }
  }, [tasksQuery.isFetching])

  const onSubmit: SubmitHandler<typeof defaultValues> = async (values: { tasks: Task[] } ) => {
    setIsTasksSubmitting(true)

    const cleanedTasks = values.tasks
      .filter(task => task.name !== '')

    reset({ tasks: cleanedTasks })
    await tasksMutation.mutateAsync({tasks: cleanedTasks})
    setIsTasksSubmitting(false)
  }

  return (<>
    {tasksQuery.isFetching ? <Spinner /> :
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="tasks"
          render={({
            field: { onChange, value }
          }) => (
            <Container>
              <DndContext
                sensors={useSensors(
                  useSensor(PointerSensor)
                )}
                collisionDetection={closestCenter}
                onDragStart={({ active }) => setActive(value.find(q => q.id === active.id))}
                onDragEnd={({ active, over }) => {
                  setActive(undefined)

                  if (!over || active.id === over.id) return
                  const oldIndex = value.findIndex(({ id }) => id === active.id)
                  const newIndex = value.findIndex(({ id }) => id === over.id)
                  const newArray = arrayMove(value, oldIndex, newIndex)

                  onChange(newArray)
                }}
              >
                <SortableContext
                  items={value.map(c => c.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <List>
                    <div>
                      {useMemo(() => value.map((item, i) => <Fragment key={item.id ?? i}>
                        <Sortable
                          {...item}
                          onChange={v => onChange(value.map(q => q.id === item.id ? { ...q, name: v } : q))}
                          onRemove={() => onChange(value.filter(q => q.id !== item.id))}
                          style={active?.id === item.id ? { opacity: 0 } : undefined}
                        />
                      </Fragment>), [value, active?.id])}
                    </div>
                  </List>
                </SortableContext>
                {createPortal(<DragOverlay zIndex={5000}>{active && <InputItem {...active} active />}</DragOverlay>, document.body)}
              </DndContext>

              <ButtonContainer>
                <Button
                  onClick={() => {
                    // TODO SETUP MAXIMUM
                    onChange([...value, { id: crypto.randomUUID(), name: ''}])
                  }}
                  surface
                  disabled={isTasksSubmitting || value.length > 10}
                  type="button"
                >
              Add Task
                </Button>
                <Button
                  surface
                  disabled={!isDirty || isTasksSubmitting}
                >
              Save Changes
                </Button>
              </ButtonContainer>
            </Container>
          )}
        />
      </form>
    }
  </>
  )
}

export default TaskManagementList
