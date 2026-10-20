"use server";

import { postContactData } from "@/app/lib/api";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function submitContact(formData: FormData): Promise<void> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  await postContactData(name, email, subject, message);

  // (opsional)
  // revalidateTag("contact-form");

  redirect("/contact?success=1");
}
