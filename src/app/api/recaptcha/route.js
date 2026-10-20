import axios from "axios";
import { pool } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
    const resultGeneralSettings = await pool.query("SELECT recaptcha_site_key, recaptcha_secret_key, recaptcha_lang FROM general_settings LIMIT 1")
    const siteKey = resultGeneralSettings[0].recaptcha_site_key;
    return NextResponse.json({siteKey:siteKey});
}

export async function POST(req) {
    if (req.method !== "POST") {
        return new Response(
            JSON.stringify({ message: "Only POST requests allowed" }),
            { status: 405 },
        );
    }

    const data = await req.json();
    const { token } = data;
    const resultGeneralSettings = await pool.query("SELECT recaptcha_site_key, recaptcha_secret_key, recaptcha_lang FROM general_settings LIMIT 1")
    const secretKey = resultGeneralSettings[0].recaptcha_secret_key;

    if (!token) {
        return new Response(JSON.stringify({ message: "Token not found" }), {
            status: 405,
        });
    }

    try {
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
        );

        if (response.data.success) {
            return new Response(JSON.stringify({ message: "Success" }), {
                status: 200,
            });
        } else {
            return new Response(JSON.stringify({ message: "Failed to verify" }), {
                status: 405,
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal Server Error", error: error }), {
            status: 500,
        });
    }
}