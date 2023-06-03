import { Dayjs } from 'dayjs'

const getDatesBetween = (startDate: Dayjs, endDate: Dayjs) => {
  const dateArray = []

  while (startDate <= endDate) {
    dateArray.push(startDate.format('YYYY-MM-DD'))
    startDate = startDate.add(1, 'days')
  }
  return dateArray
}

export default getDatesBetween
