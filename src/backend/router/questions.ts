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
	.query('getById', {
		input: z.object({
			id: z.string(),
		}),
		async resolve({ input }) {
			return await prisma.pollQuestion.findFirst({
				where: { id: input.id },
			})
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
