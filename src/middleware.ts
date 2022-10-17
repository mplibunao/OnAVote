import { nanoid } from 'nanoid'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export default async function middleware(
	req: NextRequest,
	_event: NextFetchEvent
): Promise<Response | undefined> {
	const res = NextResponse.next()

	if (req.cookies.get('poll-token')) return res

	const random = nanoid()
	res.cookies.set('poll-token', random, { sameSite: 'strict' })

	return res
}
