"use client";

import { useLanguage } from "@/app/context/LanguageContext";

function LicenseTerms() {
    const { t } = useLanguage();

    return (
        <section>
            <div className="relative w-full dark:bg-darkblack">
                <div className="container">
                    <div className="flex flex-col gap-4 py-10 md:gap-5 md:py-20">
                        <p>{t("licenseTermsLead1")}</p>
                        <p>{t("licenseTermsLead2")}</p>
                        <p>{t("licenseTermsLead3")}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LicenseTerms;
