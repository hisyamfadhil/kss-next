// import Header from "@/app/components/partial/header";
import Navbar from "@/app/[lang]/components/partial/navbar";
import Footer from "@/app/[lang]/components/partial/footer";
import { 
  // getHeaderData, 
  getNavData, getFooterData } from "@/app/lib/api";
import { log } from "console";

export default async function ClientLayout({
  children,
  lang_id,
  lang
}: {
  children: React.ReactNode;
  lang_id: string;
  lang: string;
}) {

  // 🟢 Fetch langsung di server (bisa pakai cache bawaan Next.js)
  const [
    // headerData, 
    navData, footerData] = await Promise.all([
    // getHeaderData(lang_id),
    getNavData(lang_id),
    getFooterData(lang_id),
  ]);

  const hideLayout = lang == "u";  

  return (
    <>
      {/* <Header data={headerData} /> */}
      {!hideLayout &&<Navbar data={navData} lang_id={lang_id} />}
      <main>{children}</main>
      {!hideLayout &&<Footer data={footerData} lang_id={lang_id} />}
    </>
  );
}
