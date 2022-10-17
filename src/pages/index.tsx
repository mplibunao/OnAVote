import type { NextPage } from 'next'
import { trpc } from '@/utils/trpc'
import React from 'react'
import Link from 'next/link'

const Home: NextPage = () => {
	const { data, isLoading } = trpc.useQuery(['questions.getAllMyQuestions'])

	if (isLoading || !data) return <div>Loading...</div>

	return (
		<div className='flex w-screen flex-col items-stretch p-6'>
			<div className='header flex w-full justify-between'>
				<div className='text-2xl font-bold'>Your Questions</div>

				<Link href='/create'>
					<a className='rounded bg-gray-300 p-4 text-gray-800'>
						Create New Question
					</a>
				</Link>
			</div>

			<div className='flex flex-col'>
				{data.map((question) => (
					<Link href={`/question/${question.id}`} key={question.id}>
						<a>
							<div className='my-2 flex flex-col'>
								<div>{question.question}</div>

								<span>Created on {question.createdAt.toDateString()}</span>
							</div>
						</a>
					</Link>
				))}
			</div>
		</div>
	)
}

export default Home
