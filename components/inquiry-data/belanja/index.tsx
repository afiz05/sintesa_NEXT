"use client";
import React from "react";
import { Header } from "./header";
import { Radio } from "./radio";
import { Form } from "./form";
import { BelanjaProvider } from "./context";

export const Belanja = () => {
  return (
    <BelanjaProvider>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
        <div className="my-3 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col">
          <Header
            title="Belanja Query Selection"
            description="Configure your data query parameters for belanja analysis"
          />

          <Radio />

          <Form />
        </div>
      </div>
    </BelanjaProvider>
  );
};
