import type { NextPage } from 'next'
import { prisma } from '@/server/infra/db'
import { trpc } from '@/utils/trpc'

const Home: NextPage = (props: any) => {
	const { data, isLoading } = trpc.useQuery(['hello'])

	if (isLoading || !data) return <div>Loading...</div>

	return (
		<div>
			<code>{props.questions}</code>
			<div>{data?.greeting}</div>
		</div>
	)
}

export default Home

export const getServerSideProps = async () => {
	const questions = await prisma.pollQuestion.findMany()

	return { props: { questions: JSON.stringify(questions) } }
}
