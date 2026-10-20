import Navbar from "@/app/distributor-masker-respirator/components/Navbar";
import Hero from "@/app/distributor-masker-respirator/components/Hero";
import ComparisonTable from "@/app/distributor-masker-respirator/components/ComparisonTable";
import Footer from "@/app/distributor-masker-respirator/components/Footer";
import CTA from "@/app/distributor-masker-respirator/components/CTA";
import FAQ from "@/app/distributor-masker-respirator/components/FAQ";
import { GoogleAnalytics } from '@next/third-parties/google'
import GoogleAdsConversion from "@/app/distributor-masker-respirator/components/GoogleAdsConversion";

export default function Page() {
  return (
    <>
      <GoogleAnalytics gaId="AW-10861005741" />
      <GoogleAdsConversion />
    <div className="bg-slate-50 text-slate-800 antialiased pt-20">
        <Navbar />
        <Hero />
        <ComparisonTable />
        <FAQ />
        <Footer />
        <CTA />
      </div>
    </>
  );
}