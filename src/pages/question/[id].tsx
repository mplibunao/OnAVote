import { SEO } from '@/components/SEO'
import { CreateQuestionValidator } from '@/shared/create-question-validator'
import { InferQueryOutput, trpc } from '@/utils/trpc'
import Link from 'next/link'
import { useRouter } from 'next/router'

export interface QuestionsPageContentProps {
	id: string
}

type Votes = InferQueryOutput<'questions.getById'>['votes']

export const QuestionsPageContent = ({
	id,
}: QuestionsPageContentProps): JSX.Element => {
	let totalVotes = 0
	const { data, isLoading } = trpc.useQuery(['questions.getById', { id }])
	const { mutate } = trpc.useMutation('questions.voteOnQuestion', {
		onSuccess: (response) => {
			response.forEach(({ _count }) => (totalVotes += _count))
			window.location.reload()
		},
	})

	if (isLoading) return <div>Loading...</div>
	if (!data) return <div>Question not found</div>

	const getTotalVotes = (votes: Votes) =>
		votes?.map(({ _count }) => (totalVotes += _count))

	const getPercent = (voteCount?: number) => {
		return voteCount && totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0
	}

	if (data && data !== undefined) getTotalVotes(data.votes)

	return (
		<div className='container min-h-screen w-screen p-6'>
			<SEO title='Question' description={data.question?.question} />

			<header>
				<Link href='/'>
					<h1 className='cursor-pointer text-4xl font-bold'>OnAVote</h1>
				</Link>

				{data?.isOwner && (
					<div className='rounded-md bg-gray-700 p-3'>You made this</div>
				)}
			</header>

			<main className='mx-auto max-w-2xl'>
				<div className='mb-10 text-center text-2xl font-bold'>
					{data?.question?.question}
				</div>

				<div className='flex flex-col gap-4'>
					{(data?.question?.options as CreateQuestionValidator['options'])?.map(
						(option, index) => {
							if (data?.isOwner || data?.vote) {
								return (
									<div key={index}>
										<div className='flex justify-between'>
											<p className='font-bold'>{option.text}</p>
											<p>{getPercent(data.votes[index]?._count).toFixed()}</p>
										</div>

										<progress
											className='progress progress-secondary w-full'
											value={data.votes[index]?._count ?? 0}
											max={totalVotes}
										/>
									</div>
								)
							}

							return (
								<button
									key={index}
									className='btn btn-outline'
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
			</main>
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
