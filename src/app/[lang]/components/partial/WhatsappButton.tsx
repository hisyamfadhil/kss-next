import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
  const phone = "6281111311192";
  const text = "Halo! Saya menemukan website kurniasafety.com dan ingin menanyakan informasi terkait produk APD. Apakah bisa dibantu? Terima kasih."
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-5 z-[99999] flex items-center justify-center w-[70px] h-[70px] rounded-full bg-[#25D366] text-white text-3xl hover:scale-110 transition"
    >
      <FaWhatsapp />
    </a>
  );
}