"use server";

import { cookies } from "next/headers";

export const createAuthCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.set("userAuth", "myToken", { secure: true });
};

export const deleteAuthCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("userAuth");
};

export const checkAuthStatus = async (): Promise<boolean> => {
  const cookieStore = await cookies();
  return cookieStore.has("userAuth");
};
