"use client";

import { Facebook, Twitter, Linkedin } from "lucide-react";
import { FaWhatsapp, FaPinterestP } from "react-icons/fa";

interface Props {
  url: string;
  title: string;
  image?: string;
}

export default function SocialShare({ url, title, image }: Props) {
  const shareWindow = (shareUrl: string) => {
    window.open(shareUrl, "Share This Post", "width=640,height=450");
  };

  return (
    <div className="ps-product__social">
      <ul className="ps-social ps-social--color">

        {/* Facebook */}
        <li>
          <button
            onClick={() =>
              shareWindow(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
              )
            }
            aria-label="Share on Facebook"
            className="ps-social__link facebook"
          >
            <Facebook className="w-full h-full p-2" />
            <span className="ps-tooltip">Facebook</span>
          </button>
        </li>

        {/* Twitter */}
        <li>
          <button
            onClick={() =>
              shareWindow(
                `https://twitter.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
              )
            }
            aria-label="Share on Twitter"
            className="ps-social__link twitter"
          >
            <Twitter className="w-full h-full p-2" />
            <span className="ps-tooltip">Twitter</span>
          </button>
        </li>

        {/* WhatsApp */}
        <li>
          {/* <a
            className="ps-social__link whatsapp"
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title)} - ${encodeURIComponent(url)}`}
            target="_blank"
            aria-label="Share on WhatsApp"
          > */}
          <button
            onClick={() =>
              shareWindow(`https://api.whatsapp.com/send?text=${encodeURIComponent(title)} - ${encodeURIComponent(url)}`)
            }
            aria-label="Share on WhatsApp"
            className="ps-social__link whatsapp"
          >
            <FaWhatsapp className="w-full h-full p-2" />
            <span className="ps-tooltip">WhatsApp</span>
          </button>
          {/* </a> */}
        </li>

        {/* Pinterest */}
        <li>
          <button
            onClick={() =>
              shareWindow(
                `http://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(image || "")}`
              )
            }
            aria-label="Share on Pinterest"
            className="ps-social__link pinterest"
          >
            <FaPinterestP className="w-full h-full p-2" />
            <span className="ps-tooltip">Pinterest</span>
          </button>
        </li>

        {/* LinkedIn */}
        <li>
          <button
            onClick={() =>
              shareWindow(
                `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`
              )
            }
            aria-label="Share on LinkedIn"
            className="ps-social__link linkedin"
          >
            <Linkedin className="w-full h-full p-2" />
            <span className="ps-tooltip">LinkedIn</span>
          </button>
        </li>

      </ul>
    </div>
  );
}
