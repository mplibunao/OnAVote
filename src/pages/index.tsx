import type { NextPage } from 'next'
import { trpc } from '@/utils/trpc'
import React from 'react'

export const QuestionCreator = (): JSX.Element => {
	const inputRef = React.useRef<HTMLInputElement>(null)
	const client = trpc.useContext()
	const { mutate } = trpc.useMutation('questions.create', {
		onSuccess: () => {
			client.invalidateQueries(['questions.getAll'])

			if (!inputRef.current) {
				return
			}

			inputRef.current.value = ''
		},
	})

	return (
		<input
			className='rounded-md border border-gray-300 p-2'
			ref={inputRef}
			onKeyDown={(event) => {
				if (event.key === 'Enter') {
					mutate({ question: event.currentTarget.value })
					event.currentTarget.value = ''
				}
			}}
		/>
	)
}

const Home: NextPage = () => {
	const { data, isLoading } = trpc.useQuery(['questions.getAll'])

	if (isLoading || !data) return <div>Loading...</div>

	return (
		<div className='flex flex-col p-6'>
			<div className='flex flex-col'>
				<div className='text-2xl font-bold'>Questions</div>
				{data.map((question) => (
					<div key={question.id} className='flex flex-col p-4'>
						{question.question}
					</div>
				))}
			</div>
			<QuestionCreator />
		</div>
	)
}

export default Home
