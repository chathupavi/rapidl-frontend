import { NextResponse } from "next/server";

export async function proxy(request) {

    const pathname =
        request.nextUrl.pathname;

    console.log("🔥 Proxy:", pathname);

    const session =
        request.cookies.get("session");

    console.log(
        "🍪 Session:",
        session ? "PRESENT" : "MISSING"
    );


    // ----------------------------------------------------------
    // No session
    // ----------------------------------------------------------

    if (!session) {

        return NextResponse.redirect(
            new URL(
                "/login",
                request.url
            )
        );
    }


    // ----------------------------------------------------------
    // Session exists
    //
    // The backend remains the actual authority.
    // The API endpoints are protected by requireAdmin.
    // ----------------------------------------------------------

    return NextResponse.next();
}


export const config = {

    matcher: [
        "/admin/:path*",
    ],

};