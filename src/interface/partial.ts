export interface iHeader {
  site_title: string;
  site_description: string;
  keywords: string;
}

export interface iFont {
  font_url: string;
}

export interface iNavbar {
  site_title: string;
  contact_phone: string;
  contact_email: string;
}

export interface iLanguage {
    flag_path: string;
    name: string;
}

export interface iPages {
  id: string;
  title: string;
  slug: string
  page_order: string;
  description: string;
  keyword: string;
  location: string;
  page_default_name: string;
}

export interface iGeneralSetting {
    logo: string;
    multilingual_system: string;
}

export interface iSetting {
    contact_phone: string;
    contact_email: string;
}

export interface iFooter {
  about_footer: string;
  about_company: string
  copyright: string;
  contact_address: string;
  contact_phone: string;
}