import { NextResponse } from "next/server";

const BACKEND_URL =
    process.env.NEXT_PUBLIC_API_URL;

export async function POST() {

    try {

        // Tell backend logout happened
        await fetch(
            `${BACKEND_URL}/api/auth/logout`,
            {
                method: "POST",
                cache: "no-store",
            }
        );

    } catch (error) {

        console.error(
            "❌ Backend logout error:",
            error
        );
    }

    // ------------------------------------------------------
    // Delete frontend session cookie
    // ------------------------------------------------------

    const response =
        NextResponse.json({
            success: true,
        });

    response.cookies.set(
        "session",
        "",
        {
            httpOnly: true,
            secure:
                process.env.NODE_ENV ===
                "production",
            sameSite: "lax",
            path: "/",
            expires: new Date(0),
        }
    );

    return response;
}