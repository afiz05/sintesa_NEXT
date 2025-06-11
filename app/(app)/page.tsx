import type { NextPage } from "next";
import { redirect } from "next/navigation";

const Home: NextPage = () => {
  redirect("/dashboard");
};

export default Home;
