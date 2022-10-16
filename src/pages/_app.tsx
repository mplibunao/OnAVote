import '../styles/globals.css'
import { withTRPC } from '@trpc/next'
import { AppType } from 'next/dist/shared/lib/utils'
import superjson from 'superjson'
import type { AppRouter } from '@/backend/router'
import { getBaseUrl } from '@/utils/trpc'

const MyApp: AppType = ({ Component, pageProps }) => {
	return <Component {...pageProps} />
}

export default withTRPC<AppRouter>({
	config({ ctx }) {
		return {
			url: `${getBaseUrl()}/api/trpc`,
			transformer: superjson,
			/**
			 * @link https://react-query.tanstack.com/reference/QueryClient
			 */
			// queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
		}
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 */
	ssr: false,
})(MyApp)
