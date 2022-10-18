import { trpc } from '@/utils/trpc'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	CreateQuestionValidator,
	createQuestionValidator,
} from '@/shared/create-question-validator'
import { useRouter } from 'next/router'

const CreateQuestionForm = () => {
	const router = useRouter()
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<CreateQuestionValidator>({
		resolver: zodResolver(createQuestionValidator),
		defaultValues: { question: '', options: [{ text: 'Yes' }, { text: 'No' }] },
	})

	const { fields, append, remove } = useFieldArray({
		control, // control props comes from useForm (optional: if you are using FormContext)
		name: 'options', // unique name for your Field Array
	})

	const { mutate, isLoading, data } = trpc.useMutation('questions.create', {
		onSuccess: (data) => {
			router.push(`/question/${data.id}`)
		},
		onError: (error) => {
			console.log('error', error) // eslint-disable-line no-console
		},
	})

	const onSubmit: SubmitHandler<CreateQuestionValidator> = (data) =>
		mutate(data)

	if (isLoading || data) return <div>Loading...</div>

	return (
		<div className='min-h-screen p-6 text-gray-100 antialiased'>
			<Head>
				<title>Create | OnAVote</title>
			</Head>
			<header className='header flex w-full justify-between'>
				<Link href={'/'}>
					<h1 className='cursor-pointer text-4xl font-bold'>OnAVote</h1>
				</Link>
			</header>
			<div className='mx-auto max-w-xl py-12 md:max-w-2xl'>
				<h2 className='text-2xl font-bold'>Create a new poll</h2>

				<form onSubmit={handleSubmit(onSubmit)} className='w-full'>
					<div className='mt-8 w-full'>
						<div className='form-control my-10 w-full'>
							<label className='label'>
								<span className='label-text text-base font-semibold'>
									Your Question
								</span>
							</label>
							<input
								{...register('question')}
								type='text'
								className='input input-bordered block w-full rounded-md text-gray-300'
								placeholder='How do magnets work?'
							/>
							{errors.question && (
								<p className='text-red-400'>{errors.question.message}</p>
							)}
						</div>

						<div className='grid w-full grid-cols-1 gap-x-5 gap-y-3 md:grid-cols-2'>
							{fields.map((field, index) => {
								return (
									<div key={field.id}>
										<section
											className='flex items-center space-x-3'
											key={field.id}
										>
											<input
												placeholder='name'
												{...register(`options.${index}.text`, {
													required: true,
												})}
												className='input input-bordered w-full font-medium text-gray-300'
											/>
											<button type='button' onClick={() => remove(index)}>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													className='h-6 w-6 text-gray-500'
													fill='none'
													viewBox='0 0 24 24'
													stroke='currentColor'
													strokeWidth={2}
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
													/>
												</svg>
											</button>
										</section>
									</div>
								)
							})}
						</div>

						<div className='my-3 flex items-center'>
							<button
								type='button'
								value='Add more options'
								className='btn btn-ghost'
								onClick={() => append({ text: 'Another Option' })}
							>
								Add options
							</button>
						</div>

						<div className='mt-10 w-full'>
							<button type='submit' className='btn w-full'>
								Create question
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default function CreatePage(): JSX.Element {
	return <CreateQuestionForm />
}
