// app/contact/ContactForm.tsx
"use client";

import ReCAPTCHA from "react-google-recaptcha";
import { useState, useRef, useEffect } from "react";
import { SendHorizonal } from "lucide-react";

import { submitContact } from "./actions";
import { t } from "@/app/lib/t";
import { getRecaptcha } from "@/app/lib/api"

export default function ContactForm({ success, dict, siteKey }: { success: any, dict: any, siteKey:string }) {
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [isVerified, setIsVerified] = useState(false);

    async function handleCaptcha(token: any) {
        setIsVerified(!!token);
    }

    return (
        <div className="ps-form--contact bg-white p-6">
            <h2 className="text-xl font-semibold mb-4">{t(dict, "send_us_email")}</h2>

            {success && (
                <div className="text-green-600 my-4 text-xl">
                    {t(dict, "msg_contact_success")}
                </div>
            )}

            <form className="space-y-6" action={submitContact}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ps-form__group">
                    <input
                        type="text"
                        name="name"
                        placeholder={t(dict, "name")}
                        className=" bg-[#f0f2f5] text-[#70849d] placeholder-[#70849d] w-full rounded-full p-3 focus:outline-none ps-form_input"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder={t(dict, "email_address")}
                        className=" bg-[#f0f2f5] text-[#70849d] placeholder-[#70849d] w-full rounded-full p-3 focus:outline-none ps-form_input"
                        required
                    />
                    <input
                        type="text"
                        name="subject"
                        placeholder={t(dict, "subject")}
                        className=" bg-[#f0f2f5] text-[#70849d] placeholder-[#70849d] w-full rounded-full p-3 focus:outline-none ps-form_input"
                        required
                    />
                </div>

                <textarea
                    name="message"
                    placeholder={t(dict, "message")}
                    className="bg-[#f0f2f5] text-[#70849d] placeholder-[#70849d] w-full rounded-full p-3 pl-10 min-h-[100px] focus:outline-none ps-form_input"
                    required
                ></textarea>

                <ReCAPTCHA sitekey={siteKey} ref={recaptchaRef} onChange={handleCaptcha} />
                
                <button
                    type="submit"
                    disabled={!isVerified}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#46b049] text-white font-semibold hover:bg-white hover:text-[#46b049] border border-[#46b049] transition
                        disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300
                        disabled:cursor-not-allowed disabled:hover:bg-gray-300 disabled:hover:text-gray-500
                    "
                >
                    <SendHorizonal />
                    {t(dict, "send")}
                </button>
            </form>
        </div>
    );
}
