import { randomUUID } from 'crypto'
import dayjs from 'dayjs'
import { emitWarning } from 'process'
import { z } from 'zod'

import supabase from './libs/supabase'
import { authenticatedProcedure, publicProcedure, router } from './libs/trpc'
import type { Database } from './types/schema'
import { getDatesBetween } from './utils'

export const appRouter = router({
  getCalendar: authenticatedProcedure
    .input(z.object({}).nullish())
    .query(async ({ ctx }): Promise<Calendar | undefined> => {
      const { data: tasks } = await supabase
        .from('task')
        .select('*')
        .eq('user_id', ctx.user.id)
        .order('date')

      if (!tasks) return

      if (tasks.length === 0)
        return { [dayjs().format('YYYY-MM-DD')]: [{ id: randomUUID(), name: '', date: dayjs().format('YYYY-MM-DD'), is_complete: false, order: 0, user_id: ctx.user.id } ] }

      const calendar = tasks.reduce((cal, task) => {
        return {...cal, [task.date]: [...cal[task.date] ?? [], task]}
      }, {} as Record<string, Array<typeof tasks[number]>>)

      const dates = getDatesBetween(dayjs(tasks[0].date), dayjs())
      let previousFilledDayTasks = [] as typeof tasks
      dates.forEach(date => {
        if (calendar[date]) {
          previousFilledDayTasks = calendar[date]
        } else {
          calendar[date] = previousFilledDayTasks.map(task => ({ ...task, is_complete: false, date, id: randomUUID() }))
        }
      })
      return calendar
    }),
  updateTasks: authenticatedProcedure
    .input(z.object({
      tasks: z.array(
        z.object({
          id: z.string().min(0),
          name: z.string(),
        })
      )
    }))
    .mutation(async ({ ctx, input: { tasks } }) => {
      const { error: deleteError } = await supabase
        .from('task')
        .delete()
        .eq('user_id', ctx.user.id)
        .eq('date', dayjs().startOf('day').toISOString())
        .not('id', 'in', `(${tasks.map(task => task.id).join(',')})`)

      const { error: createError } = await supabase
        .from('task')
        .upsert(tasks.map((task, i) => ({ ...task, user_id: ctx.user.id, date: dayjs().startOf('day').toISOString(), order: i })))

      console.log({deleteError, createError})
    }),
  updateTaskComplete: authenticatedProcedure
    .input(z.object({
      taskId: z.string().min(1),
      name: z.string().min(1),
      isComplete: z.boolean(),
      order: z.number(),
      date: z.string()
    }))
    .mutation(async ({ ctx, input: { taskId, name, order, date, isComplete } }): Promise<Task | undefined> => {
      console.log('test')
      const { error, data } = await supabase
        .from('task')
        .upsert({ id: taskId, name, order, is_complete: isComplete, date, user_id: ctx.user.id })
        .select()
      console.log({data})
      if (data)
        return data[0]
    }),

  ping: publicProcedure
    .input(z.object({}).nullish())
    .query(() => console.log('pong'))
})

export type Task = Database['public']['Tables']['task']['Row']
export type Calendar = Record<string, Task[]>

export type AppRouter = typeof appRouter
