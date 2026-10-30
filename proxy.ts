import { NextResponse, type NextRequest } from 'next/server'
import Negotiator from 'negotiator'

export function proxy(request: NextRequest) {
    const url = request.nextUrl.clone()
    url.pathname = '/en'
    return NextResponse.redirect(url)
}

/* Depends the language browser of the user
export function proxy(request: NextRequest){
    const languages = new Negotiator({
        headers: {
            'accept-language': request.headers.get('accept-language') ?? '',
        },
    }).languages(['en','fr'])
    
    const locale = languages[0] ?? 'en'
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}`

    return NextResponse.redirect(url)
}*/

export const config = {
    matcher: '/'
}