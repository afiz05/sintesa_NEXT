import { NextResponse } from "next/server";

// Simple API endpoint to simulate captcha mode checking
// This would normally come from your backend database/configuration
export async function GET() {
  try {
    // You can change this value to test different captcha modes:
    // "0" = Custom number captcha with spaces
    // "1" = Google reCAPTCHA
    const captchaMode = "0"; // Change this to "1" to test reCAPTCHA

    return NextResponse.json({
      success: true,
      capcay: captchaMode,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to get captcha mode",
      },
      { status: 500 }
    );
  }
}
