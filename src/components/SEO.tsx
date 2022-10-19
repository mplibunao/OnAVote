import { url } from '@/utils/url'
import Head from 'next/head'

export interface SEOProps {
	title?: string
	description?: string
}

const siteTitle = 'Voting App'
const siteDescription =
	"Create polls and share with your friends. It's free and easy to use."
const twitterUsername = '@mpradorbrandy'

export const SEO = ({ title = '', description }: SEOProps): JSX.Element => {
	const image = `${url}/spheal.png`

	return (
		<Head>
			<title>{`${title} | ${siteTitle}`}</title>
			<meta
				name='description'
				content={description || siteDescription}
				key='description'
			/>
			<meta name='image' content={image} key='image' />

			{/* facebook cards */}
			<meta property='og:url' content={url} key='og:url' />
			<meta property='og:type' content='website' key='og:type' />
			<meta property='og:title' content={siteTitle} key='og:title' />
			<meta
				property='og:description'
				content={siteDescription}
				key='og:description'
			/>
			<meta property='og:image' content={`${image}`} key='og:image' />
			<meta property='og:image:width' content='400' key='og:image:width' />
			<meta property='og:image:height' content='300' key='og:image:height' />
			<meta key='og_locale' property='og:locale' content='en_IE' />
			<meta key='og_site_name' property='og:site_name' content={siteTitle} />

			{/* twitter card */}
			<meta
				name='twitter:card'
				content='summary_large_image'
				key='twitter:card'
			/>
			<meta
				name='twitter:creator'
				content={twitterUsername}
				key='twitter:creator'
			/>
			<meta name='twitter:title' content={siteTitle} key='twitter:title' />
			<meta
				name='twitter:description'
				content={siteDescription}
				key='twitter:description'
			/>
			<meta key='twitter:site' name='twitter:site' content={twitterUsername} />
			<meta name='twitter:image' content={`${image}`} key='twitter:image' />

			<link rel='canonical' href={url} />
			<link rel='shortcut icon' href='/favicon.ico' />
		</Head>
	)
}
