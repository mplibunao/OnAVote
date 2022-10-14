import * as trpc from '@trpc/server'
import { prisma } from '@/backend/infra/db'

export const questionRouter = trpc.router().query('getAll', {
	async resolve() {
		return await prisma.pollQuestion.findMany()
	},
})
