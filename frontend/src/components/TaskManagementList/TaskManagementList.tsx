import { Fragment, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Controller, useForm } from 'react-hook-form'
import { closestCenter, DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Trash2 } from 'lucide-react'

import { Button, DragHandle } from '/src/components/'
import { trpc } from '/src/utils/trpc'

import { ButtonContainer, Container, List, Row } from './TaskManagementList.styles'
import TextInput from '../TextInput/TextInput'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface InputItemProps {
  id: string
  value?: string

  style?: React.CSSProperties
  active?: boolean
  sortableProps?: ReturnType<typeof useSortable>
  onChange?: (value: string) => void

  onRemove?: () => void
}

export const InputItem = ({
  onChange,
  onRemove,
  active,
  sortableProps,
  style,
  value,
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
      value={value}
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
    value: string
  }

  interface TasksFieldValues {
    tasks: Task[]
  }

  const defaultValues: TasksFieldValues = {
    tasks: [{
      id: 'task',
      value: ''
    }]
  }

  const {
    handleSubmit,
    reset,
    control,
    formState: { isDirty },
  } = useForm({ defaultValues })

  const [active, setActive] = useState<InputItemProps>()

  const onSubmit = ({ tasks }: { tasks: Task[] } ) => {

  }

  return (
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
                        onChange={v => onChange(value.map(q => q.id === item.id ? { ...q, value: v } : q))}
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
                  onChange([...value, { id: crypto.randomUUID(), value: ''}])
                }}
                surface
              >
                Add Task
              </Button>
              <Button
                surface
                disabled={!isDirty}
              >
                Save Changes
              </Button>
            </ButtonContainer>
          </Container>
        )}
      />
    </form>
  )
}

export default TaskManagementList
