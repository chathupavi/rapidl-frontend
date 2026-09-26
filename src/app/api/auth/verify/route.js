import { NextResponse } from "next/server";

const BACKEND_URL =
    process.env.NEXT_PUBLIC_API_URL;

export async function GET(request) {

    try {

        const session =
            request.cookies.get("session")?.value;

        if (!session) {

            return NextResponse.json(
                {
                    success: false,
                    authenticated: false,
                    message: "Not authenticated",
                },
                {
                    status: 401,
                }
            );
        }

        // ------------------------------------------------------
        // Ask backend to verify Firebase session
        // ------------------------------------------------------

        const backendResponse =
            await fetch(
                `${BACKEND_URL}/api/auth/verify`,
                {
                    method: "GET",

                    headers: {
                        Cookie:
                            `session=${session}`,
                    },

                    cache: "no-store",
                }
            );

        const data =
            await backendResponse.json();

        return NextResponse.json(
            data,
            {
                status:
                    backendResponse.status,
            }
        );

    } catch (error) {

        console.error(
            "❌ Next verify route:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                authenticated: false,
            },
            {
                status: 500,
            }
        );
    }
}