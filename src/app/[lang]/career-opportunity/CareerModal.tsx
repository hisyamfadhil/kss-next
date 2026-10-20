"use client";

import { getRecaptcha } from "@/app/lib/api";
import { useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Toast from "@/app/[lang]/components/Toast";
import ThankYouModal from "./ModalSuccess";

export default function CareerModal({ buttonText, apply_to, link, title, division, location, description }: { buttonText: string, apply_to:string, link:string,title: string, division: string, location: string, description: string }) {
    const [open, setOpen] = useState(false);
    const [recaptcha, setRecaptcha] = useState("");
    const recaptchaRef: any = useRef<ReCAPTCHA>(null);
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
        phone: "",
        expected_salary: "",
        cv: null,
    });

    const handleChange = (e: any) => {
        setShowModal(true);

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e:any) => {
        const file = e.target.files?.[0];
      
        if (file && file.type !== "application/pdf") {
          alert("Hanya file PDF yang diperbolehkan");
          e.target.value = "";
          return;
        }
      
        setForm((prev) => ({
          ...prev,
          cv: file,
        }));
      };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!isVerified) {
            showToastHandler("Please verify reCAPTCHA", "error");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("email_type", 'career_opportunity');
            formData.append("fullname", form.fullname);
            formData.append("email", form.email);
            formData.append("phone", form.phone);
            formData.append("expected_salary", form.expected_salary);
            if (form.cv) {
                formData.append("cv", form.cv);
            }
            formData.append("message_category", title);
            // const res = await fetch("http://localhost:8080/career-opportunity-post", {
            const res = await fetch("https://sandbox.kurniasafety.com/career-opportunity-post", {
                method: "POST",
                // headers: {
                //     "Content-Type": "application/json",
                // },
                body: formData,
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
                phone: "",
                expected_salary: "",
                cv: null,
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

    const formatRupiah = (value: string) => {
        if (!value) return "";
    
        return Number(value).toLocaleString("id-ID");
    };

    return (
        <>

            {/* Button */}
            <button
                onClick={() => {
                    if (apply_to === "website") {
                      setOpen(true);
                    } else {
                      window.open(link, "_blank", "noopener,noreferrer");
                    }
                }}
                className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-800"
            >
                {buttonText}
            </button>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

                    <div className="relative w-full max-w-7xl bg-white rounded-lg p-8 max-h-[90vh] overflow-y-auto">

                        {/* Close button */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute right-4 top-4 text-2xl"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-semibold mb-6 uppercase">
                            {title}
                        </h2>
                        <div className="flex">
                            <div className="w-1/2">
                                <h3 className="text-xl">Division : {division}</h3>
                                <p className="text-xl">Location : {location}</p>
                                <br />
                                <p>Job Requirements:</p>
                                <pre className="pl-4 whitespace-pre-wrap break-words">
                                    {description}
                                </pre>
                            </div>
                            {/* HubSpot form */}
                            <div id="hubspot-form" className="w-1/2">
                                <h3 className="text-xl">Fill To Apply For This Position </h3>
                                <p>Please fill in all data completely and correctly. We will contact you in a short while after receiving your data.  </p>
                                <form className="space-y-4" onSubmit={handleSubmit}>

                                    <div className="grid gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-left">
                                                Full Name <span>(*)</span>
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
                                                Email <span>(*)</span>
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
                                                Mobile Phone Number <span>(*)</span>
                                            </label>
                                            <input
                                                name="phone"
                                                required
                                                value={form.phone}
                                                onChange={handleChange}
                                                className="w-full bg-gray-100 rounded-full px-3 py-2"
                                                placeholder="08123456789"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-4">

                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-left">
                                                Expected Sallary (IDR) <span>(*)</span>
                                            </label>
                                            <input
                                                name="expected_salary"
                                                required
                                                value={formatRupiah(form.expected_salary)}
                                                onChange={(e) => {
                                                    setForm({
                                                        ...form,
                                                        expected_salary: e.target.value.replace(/\D/g, ""),
                                                    });
                                                }}
                                                className="w-full bg-gray-100 rounded-full px-3 py-2"
                                                placeholder="8.000.000"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-left">
                                                CV/Resume <span>(*)</span>
                                            </label>

                                            <input
                                                type="file"
                                                accept=".pdf,application/pdf"
                                                onChange={handleFileChange}
                                                className="block w-full text-sm text-gray-500
                                                    file:mr-4 file:py-2 file:px-4
                                                    file:rounded-lg file:border-0
                                                    file:bg-gray-50 file:text-gray-700
                                                    file:font-medium hover:file:bg-gray-100"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-400 text-left block">
                                        Please make sure your data is all correct before submitting
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