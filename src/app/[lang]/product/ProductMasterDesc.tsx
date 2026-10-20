"use client";
import { useState } from "react";
import { useTranslations } from "@/app/hooks/useTranslate";

export default function ProductMasterDesc({
  data
}: {
  data: any;
}) {
  const { t } = useTranslations();
  const [activeTab, setActiveTab] = useState(
    data.description ? "description" : data.specification ? "specification" : ""
  );

  if (!data.description && !data.specification) return null;

  return (
    <div className="w-full mt-8">
      <ul className="flex">
        {data.description && (
          <li>
            <button
              onClick={() => setActiveTab("description")}
              className={`px-4 py-2 text-2xl ${
                activeTab === "description"
                  ? "bg-white font-semibold underline decoration-[#46b049]"
                  : ""
              }`}
            >
              {t("description")}
            </button>
          </li>
        )}

        {data.specification && (
          <li>
            <button
              onClick={() => setActiveTab("specification")}
              className={`px-4 py-2 text-2xl ${
                activeTab === "specification"
                  ? "bg-white font-semibold underline decoration-[#46b049] "
                  : ""
              }`}
            >
              {t("specification")}
            </button>
          </li>
        )}
      </ul>

      <div className="p-4 bg-white">
        {activeTab === "description" && data.description && (
          <div
            className="prose max-w-none lifeline-content"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        )}
        {activeTab === "specification" && data.specification && (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: data.specification }}
          />
        )}
      </div>
    </div>
  );
}
