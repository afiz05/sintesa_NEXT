import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Call the backend API for belanja statistics
    const backendUrl = process.env.BACKEND_URL || "http://localhost:88";

    console.log(`Fetching belanja stats from: ${backendUrl}/belanjaStats`);

    const response = await fetch(`${backendUrl}/belanjaStats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend API error:", errorText);
      return NextResponse.json(
        {
          success: false,
          message: `Error from backend: ${response.status} ${response.statusText}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      data: data.data,
      message: data.message || "Statistics retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching belanja stats:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch belanja statistics",
      },
      { status: 500 }
    );
  }
}
