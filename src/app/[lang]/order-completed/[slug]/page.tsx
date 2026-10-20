import { getTranslations } from "@/app/lib/getTranslations";
import { t } from "@/app/lib/t";
import { baseUrl } from "@/utils/baseUrl";

export default async function ProductDetail({ params }: { params: { slug: string, lang:string } }) {
    const { slug, lang } = params;
    const lang_id = lang === "id" ? "2" : "1";
    const dict = await getTranslations(lang_id);
    return (
        <>
            <div className="ps-lost-password">
                <div className="container">

                    {/* <!-- separate sections --> */}
                    <div className="ps-delivery"></div>
                    <section className="ps-section--newsletter">
                        <div className="ps-section__content">
                            <div className="ps-form--subscribe">
                                <div className="circle-loader" style={{ alignItems: "center" }}>
                                    <div className="checkmark draw"></div>
                                </div>
                            </div>
                        </div>
                        <h3 className="ps-section__title">
                            {t(dict, "msg_order_completed")}
                        </h3>
                        <p style={{ textAlign: "center" }}>
                            {t(dict, "quotation")} {" "} {slug}
                        </p>
                        <div className="ps-form--subscribe mb-4">
                            <a href={baseUrl("/", lang)} className="ps-btn ps-btn--primary" style={{ alignItems: "center" }}>
                                {t(dict, "home")}
                            </a>
                        </div>
                        {/* // <?php if($order->payment_method=="Bank Transfer"): ?> */}
                        <p className="p-complete-payment">
                            {/* <?php echo trans("msg_bank_transfer_text_order_completed"); ?> */}
                        </p>
                        <div className="bank-account-container">
                            {/* <?php echo $this->payment_settings->bank_transfer_accounts; ?> */}
                        </div>
                        {/* <?php endif; ?> */}
                    </section>
                </div>
            </div>
        </>
    )
}