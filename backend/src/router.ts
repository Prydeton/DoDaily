import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import prisma from './db'
import { publicProcedure, router } from './trpc'

export const appRouter = router({
  getAllUserTasks: publicProcedure
    .query(async () => {
      const tasks = await prisma.task.findMany()

      return tasks
    }),
  createTask: publicProcedure
    .input(z.object({
      date: z.string().datetime(),
      name: z.string(),
      order: z.number()
    }))
    .mutation(async ({ input }) => {
      const task = await prisma.task.create({
        data: input,
      })

      return task
    }),
  deleteTask: publicProcedure
    .input(z.object({
      id: z.number()
    }))
    .mutation(async ({ input: { id } }) => {
      const task = prisma.task.delete({ where: { id }})

      if (!task) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No task with id '${id}'`,
        })
      }
    })
})

export type AppRouter = typeof appRouter
