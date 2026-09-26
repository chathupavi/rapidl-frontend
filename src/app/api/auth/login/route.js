import { NextResponse } from "next/server";

const BACKEND_URL =
    process.env.NEXT_PUBLIC_API_URL;

export async function POST(request) {

    try {

        const body =
            await request.json();

        // ------------------------------------------------------
        // Send login to backend
        // ------------------------------------------------------

        const backendResponse =
            await fetch(
                `${BACKEND_URL}/api/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body:
                        JSON.stringify(body),

                    cache: "no-store",
                }
            );

        const data =
            await backendResponse.json();

        // ------------------------------------------------------
        // Backend login failed
        // ------------------------------------------------------

        if (!backendResponse.ok) {

            return NextResponse.json(
                data,
                {
                    status:
                        backendResponse.status,
                }
            );
        }

        // ------------------------------------------------------
        // Create response
        // ------------------------------------------------------

        const response =
            NextResponse.json({
                success: true,

                user: data.user,
            });

        // ------------------------------------------------------
        // Store Firebase session as HTTP-only
        // cookie on the NEXT.JS domain
        // ------------------------------------------------------

        response.cookies.set(
            "session",
            data.session,
            {
                httpOnly: true,

                secure:
                    process.env.NODE_ENV ===
                    "production",

                sameSite: "lax",

                path: "/",

                maxAge:
                    60 * 60 * 8,
            }
        );

        return response;

    } catch (error) {

        console.error(
            "❌ Next login route:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Unable to connect to authentication server",
            },
            {
                status: 500,
            }
        );
    }
}