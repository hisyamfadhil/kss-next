"use client";

import { getRecaptcha } from "@/app/lib/api";
import { useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Toast from "@/app/[lang]/components/Toast";
import ThankYouModal from "./ModalSuccess";

export default function GatedDownloadModal({ buttonText, title }: { buttonText: string, title: string }) {
    const [open, setOpen] = useState(false);
    const [recaptcha, setRecaptcha] = useState("");
    const recaptchaRef:any = useRef<ReCAPTCHA>(null);
    const [isVerified, setIsVerified] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success" as "success" | "error" | "info",
      });

      const showToastHandler = (
        message: string,
        type: "success" | "error" | "info"
      ) => {
        setToast({ show: false, message: "", type: "success" });
      
        setTimeout(() => {
          setToast({
            show: true,
            message,
            type,
          });
        }, 100);
      };

    async function handleCaptcha(token: any) {
        setIsVerified(!!token);
    }

    const [form, setForm] = useState({
        fullname: "",
        email: "",
        company: "",
        jobtitle: "",
    });

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!isVerified) {
            showToastHandler("Please verify reCAPTCHA", "error");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("https://sandbox.kurniasafety.com/marketing-tools-post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email_type: 'marketing_tools',
                    message_name: form.fullname,
                    message_email: form.email,
                    message_company: form.company,
                    message_job_title: form.jobtitle,
                    message_category: title, 
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            if (data.status) {
                setShowModal(true);
                // showToastHandler("Berhasil kirim data!", "success");
              } else {
                showToastHandler(data.message || "Failed", "error");
              }

            // reset form
            setForm({
                fullname: "",
                email: "",
                company: "",
                jobtitle: "",
            });

            recaptchaRef.current.reset();
            setIsVerified(false);

        } catch (err: any) {
            showToastHandler(err.message || "Gagal kirim", "error");
        } finally {
            setLoading(false);
        }
    };

    async function getRecaptchaData() {
        const test = await getRecaptcha();

        // let siteKey = "6Ldc_IwsAAAAAJBDaZ1vmBLAfdqMcIoLFPPtmosy";
        // setRecaptcha(siteKey)
        setRecaptcha(test.siteKey)
    }

    useEffect(() => {
        if (!open) return;

    }, [open]);

    useEffect(() => {
        getRecaptchaData()
    }, []);

    return (
        <>
        
            {/* Button */}
            <button
                onClick={() => setOpen(true)}
                className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-800"
            >
                {buttonText}
            </button>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

                    <div className="relative w-full max-w-3xl bg-white rounded-lg p-8 max-h-[90vh] overflow-y-auto">

                        {/* Close button */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute right-4 top-4 text-2xl"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-semibold mb-6 text-center uppercase">
                            DOWNLOAD OUR {title}
                        </h2>

                        {/* HubSpot form */}
                        <div id="hubspot-form">
                            <form className="space-y-4" onSubmit={handleSubmit}>

                                <div className="grid gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-left">
                                            Full Name
                                        </label>
                                        <input
                                            name="fullname"
                                            required
                                            value={form.fullname}
                                            onChange={handleChange}
                                            className="w-full bg-gray-100 rounded-full px-3 py-2"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>


                                <div className="grid gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-left">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-gray-100 rounded-full px-3 py-2"
                                            placeholder="john@company.com"
                                        />
                                    </div>
                                </div>


                                <div className="grid gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-left">
                                            Company
                                        </label>
                                        <input
                                            name="company"
                                            required
                                            value={form.company}
                                            onChange={handleChange}
                                            className="w-full bg-gray-100 rounded-full px-3 py-2"
                                            placeholder="Company Name"
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-4">

                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-left">
                                            Job Title
                                        </label>
                                        <input
                                            name="jobtitle"
                                            required
                                            value={form.jobtitle}
                                            onChange={handleChange}
                                            className="w-full bg-gray-100 rounded-full px-3 py-2"
                                            placeholder="Manager"
                                        />
                                    </div>
                                </div>
                                <span className="text-sm text-gray-400 text-left block">
                                    *By submitting your information, you agree that Kurnia Safety Supplies may contact you regarding our safety equipment and services.
                                </span>
                                <span className="text-sm text-gray-400 text-left block">
                                    You can unsubscribe from these communications at any time.
                                </span>
                                <ReCAPTCHA sitekey={recaptcha} ref={recaptchaRef} onChange={handleCaptcha} />

                                <button
                                    disabled={!isVerified}
                                    type="submit"
                                    className="w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-800 transition
                                    disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300
                                    disabled:cursor-not-allowed disabled:hover:bg-gray-300 disabled:hover:text-gray-500"
                                >
                                    {loading ? "Sending..." : "Submit"}
                                </button>

                            </form>
                        </div>

                    </div>
                </div>
            )}
            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, show: false })}
            />

            <ThankYouModal
                show={showModal}
                onClose={() => setShowModal(false)}
            />
        </>
    );
}