import type { NextPage } from 'next'
import { trpc } from '@/utils/trpc'
import React from 'react'
import Link from 'next/link'
import { url } from '@/utils/url'
import { SEO } from '@/components/SEO'
import QuestionCard from '@/components/QuestionCard'

const Home: NextPage = () => {
	const [showToast, setShowToast] = React.useState<boolean>(false)
	const { data, isLoading } = trpc.useQuery(['questions.getAllMyQuestions'])

	const copyToClipboard = () => {
		navigator.clipboard.writeText(url)
		setShowToast(true)
		setTimeout(() => setShowToast(false), 1500)
	}

	if (isLoading)
		return (
			<div className='flex min-h-screen items-center justify-center antialiased'>
				<p className='text-white/40'>Loading...</p>
			</div>
		)

	return (
		<div className='relative min-h-screen w-screen items-stretch p-6'>
			<SEO title='Home' />

			<header className='header flex w-full items-center justify-between'>
				<h1 className='text-4xl font-bold'>OnAVote</h1>
				<Link href='/create'>
					<a className='rounded bg-gray-300 p-4 text-gray-800'>
						Create New Question
					</a>
				</Link>
			</header>

			<div className='mt-10 grid grid-cols-1 gap-y-5 md:grid-cols-4 md:gap-x-5'>
				{data?.map((question) => (
					<QuestionCard
						key={question.id}
						question={question}
						copyToClipboard={copyToClipboard}
					/>
				))}
			</div>

			{/* Toast that will show at the bottom-right of the screen */}
			{showToast && (
				<div className='absolute bottom-5 right-10 flex w-1/5 items-center justify-center rounded-md bg-slate-50/10 p-3'>
					<span className='text-xs font-semibold'>
						Link Copied to Clipboard!
					</span>
				</div>
			)}
		</div>
	)
}

export default Home
