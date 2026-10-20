import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PUBLIC_FILE = /\.(.*)$/

const locales = ["en", "id"]
const defaultLocale = "en"

function getLocale(request: NextRequest) {
  const acceptLang = request.headers.get("accept-language")
  if (!acceptLang) return defaultLocale

  const preferred = acceptLang
    .split(",")
    .map(lang => lang.split(";")[0].trim().split("-")[0])

  return preferred.find(lang => locales.includes(lang)) || defaultLocale
}

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/") ||
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith("/distributor-masker-respirator") ||
    pathname.startsWith("/product-category") ||
    pathname.includes("/u/")
  ) {
    return
  }

  const pathnameHasLocale = locales.some(
    locale =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // ❗ kalau belum ada locale
  if (!pathnameHasLocale) {
    const locale = getLocale(req)

    const url = req.nextUrl.clone()
    url.pathname = `/${locale}${pathname}`
    url.search = search // ✅ PENTING: bawa query

    if (locale === defaultLocale) {
      return NextResponse.rewrite(url)
    }

    return NextResponse.redirect(url)
  }

  // ❗ remove default locale (/en → /)
  if (
    pathname.startsWith(`/${defaultLocale}/`) ||
    pathname === `/${defaultLocale}`
  ) {
    const url = req.nextUrl.clone()

    url.pathname = pathname.replace(`/${defaultLocale}`, "") || "/"
    url.search = search // ✅ tetap bawa query

    return NextResponse.redirect(url, 301)
  }

  return
}