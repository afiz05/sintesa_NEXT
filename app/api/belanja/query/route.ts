import { NextRequest, NextResponse } from "next/server";

interface QueryRequest {
  query: string;
}

interface QueryResponse {
  success: boolean;
  data?: any[];
  total?: number;
  pagination?: any;
  summary?: any;
  message?: string;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<QueryResponse>> {
  console.log("✅ API Route: POST /api/belanja/query called");

  try {
    const body: QueryRequest = await request.json();
    const { query } = body;

    console.log("📝 API Route: Received query:", query);

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid query parameter",
        },
        { status: 400 }
      );
    }

    // Call the backend API
    const backendUrl = process.env.BACKEND_URL || "http://localhost:88";
    const encodedQuery = encodeURIComponent(query);

    console.log("🔄 API Route: Sending query to backend:", query);

    try {
      // Send request to the backend API
      console.log(
        `🌐 API Route: Connecting to: ${backendUrl}/inquiryBelanja?queryParams=${encodedQuery}`
      );

      const response = await fetch(
        `${backendUrl}/inquiryBelanja?queryParams=${encodedQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

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

      // Handle the new response structure from BelanjaInquiry controller
      return NextResponse.json({
        success: true,
        data: data.result || [],
        total: data.pagination?.totalRows || 0,
        pagination: data.pagination,
        summary: data.summary,
        message: data.message || "Query executed successfully",
      });
    } catch (fetchError) {
      console.error("Error connecting to backend:", fetchError);
      return NextResponse.json(
        {
          success: false,
          message:
            "Failed to connect to backend service. Please try again later.",
        },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error("Error executing query:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
