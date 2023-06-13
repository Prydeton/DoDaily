import { useEffect, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import dayjs, { Dayjs } from 'dayjs'
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react'

import { DayGlobe } from '/src/components'
import { trpc } from '/src/libs'
import { useAuthStore } from '/src/Stores'

import { ControlButton, ControlMonth, ControlsContainer, Days, MonthContainer, PageContainer } from './Calander.styles'
import { Calendar } from '/../backend/src/router'
import Day from '../Day/Day'

const Calender: React.FC = () => {
  const { data: calendar } = trpc.getCalendar.useQuery()

  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs().startOf('month'))
  const [firstMonth, setFirstMonth] = useState<Dayjs>(dayjs())
  const [lastMonth, setLastMonth] = useState<Dayjs>(dayjs())
  const [openedDate, setOpenedDate] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (calendar) {
      setFirstMonth(dayjs(Object.keys(calendar)[0] as string).startOf('month'))
      setLastMonth(dayjs(Object.keys(calendar).at(-1) as string).startOf('month'))
    }
  }, [calendar])

  const currentMonthTasks: Calendar | undefined = useMemo(() => calendar &&
    Object.keys(calendar)
      .filter(date => dayjs(date).month() === currentMonth.month())
      .sort((a, b) => dayjs(a).isBefore(dayjs(b)) ? -1 : 1)
      .reduce((obj, key) => ({...obj, [key]: calendar[key]}), {})
  , [calendar, currentMonth])

  const openedDayTasks = useMemo(() => (openedDate && currentMonthTasks) ? currentMonthTasks[openedDate].sort((a, b) => a.order - b.order) : [], [currentMonthTasks, openedDate])

  return (
    <PageContainer>
      <ControlsContainer>
        <ControlButton
          disabled={firstMonth.isSame(currentMonth)}
          onClick={(() => setCurrentMonth(firstMonth))}>
          <ChevronFirst />
        </ControlButton>

        <ControlButton
          disabled={firstMonth.isSame(currentMonth)}
          onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}>
          <ChevronLeft />
        </ControlButton>

        <ControlMonth>{currentMonth.format('MMMM')}</ControlMonth>

        <ControlButton
          disabled={lastMonth.isSame(currentMonth)}
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
          {currentMonthTasks && Object.entries(currentMonthTasks).map(([date, tasks]) => <DayGlobe key={date} date={date} tasks={tasks} setOpenedDate={setOpenedDate}/>)}
        </Days>
      </MonthContainer>

      <Day openedDate={openedDate} tasks={openedDayTasks} closeFn={() => setOpenedDate(undefined)}/>
    </PageContainer>
  )
}

export default Calender
