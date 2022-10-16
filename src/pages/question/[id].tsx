import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'

export interface QuestionsPageContentProps {
	id: string
}

export const QuestionsPageContent = ({
	id,
}: QuestionsPageContentProps): JSX.Element => {
	const { data, isLoading, error } = trpc.useQuery([
		'questions.getById',
		{ id },
	])

	if (!isLoading && !data) return <div>Question not found</div>

	return <div>{data?.question}</div>
}

export default function QuestionPage(): JSX.Element {
	const {
		query: { id },
	} = useRouter()

	if (typeof id !== 'string') return <div>No ID</div>

	return <QuestionsPageContent id={id} />
}
