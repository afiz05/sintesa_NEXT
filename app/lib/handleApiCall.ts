// lib/apiClient.ts

export async function handleApiCall<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Request failed with status ${res.status}`
      );
    }

    return res.json();
  } catch (error: any) {
    console.error("API Error:", error.message);
    throw new Error(error.message || "Unexpected API error");
  }
}
