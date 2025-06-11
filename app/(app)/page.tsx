import type { NextPage } from "next";
import { redirect } from "next/navigation";

const Home: NextPage = () => {
  redirect("/v3/next/dashboard");
};

export default Home;
