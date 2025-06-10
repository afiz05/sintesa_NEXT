"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";

export default function TestLoadingPage() {
  const router = useRouter();

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-2xl font-bold">Loading Animation Test Page</h1>
      <p className="text-gray-600 text-center max-w-md">
        Click the buttons below to navigate and see the loading animations in
        action. The dashboard has a 2-second delay to demonstrate the loading
        state.
      </p>{" "}
      <div className="flex flex-col gap-3">
        <Button
          color="primary"
          size="lg"
          onClick={() => router.push("/dashboard")}
        >
          Go to Dashboard (with loading)
        </Button>

        <Button
          color="secondary"
          size="lg"
          onClick={() => router.push("/mbg/dashboard-mbg")}
        >
          Go to MBG Dashboard (with loading)
        </Button>

        <Button
          color="secondary"
          variant="bordered"
          size="lg"
          onClick={() => router.push("/mbg/data-update")}
        >
          Go to MBG Data Update (with loading)
        </Button>

        <Button
          color="secondary"
          variant="bordered"
          size="lg"
          onClick={() => router.push("/mbg/kertas-kerja")}
        >
          Go to MBG Kertas Kerja (with loading)
        </Button>

        <Button
          color="default"
          variant="bordered"
          size="lg"
          onClick={() => router.push("/")}
        >
          Back to Home
        </Button>
      </div>
      <div className="mt-8 p-4 bg-blue-50 rounded-lg max-w-md">
        <h3 className="font-semibold text-blue-900 mb-2">
          How to see loading animations:
        </h3>{" "}
        <ol className="text-sm text-blue-800 space-y-1">
          <li>1. Click &quot;Go to Dashboard&quot; button above</li>
          <li>2. You should see the skeleton loading animation</li>
          <li>3. After 2 seconds, the actual dashboard will load</li>
          <li>4. Use browser navigation buttons to test more</li>
        </ol>
      </div>
    </div>
  );
}
