import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react'

import { DayBulb } from '/src/components'

import { ControlButton, ControlMonth, ControlsContainer, MonthContainer, PageContainer } from './Calander.styles'

const Calender: React.FC = () => {

  return (
    <PageContainer>
      <ControlsContainer>
        <ControlButton><ChevronFirst /></ControlButton>
        <ControlButton><ChevronLeft /></ControlButton>
        <ControlMonth>DECEMBER</ControlMonth>
        <ControlButton><ChevronLast /></ControlButton>
        <ControlButton><ChevronRight /></ControlButton>
      </ControlsContainer>
      <MonthContainer>
        <DayBulb />
        <DayBulb />
        <DayBulb />
        <DayBulb />
        <DayBulb />
        <DayBulb />
        <DayBulb />
        <DayBulb />
        <DayBulb />
      </MonthContainer>
    </PageContainer>
  )
}

export default Calender
