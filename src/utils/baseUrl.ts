export const baseUrl = (path: string, lang: string) => {
    const base_url = process.env.NEXT_PUBLIC_BASE_URL
    const base_url2 = process.env.NEXT_PUBLIC_BASE_URL2
    if (lang == "" || lang == "en") {
        return base_url2 + path
    } else {
        return base_url + lang + path
    }
}

export const baseUrlAPI = (path: string) => {
    const base_url = process.env.NEXT_PUBLIC_BASE_URL
    return base_url + path
}

export const imageBaseUrl = (path: string) => {
    const base_url_online = process.env.NEXT_PUBLIC_BASE_URL_ONLINE
    return base_url_online + path
}