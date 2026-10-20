const offices = [
  {
    title: "Head Quarters Jakarta",
    address:
      "Jl. Griya Agung Blok N3 No.47-48, RT.2/RW.20, Sunter Agung, Tj. Priok, Kota Jakarta Utara, DKI Jakarta 14350.",
    hours: ["Senin - Jumat (08:30 - 17:00)"],
  },
  {
    title: "Balikpapan Branch Office",
    address:
      "Centra Bizpark 2 Ruko Blok BRK No.10-11, Jl. Kol. Syarifudin Yoes Sepinggan, Balikpapan 76114.",
    hours: [
      "Senin - Jumat (08:00 - 17:00)",
      "Sabtu (08:30 - 13:00)",
    ],
  },
  {
    title: "Surabaya Branch Office",
    address:
      "Jl. Raya Taman Asri No.21, RT.025/RW.008, Kel. Tambak Sumur, Kec. Waru, Sidoarjo, Jawa Timur 61256.",
    hours: ["Senin - Jumat (08:00 - 17:00)"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-50 py-16 text-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          Kantor Kurnia Safety
        </h2>

        <div className="grid grid-cols-1 divide-y divide-gray-300 md:grid-cols-3 md:divide-x md:divide-y-0">
          {offices.map((office) => (
            <div
              key={office.title}
              className="space-y-4 px-0 py-6 md:px-6 md:py-0"
            >
              <h3 className="text-lg font-bold text-slate-900">
                {office.title}
              </h3>

              <p className="text-sm leading-relaxed text-gray-600">
                {office.address}
              </p>

              <div className="space-y-1 text-sm">
                <span className="block font-semibold text-slate-900">
                  Office Hours
                </span>

                {office.hours.map((hour, index) => (
                  <p key={index} className="text-gray-500">
                    {hour}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}