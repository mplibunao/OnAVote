export interface ErrorPageProps {}

export default function ErrorPage(_props: ErrorPageProps): JSX.Element {
	return (
		<div className='flex min-h-screen items-center justify-center text-xl font-bold antialiased'>
			404 | Not Found
		</div>
	)
}
