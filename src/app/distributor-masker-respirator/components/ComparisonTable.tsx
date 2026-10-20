import Image from "next/image";

export default function ComparisonTable() {
  return (
    <section className="py-16 bg-slate-50 border-y border-[#EDEDED]/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-2 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Cari Masker KN95 Untuk Industri Tambang?
          </h2>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Mencari Masker Partikulat Setara 3M 9501V+ dengan Harga Lebih Murah?
          </p>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Untuk kebutuhan efisiensi anggaran perusahaan tanpa mengurangi standar keselamatan K3, Honeywell H910V+ hadir sebagai alternatif terbaik, lebih murah dan menawarkan  kenyamanan ekstra dengan penawaran harga yang jauh lebih ramah. 
          </p>
        </div>

        {/* Table */}
        <div className="pt-16 overflow-x-auto">
          <table className="w-full min-w-[650px] border-collapse">
            <thead>
              <tr>
                <th className="w-1/4 p-4"></th>

                {/* Honeywell */}
                <th className="relative bg-[#46B049] text-white text-center font-bold border border-black/25 pt-14 pb-4 px-4">
                  <Image
                    src="/images/distributor-masker-respirator/masker-kn95-honeywell-2.png"
                    alt="Honeywell H910V+ KN95"
                    width={160}
                    height={160}
                    className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                  />
                  Honeywell H910V+ KN95
                </th>

                {/* 3M */}
                <th className="relative bg-[#46B049] text-white text-lg text-center font-bold border border-black/25 pt-14 pb-4 px-4">
                  <Image
                    src="/images/distributor-masker-respirator/3M9501+KN95.png"
                    alt="3M 9501+ KN95"
                    width={160}
                    height={160}
                    className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                  />
                  3M 9501+ KN95
                </th>
              </tr>
            </thead>

            <tbody className="text-lg">
              <tr>
                <td className="sticky left-0 p-4 font-bold bg-[#EDEDED] border border-collapse border-black/25">
                  Standar
                </td>
                <td className="p-4 text-center bg-[#EDEDED]/50 border border-black/25">
                  KN95
                </td>
                <td className="p-4 text-center bg-[#EDEDED]/50 border border-black/25">
                  KN95
                </td>
              </tr>

              <tr>
                <td className="sticky left-0 p-4 font-bold bg-[#EDEDED] border border-black/25">
                  Efisiensi Filtrasi
                </td>
                <td className="p-4 text-center bg-[#46B049]/17 border border-black/25">≥95%</td>
                <td className="p-4 text-center bg-[#46B049]/17 border border-black/25">≥95%</td>
              </tr>

              <tr>
                <td className="sticky left-0 p-4 font-bold bg-[#EDEDED] border border-black/25">Bentuk</td>
                <td className="p-4 text-center bg-[#EDEDED]/50 border border-black/25">Flat fold, mudah di simpan</td>
                <td className="p-4 text-center bg-[#EDEDED]/50 border border-black/25">Flat fold, mudah di simpan</td>
              </tr>

              <tr>
                <td className="sticky left-0 p-4 font-bold bg-[#EDEDED] border border-black/25">Nose Foam</td>
                <td className="p-4 text-center bg-[#46B049]/17 border border-black/25">
                  Tebal dan Empuk
                </td>
                <td className="p-4 text-center bg-[#46B049]/17 border border-black/25">Minimalis</td>
              </tr>

              <tr>
                <td className="sticky left-0 p-4 font-bold bg-[#EDEDED] border border-black/25">Kenyamanan</td>
                <td className="p-4 text-center bg-[#EDEDED]/50 border border-black/25">Baik</td>
                <td className="p-4 text-center bg-[#EDEDED]/50 border border-black/25">Sedang</td>
              </tr>

              <tr>
                <td className="sticky left-0 p-4 font-bold bg-[#EDEDED] border border-black/25">Tali</td>
                <td className="p-4 text-center bg-[#46B049]/17 border border-black/25">Earloop</td>
                <td className="p-4 text-center bg-[#46B049]/17 border border-black/25">Earloop</td>
              </tr>

              <tr>
                <td className="sticky left-0 p-4 font-bold bg-[#EDEDED] border border-black/25">
                  Harga
                </td>
                <td className="p-4 font-bold text-center bg-[#EDEDED]/50 border border-black/25">
                  Lebih terjangkau
                </td>
                <td className="p-4 font-bold text-center bg-[#EDEDED]/50 border border-black/25">
                  Lebih premium
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}