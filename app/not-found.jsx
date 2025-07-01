"use client";
import { Button, Card, CardBody } from "@heroui/react";
import { useRouter } from "next/navigation";
import { LayoutJSX } from "../components/layout/layoutJSX";

export default function NotFound() {
  const router = useRouter();

  return (
    <LayoutJSX>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4">
        <Card className="max-w-md w-full shadow-xl">
          <CardBody className="text-center p-8">
            <div className="text-6xl font-bold text-primary mb-4">404</div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Halaman Tidak Ditemukan
            </h1>
            <p className="text-default-500 mb-6">
              Maaf, halaman yang Anda cari tidak dapat ditemukan
            </p>
            <div className="space-y-3">
              <Button
                color="primary"
                size="lg"
                className="w-full"
                onPress={() => router.back()}
              >
                Kembali ke Halaman Sebelumnya
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="w-full"
                onPress={() => router.push("/dashboard")}
              >
                Ke Dashboard
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </LayoutJSX>
  );
}
