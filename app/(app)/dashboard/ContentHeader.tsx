"use client";

import { Content } from "@/components/home/content";
import { Kanwil } from "@/components/home/kanwil";
import { Suspense } from "react";

interface Props {
  dataDipa: any;
  dataKanwil: any;
}

export default function ContentHeader({ dataDipa, dataKanwil }: Props) {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-400 rounded-full animate-spin border-t-transparent"></div>
        </div>
      }
    >
      <Content dataDipa={dataDipa} dataKanwil={dataKanwil} loading={false} />
    </Suspense>
  );
}
