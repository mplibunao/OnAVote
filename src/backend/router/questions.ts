import { prisma } from '@/backend/infra/db'
import { createQuestionValidator } from '@/shared/create-question-validator'
import { z } from 'zod'
import { createRouter } from './context'

export const questionRouter = createRouter()
	.query('getAllMyQuestions', {
		async resolve({ ctx }) {
			if (!ctx.token) return []

			return await prisma.pollQuestion.findMany({
				where: {
					ownerToken: { equals: ctx.token },
				},
			})
		},
	})
	.query('getById', {
		input: z.object({
			id: z.string(),
		}),
		async resolve({ input, ctx }) {
			const question = await prisma.pollQuestion.findFirst({
				where: { id: input.id },
			})

			const vote = await prisma.vote.findFirst({
				where: { questionId: input.id, voterToken: ctx.token },
			})

			return { question, vote, isOwner: question?.ownerToken === ctx.token }
		},
	})
	.mutation('create', {
		input: createQuestionValidator,
		async resolve({ input, ctx }) {
			if (!ctx.token) throw new Error('Unauthorized')

			return await prisma.pollQuestion.create({
				data: {
					question: input.question,
					options: input.options,
					ownerToken: ctx.token,
				},
			})
		},
	})
	.mutation('voteOnQuestion', {
		input: z.object({
			questionId: z.string(),
			option: z.number().min(0).max(10),
		}),
		async resolve({ input, ctx }) {
			if (!ctx.token) throw new Error('Unauthorized')

			return await prisma.vote.create({
				data: {
					questionId: input.questionId,
					choice: input.option,
					voterToken: ctx.token,
				},
			})
		},
	})
