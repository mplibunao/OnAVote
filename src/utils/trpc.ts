import type { AppRouter } from '@/backend/router'
import { createReactQueryHooks } from '@trpc/react'
import { inferProcedureOutput } from '@trpc/server'
import { isServer } from './ssr'

export const trpc = createReactQueryHooks<AppRouter>()
// => { useQuery: ..., useMutation: ...}

export function getBaseUrl() {
	if (!isServer()) return '' // csr should use relative path
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // ssr on vercel should use vercel url

	return `http://localhost:${process.env.PORT ?? 3000}` // dev ssr should use localhost
}

/**
 * Enum containing all api query paths
 */
export type TQuery = keyof AppRouter['_def']['queries']

/**
 * This is a helper method to infer the output of a query resolver
 * @example type HelloOutput = InferQueryOutput<'hello'>
 */
export type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
	AppRouter['_def']['queries'][TRouteKey]
>
