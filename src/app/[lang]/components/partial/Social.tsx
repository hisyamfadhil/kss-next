import Link from "next/link";
import {
  FaPinterest,
  FaWhatsapp,
  FaTelegram,
} from "react-icons/fa";

import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Rss,
} from "lucide-react";

interface Social {
  facebook_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  linkedin_url?: string;
  youtube_url?: string;
  pinterest_url?: string;
  whatsapp_url?: string;
  telegram_url?: string;
}

const Social = ({ data }: { data: any }) => {
  const result = data?.resultSetting || {};
  const general_settings = data?.resultGeneralSetting || {};
  const dataSocial = {
    facebook_url: result.facebook_url || "",
    twitter_url: result.twitter_url || "",
    instagram_url: result.instagram_url || "",
    linkedin_url: result.linkedin_url || "",
    youtube_url: result.youtube_url || "",
    pinterest_url: result.pinterest_url || "",
    whatsapp_url: result.whatsapp_url || "",
    telegram_url: result.telegram_url || "",
  };


  return (
    <ul className="ps-social space-y-3">
      {dataSocial.facebook_url && (
        <li>
          <Link
            className="ps-social__link relative text-[20px] text-[#70849d] facebook hover:text-[#3b5998]"
            href={dataSocial.facebook_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to Facebook page for PT Kurnia Safety Supplies"
          >
            <Facebook className="text-[#70849d] hover:text-[#3b5998]" size={18}/>
            <h5 className="ps-tooltip text-[#70849d] hover:text-[#3b5998] bg-[#3b5998]">Facebook</h5>
          </Link>
        </li>
      )}

      {dataSocial.twitter_url && (
        <li>
          <Link
            className=" ps-social__linkrelative text-[20px] text-[#70849d] twitter"
            href={dataSocial.twitter_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to Twitter page for PT Kurnia Safety Supplies"
          >
            <Twitter className="text-[#70849d] hover:text-[#55acee]" size={18}/>
            <h5 className="ps-tooltip">Twitter</h5>
          </Link>
        </li>
      )}

      {dataSocial.instagram_url && (
        <li>
          <Link
            className="ps-social__link relative text-[20px] text-[#70849d] instagram"
            href={dataSocial.instagram_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to Instagram page for PT Kurnia Safety Supplies"
          >
            <Instagram className="text-[#70849d] hover:text-[#9e3472]" size={18}/>
            <h5 className="ps-tooltip">Instagram</h5>
          </Link>
        </li>
      )}

      {dataSocial.linkedin_url && (
        <li>
          <Link
            className="ps-social__link relative text-[20px] text-[#70849d] linkedin"
            href={dataSocial.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to LinkedIn page for PT Kurnia Safety Supplies"
          >
            <Linkedin className="text-[#70849d] hover:text-[#176dba]" size={18}/>
            <h5 className="ps-tooltip">LinkedIn</h5>
          </Link>
        </li>
      )}

      {dataSocial.youtube_url && (
        <li>
          <Link
            className="ps-social__link relative text-[20px] text-[#70849d] youtube"
            href={dataSocial.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to YouTube page for PT Kurnia Safety Supplies"
          >
            <Youtube className="text-[#70849d] hover:text-[#cc181e]" size={18}/>
            <h5 className="ps-tooltip">YouTube</h5>
          </Link>
        </li>
      )}

      {dataSocial.pinterest_url && (
        <li>
          <Link
            className="ps-social__link relative text-[20px] text-[#70849d] pinterest"
            href={dataSocial.pinterest_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to Pinterest page for PT Kurnia Safety Supplies"
          >
            <FaPinterest className="text-[#70849d] hover:text-[#cb2027]" size={18}/>
            <h5 className="ps-tooltip">Pinterest</h5>
          </Link>
        </li>
      )}

      {dataSocial.whatsapp_url && (
        <li>
          <Link
            className="ps-social__link relative text-[20px] text-[#70849d] whatsapp"
            href={dataSocial.whatsapp_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to WhatsApp page for PT Kurnia Safety Supplies"
          >
            <FaWhatsapp className="text-[#70849d] hover:text-[#00a901]" size={18}/>
            <h5 className="ps-tooltip">WhatsApp</h5>
          </Link>
        </li>
      )}

      {dataSocial.telegram_url && (
        <li>
          <Link
            className="ps-social__link relative text-[20px] text-[#70849d] telegram"
            href={dataSocial.telegram_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to Telegram page for PT Kurnia Safety Supplies"
          >
            <FaTelegram className="text-[#70849d] hover:text-[#00a901]" size={18}/>
            <h5 className="ps-tooltip">Telegram</h5>
          </Link>
        </li>
      )}

      {/* Contoh tambahan jika ingin RSS tetap tampil */}
      {general_settings.rss_system == 1 && dataSocial.telegram_url && (
      <li>
        <Link className="ps-social__link relative text-[20px] text-[#70849d] rss" href="/rss_feeds" target="_blank" rel="noopener noreferrer"
        aria-label="Go to RSS page for PT Kurnia Safety Supplies">
          <Rss className="text-[#70849d]" size={18}/>
          <h5 className="ps-tooltip">RSS</h5>
        </Link>
      </li>
      )}
    </ul>
  );
};

export default Social;
