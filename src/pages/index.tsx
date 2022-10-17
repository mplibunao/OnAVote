import type { NextPage } from 'next'
import { trpc } from '@/utils/trpc'
import React from 'react'
import Link from 'next/link'

const Home: NextPage = () => {
	const { data, isLoading } = trpc.useQuery(['questions.getAllMyQuestions'])

	if (isLoading || !data) return <div>Loading...</div>

	return (
		<div className='flex flex-col p-6'>
			<div className='flex flex-col'>
				<div className='text-2xl font-bold'>Your Questions</div>
				{data.map((question) => (
					<div className='my-2 flex flex-col' key={question.id}>
						<Link href={`/question/${question.id}`} passHref>
							<a>
								<div className=''>{question.question}</div>
							</a>
						</Link>
						<span>Created on {question.createdAt.toDateString()}</span>
					</div>
				))}
			</div>
			<Link href='/create' passHref>
				<a>Create New Question</a>
			</Link>
		</div>
	)
}

export default Home
