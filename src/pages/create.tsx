import { trpc } from '@/utils/trpc'
import React from 'react'

export default function CreatePage(): JSX.Element {
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
