import { useEffect, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import dayjs, { Dayjs } from 'dayjs'
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react'

import { DayGlobe } from '/src/components'
import { trpc } from '/src/libs'

import { ControlButton, ControlMonth, ControlsContainer, Days, MonthContainer, PageContainer } from './Calander.styles'
import Day from '../Day/Day'

const Calender: React.FC = () => {
  // const queryClient = useQueryClient()
  const { data: calendar } = trpc.getCalendar.useQuery()
  console.log({calendar})
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs().startOf('month'))
  const [firstMonth, setFirstMonth] = useState<Dayjs>(dayjs())
  const [lastMonth, setLastMonth] = useState<Dayjs>(dayjs())
  const [openedDate, setOpenedDate] = useState<string | undefined>()

  useEffect(() => {
    if (calendar) {
      setFirstMonth(dayjs(Object.keys(calendar)[0] as string).startOf('month'))
      setLastMonth(dayjs(Object.keys(calendar).at(-1) as string).startOf('month'))
    }
  }, [calendar])

  const currentMonthTasks = useMemo(() => calendar ?
    Object.fromEntries(Object.entries(calendar).filter(([date]) => dayjs(date).month === currentMonth.month))
    : {}, [calendar])

  const openedDayTasks = useMemo(() => openedDate ? currentMonthTasks[openedDate] : [], [currentMonthTasks, openedDate])

  return (
    <PageContainer>
      <ControlsContainer>
        <ControlButton
          disabled={firstMonth.isSame(currentMonth)}
          onClick={(() => setCurrentMonth(firstMonth))}>
          <ChevronFirst />
        </ControlButton>

        <ControlButton
          onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}>
          <ChevronLeft />
        </ControlButton>

        <ControlMonth>{currentMonth.format('MMMM')}</ControlMonth>

        <ControlButton
          onClick={() => setCurrentMonth(currentMonth.add(1, 'month'))}>
          <ChevronRight />
        </ControlButton>

        <ControlButton
          disabled={lastMonth.isSame(currentMonth)}
          onClick={(() => setCurrentMonth(lastMonth))}>
          <ChevronLast />
        </ControlButton>

      </ControlsContainer>
      <MonthContainer>
        <Days>
          {Object.entries(currentMonthTasks).map(([date, tasks]) => <DayGlobe key={date} date={date} tasks={tasks} setOpenedDate={setOpenedDate}/>)}
        </Days>
      </MonthContainer>

      <Day date={openedDate} tasks={openedDayTasks} />
    </PageContainer>
  )
}

export default Calender
