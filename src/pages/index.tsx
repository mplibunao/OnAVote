import type { NextPage } from 'next'
import { trpc } from '@/utils/trpc'
import React from 'react'
import Link from 'next/link'

export const QuestionCreator = (): JSX.Element => {
	const inputRef = React.useRef<HTMLInputElement>(null)
	const client = trpc.useContext()
	const { mutate, isLoading } = trpc.useMutation('questions.create', {
		onSuccess: () => {
			client.invalidateQueries(['questions.getAllMyQuestions'])

			if (!inputRef.current) {
				return
			}

			inputRef.current.value = ''
		},
	})

	return (
		<input
			disabled={isLoading}
			className='rounded-md border border-gray-300 p-2'
			ref={inputRef}
			onKeyDown={(event) => {
				if (event.key === 'Enter') {
					mutate({ question: event.currentTarget.value })
				}
			}}
		/>
	)
}

const Home: NextPage = () => {
	const { data, isLoading } = trpc.useQuery(['questions.getAllMyQuestions'])

	if (isLoading || !data) return <div>Loading...</div>

	return (
		<div className='flex flex-col p-6'>
			<div className='flex flex-col'>
				<div className='text-2xl font-bold'>Questions</div>
				{data.map((question) => (
					<Link href={`/question/${question.id}`} key={question.id} passHref>
						<a>
							<div className='flex flex-col p-4'>{question.question}</div>
						</a>
					</Link>
				))}
			</div>
			<QuestionCreator />
		</div>
	)
}

export default Home
