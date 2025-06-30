import "@/styles/globals.css";
import { LayoutJSX } from "../../components/layout/layoutJSX";

export default function RootLayout({ children }) {
  return <LayoutJSX>{children}</LayoutJSX>;
}
