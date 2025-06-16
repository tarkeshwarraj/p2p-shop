//middleware
import { NextResponse } from "next/server";


export function middleware(request){


    const token = request.cookies.get('token')?.value;

    if (!token && ( request.nextUrl.pathname.startsWith("/add-product") || request.nextUrl.pathname.startsWith("/dashboard")))
{
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

//Apply to specific routes

export const config = {
    matcher: [
        "/add-product/:path*",
        "/dashboard/:path*",
    ],

};
