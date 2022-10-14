import type { NextPage } from 'next'
import { trpc } from '@/utils/trpc'

const Home: NextPage = () => {
	const { data, isLoading } = trpc.useQuery(['questions.getAll'])

	if (isLoading || !data) return <div>Loading...</div>

	return (
		<div>
			<div>{data[0]?.question}</div>
		</div>
	)
}

export default Home
