
import Head from 'next/head';
import { imageBaseUrl } from '@/utils/baseUrl';

const Header = ({ data }: { data: any }) => {
  
  return (
    <Head>
      <meta name="keywords" content="<?= xss_clean($keywords); ?>" />
      <meta name="author" content="Kurnia Safety Supplies" />
      <meta property="og:locale" content="en-US" />
      <meta property="og:site_name" content="<?= xss_clean($this->general_settings->application_name); ?>" />
      <meta name="msvalidate.01" content="D5FEEF2C4890C260EC6BD22FCF9E7587" />
      {/* <?php if (isset($show_og_tags)): ?> */}
      <meta property="og:type" content="<?= !empty($og_type) ? $og_type : 'website'; ?>" />
      <meta property="og:title" content="<?= !empty($og_title) ? $og_title : 'index'; ?>" />
      <meta property="og:description" content="<?= $og_description; ?>" />
      <meta property="og:url" content="<?= $og_url; ?>" />
      <meta property="og:image" content="<?= $og_image; ?>" />
      <meta property="og:image:width" content="<?= !empty($og_width) ? $og_width : 250; ?>" />
      <meta property="og:image:height" content="<?= !empty($og_height) ? $og_height : 250; ?>" />
      <meta property="article:author" content="KSS" />
      <meta property="fb:app_id" content="<?= $this->general_settings->facebook_app_id; ?>" />
      {/* <?php if (!empty($og_tags)):foreach ($og_tags as $tag): ?> */}
      <meta property="article:tag" content="<?= $tag->tag; ?>" />
      {/* <?php endforeach; endif; ?> */}
      <meta property="article:published_time" content="<?= !empty($og_published_time) ? $og_published_time : ''; ?>" />
      <meta property="article:modified_time" content="<?= !empty($og_modified_time) ? $og_modified_time : ''; ?>" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@<?= xss_clean($this->general_settings->application_name); ?>" />
      <meta name="twitter:creator" content="@kurniasafety" />
      <meta name="twitter:title" content="<?= xss_clean($og_title); ?>" />
      <meta name="twitter:description" content="<?= xss_clean($og_description); ?>" />
      <meta name="twitter:image" content="<?= $og_image; ?>" />
      {/* <?php else: ?> */}
      <meta property="og:image" content="<?= get_logo($this->general_settings); ?>" />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="500" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="<?= xss_clean($title); ?> - <?= xss_clean($this->settings->site_title); ?>" />
      <meta property="og:description" content="<?= xss_clean($description); ?>" />
      <meta property="og:url" content={imageBaseUrl("")} />
      <meta property="fb:app_id" content="<?= $this->general_settings->facebook_app_id; ?>" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@<?= xss_clean($this->general_settings->application_name); ?>" />
      <meta name="twitter:title" content="<?= xss_clean($title); ?> - <?= xss_clean($this->settings->site_title); ?>" />
      <meta name="twitter:description" content="<?= xss_clean($description); ?>" />
      {/* <?php endif; ?>
    <?php if ($this->general_settings->pwa_status == 1): ?> */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="<?= xss_clean($this->general_settings->application_name); ?>" />
      <meta name="msapplication-TileImage" content={imageBaseUrl("@static/progressive_app/icon-pwa-144px.png")} />
      <meta name="msapplication-TileColor" content="#46b049" />
      <meta name="p:domain_verify" content="82ecac5d7a5cb0810808c229bb8c8525" />
      <link rel="manifest" href={imageBaseUrl("manifest.json")} />
      <link rel="apple-touch-icon" href={imageBaseUrl("@static/progressive_app/icon-pwa-144px.png")} />
      <link href="<?= get_favicon($this->general_settings); ?>" rel="apple-touch-icon-precomposed" />
      {/* <?php endif; ?> */}
      <link rel="canonical" href="<?= current_full_url(); ?>" />
      {/* <?php if ($this->general_settings->multilingual_system == 1): 
      foreach ($this->languages as $language): ?> */}
      <link rel="alternate" href="<?= convert_url_by_language($language); ?>"
      // hreflang="<?= $language->language_code ?>"
      />
      {/* <?php endforeach; endif; ?> */}

      
      {/* <?= $this->general_settings->google_analytics; ?> */}
      <div
          dangerouslySetInnerHTML={{
            __html: data.resultGeneralSetting.google_analytics
              .replace(/\\u003C/g, "<")
              .replace(/\\u003E/g, ">")
              .replace(/\\u0026/g, "&"),
          }}
        />
    </Head>
  );
};

export default Header;
