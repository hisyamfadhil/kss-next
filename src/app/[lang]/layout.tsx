import type { Metadata } from "next";
import { baseUrl, baseUrlAPI, imageBaseUrl } from "@/utils/baseUrl";
import "@/app/globals.css";
import ClientLayout from "@/app/[lang]/components/ClientLayout";
import { Jost } from 'next/font/google';
import { notFound } from "next/navigation";
import LangCookieSync from "./components/LangCookieSync";
import { getGoogleAnalytic } from "../lib/api";

const jost = Jost({ weight: '600', subsets: ['latin'], display: 'swap' });


export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  const lang_id = lang === "id" ? "2" : "1";
  const allowedLang = ["en", "id", "u"];

  if (!allowedLang.includes(lang)) {
    notFound(); // ⛔ 404
  }
  
  return (
    <>
      <LangCookieSync lang_id={lang_id} />
      <ClientLayout lang_id={lang_id} lang={lang}>{children}</ClientLayout>
    </>
  );
}
