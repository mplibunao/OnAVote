import type { NextPage } from 'next'
import { prisma } from '@/infra/db'

const Home: NextPage = (props: any) => {
	return (
		<div>
			<code>{props.questions}</code>
			<div>Home</div>
		</div>
	)
}

export default Home

export const getServerSideProps = async () => {
	const questions = await prisma.pollQuestion.findMany()

	return { props: { questions: JSON.stringify(questions) } }
}
