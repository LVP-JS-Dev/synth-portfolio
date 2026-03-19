import { notFound } from "next/navigation";
import KeystaticApp from "./keystatic";
import { showAdminUI } from "@/keystatic.config";

export default function KeystaticLayout() {
  if (!showAdminUI) {
    notFound();
  }

  return <KeystaticApp />;
}
