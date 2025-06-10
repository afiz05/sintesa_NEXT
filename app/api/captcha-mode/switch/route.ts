import { NextResponse } from "next/server";

// API endpoint to change captcha mode for testing
export async function POST(request: Request) {
  try {
    const { mode } = await request.json();

    if (mode !== "0" && mode !== "1") {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid mode. Use '0' for custom captcha or '1' for reCAPTCHA",
        },
        { status: 400 }
      );
    }

    // In a real application, you would save this to your database
    // For now, we'll just return success
    return NextResponse.json({
      success: true,
      message: `Captcha mode changed to ${
        mode === "0" ? "Custom Captcha" : "reCAPTCHA"
      }`,
      capcay: mode,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to change captcha mode",
      },
      { status: 500 }
    );
  }
}
