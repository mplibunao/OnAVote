import { CreateQuestionValidator } from '@/shared/create-question-validator'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'

export interface QuestionsPageContentProps {
	id: string
}

export const QuestionsPageContent = ({
	id,
}: QuestionsPageContentProps): JSX.Element => {
	const { data } = trpc.useQuery(['questions.getById', { id }])
	const { mutate } = trpc.useMutation('questions.voteOnQuestion', {
		onSuccess: () => window.location.reload(),
	})

	if (!data) return <div>Question not found</div>

	return (
		<div className='flex flex-col p-8'>
			{data?.isOwner && (
				<div className='rounded-md bg-red-700 p-3'>You made this</div>
			)}

			<div className='text-2xl font-bold'>{data?.question?.question}</div>

			<div className='flex flex-col gap-4'>
				{(data?.question?.options as CreateQuestionValidator['options'])?.map(
					(option, index) => {
						if (data?.isOwner || data?.vote) {
							return (
								<div
									key={index}
									className={data.vote?.choice === index ? 'underline' : ''}
								>{`${data.votes[index]?._count ?? 0} - ${option.text}`}</div>
							)
						}

						return (
							<button
								key={index}
								onClick={() =>
									mutate({
										questionId: data?.question!.id,
										option: index,
									})
								}
							>
								{option.text}
							</button>
						)
					}
				)}
			</div>
		</div>
	)
}

export default function QuestionPage(): JSX.Element {
	const {
		query: { id },
	} = useRouter()

	if (typeof id !== 'string') return <div>No ID</div>

	return <QuestionsPageContent id={id} />
}
