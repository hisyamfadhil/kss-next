import { baseUrlAPI } from "@/utils/baseUrl";
import { redirect } from 'next/navigation';

export async function getHeaderData(lang_id: string) {
  const url = baseUrlAPI(`api/header/${lang_id}`);
  const res = await fetch(url,
    { cache: "force-cache", next: { revalidate: 1800, tags: [`header-${lang_id}`] } }
  );
  if (!res.ok) throw new Error(`Gagal mengambil data header: ${res.status}`);
  return res.json();
}

export async function getGoogleAnalytic() {
  const url = baseUrlAPI(`api/google_analytic`);
  const res = await fetch(url,
    { cache: "force-cache", next: { revalidate: 1800, tags: ['google-analytic'] } }
  );
  if (!res.ok) throw new Error(`Gagal mengambil data navbar: ${res.status}`);
  return res.json();
}

export async function getNavData(lang_id: string) {
  const url = baseUrlAPI(`api/navbar/${lang_id}`);
  const res = await fetch(url,
    // { cache: "force-cache", next: { revalidate: 1800, tags: [`navbar-${lang_id}`] } }
  );
  if (!res.ok) throw new Error(`Gagal mengambil data navbar: ${res.status}`);
  return res.json();
}

export async function getContactData(lang_id: string) {
  const url = baseUrlAPI(`api/contact/${lang_id}`);
  const res = await fetch(url,
    { cache: "force-cache", next: { revalidate: 1800, tags: [`contact-${lang_id}`] } }
  );
  if (!res.ok) throw new Error(`Gagal mengambil data contact: ${res.status}`);
  return res.json();
}

export async function postContactData(name: string, email: string, subject: string, message: string) {
  const url = baseUrlAPI(`api/contact`);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      subject,
      message,
    }),
  });
  if (!res.ok) throw new Error(`Gagal mengambil data contact: ${res.status}`);
  return res.json();
}

export async function PostShippingData(identity: any, products: any) {
  const url = baseUrlAPI(`api/shipping`);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      identity,
      products
    }),
  });
  if (!res.ok) throw new Error(`Gagal mengambil data shipping: ${res.status}`);
  return res.json();
}

export async function getFooterData(lang_id: string) {
  const url = baseUrlAPI(`api/footer/${lang_id}`);
  const res = await fetch(url,
    // { cache: "force-cache", next: { revalidate: 1800, tags: [`footer-${lang_id}`] } }
  );
  if (!res.ok) throw new Error(`Gagal mengambil data footer: ${res.status}`);
  return res.json();
}

export async function getHomeData(lang_id: string) {
  const url = baseUrlAPI(`api/home/${lang_id}`);
  const res = await fetch(url,
    // { cache: "force-cache", next: { revalidate: 1800, tags: [`home-${lang_id}`] } }
  );
  if (!res.ok) throw new Error(`Gagal mengambil data home: ${res.status}`);
  return res.json();
}

export async function getGatedContentData(lang_id: string) {
  const url = baseUrlAPI(`api/gated-content/${lang_id}`);
  const res = await fetch(url,
    // { cache: "force-cache", next: { revalidate: 1800, tags: [`gated-content-${lang_id}`] } }
  );
  if (!res.ok) throw new Error(`Gagal mengambil data gated content: ${JSON.stringify(res)}`);
  return res.json();
}

export async function getCareerOpportunityData(lang_id: string) {
  const url = baseUrlAPI(`api/career-opportunity/${lang_id}`);
  const res = await fetch(url,
    // { cache: "force-cache", next: { revalidate: 1800, tags: [`gated-content-${lang_id}`] } }
  );
  if (!res.ok) throw new Error(`Gagal mengambil data career opportunity: ${JSON.stringify(res)}`);
  return res.json();
}

export async function getProductData(lang_id: string, parent_category: string, category: string, brand: any, search: string, page: number, sort: string) {
  const url = baseUrlAPI(`api/product/${lang_id}?parent_category=${parent_category}&category=${category}&brand=${brand}&search=${search}&page=${page}&sort=${sort}`);
  console.log("url", url);
  
  const res = await fetch(url,
    // { cache: "force-cache", next: { revalidate: 1800, tags: [`product-${lang_id}`] } }
  );
  if (!res.ok) throw new Error(`Gagal mengambil data product: ${res.status}`);
  return res.json();
}

export async function getProductDetailData(lang_id: string, slug: string) {
  const url = baseUrlAPI(`api/product_detail/${lang_id}/${slug}`);
  const res = await fetch(url,
    { cache: "force-cache", next: { revalidate: 1800, tags: [`product-${lang_id}-${slug}`] } }
  );
  if (!res.ok) redirect('/');
  return res.json();
}

export async function getLifelineData(lang_id: string, slug: string) {
  const url = baseUrlAPI(`api/lifeline/${lang_id}?slug=${slug}`);
  const res = await fetch(url,
    { cache: "force-cache", next: { revalidate: 1800, tags: [`lifeline-${lang_id}-${slug}`] } }
  );
  if (!res.ok) throw new Error(`Gagal mengambil data product detail: ${res.status}`);
  return res.json();
}

export async function getLifelineDetailData(lang_id: string, slug: string) {
  const url = baseUrlAPI(`api/lifeline_detail/${lang_id}?slug=${slug}`);
  const res = await fetch(url,
    { cache: "force-cache", next: { revalidate: 1800, tags: [`lifeline-detail-${lang_id}-${slug}`] } }
  );
  if (!res.ok) throw new Error(`Gagal mengambil data product detail: ${res.status}`);
  return res.json();
}

export async function getBlogData(lang_id: string, page: number, tag: string, category: string) {
  const url = baseUrlAPI(`api/blog/${lang_id}?page=${page}&tag=${tag}&category=${category}`);
  const res = await fetch(url,
    { cache: "force-cache", next: { revalidate: 1800, tags: [`blog-${lang_id}`] } }
  );
  if (!res.ok) throw new Error(`Gagal mengambil data product detail: ${res.status}`);
  return res.json();
}

export async function getBlogDetailData(lang_id: string, slug: string) {
  const url = baseUrlAPI(`api/blog-detail/${lang_id}/${slug}`);
  const res = await fetch(url,
    { cache: "force-cache", next: { revalidate: 1800, tags: [`blog-detail-${lang_id}-${slug}`] } }
  );
  if (!res.ok){
    const url2 = baseUrlAPI(`api/blog-detail/2/${slug}`);
    const res2 = await fetch(url2,
      { cache: "force-cache", next: { revalidate: 1800, tags: [`blog-detail-2-${slug}`] } }
    );
    if (res2.ok) {
      redirect(`/id/${slug}`)
    } else { 
      redirect('/')
    };
  }
  return res.json();
}

export async function getPagesData(lang_id: string, slug: string) {
  const url = baseUrlAPI(`api/pages/${lang_id}/${slug}`);
  const res = await fetch(url,
    // { cache: "force-cache", next: { revalidate: 1800, tags: [`blog-detail-${lang_id}`] } }
  );
  if (!res.ok) redirect('/');
  return res.json();
}

export async function getLocationCountriesData() {
  const url = baseUrlAPI(`api/location_countries`);
  const res = await fetch(url,
    { cache: "force-cache", next: { revalidate: 1800, tags: [`location_countries`] } }
  );
  if (!res.ok) throw new Error(`Gagal mengambil data location countries: ${res.status}`);
  return res.json();
}

export async function getLocationStatesData(country_id: string) {
  const url = baseUrlAPI(`api/location_states/${country_id}`);
  const res = await fetch(url,
    { cache: "force-cache", next: { revalidate: 1800, tags: [`location-states`] } }
  );
  if (!res.ok) throw new Error(`Gagal mengambil data location states: ${res.status}`);
  return res.json();
}

export async function getRecaptcha() {
  const url = baseUrlAPI(`api/recaptcha`);
  const res = await fetch(url,
    // { cache: "force-cache", next: { revalidate: 1800, tags: [`recaptcha`] } }
  );  
  if (!res.ok) throw new Error(`Gagal mengambil data recaptcha: ${res.status}`);
  return res.json();
}