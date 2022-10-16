import * as trpc from '@trpc/server'
import { prisma } from '@/backend/infra/db'
import { z } from 'zod'

export const questionRouter = trpc
	.router()
	.query('getAll', {
		async resolve() {
			return await prisma.pollQuestion.findMany()
		},
	})
	.mutation('create', {
		input: z.object({
			question: z.string(),
		}),

		async resolve({ input }) {
			return await prisma.pollQuestion.create({
				data: { question: input.question },
			})
		},
	})
