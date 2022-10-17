import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export default async function middleware(
	req: NextRequest,
	_event: NextFetchEvent
): Promise<Response | undefined> {
	const res = NextResponse.next()
	console.log('req.cookies', req.cookies) // eslint-disable-line no-console

	if (req.cookies.get('pollUserCookie')) return res

	const random = Math.random().toString()
	res.cookies.set('pollUserCookie', random, { sameSite: 'strict' })
	return res
}
