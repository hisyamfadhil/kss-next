// app/not-found.tsx
import { redirect } from "next/navigation";

export default function NotFoundPage() {
  // redirect otomatis ke /
  redirect("/");
}
