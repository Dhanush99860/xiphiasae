// src/app/(site)/client-referrals/page.tsx

import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import ReferralsView from "./ReferralsView";

const serif = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["500", "600", "700"],
    style: ["normal", "italic"],
    display: "swap",
});

const CANONICAL = "/client-referrals";
const ABSOLUTE_URL =
    "https://www.xiphiasimmigration.com/client-referrals";

export const revalidate = 86400;

export const metadata: Metadata = {
    title: "Client Referral Program | XIPHIAS Immigration",
    description:
        "Refer friends, family, or colleagues to XIPHIAS Immigration and help them access trusted residency and citizenship advisory.",
    keywords: [
        "XIPHIAS Immigration referral",
        "client referrals",
        "refer a friend",
        "immigration consultant referral program",
    ],
    alternates: {
        canonical: CANONICAL,
    },
    openGraph: {
        title: "Client Referral Program | XIPHIAS Immigration",
        description:
            "Introduce friends and family to trusted immigration experts at XIPHIAS. Earn rewards when your referral becomes a client.",
        url: ABSOLUTE_URL,
        siteName: "XIPHIAS Immigration",
        type: "website",
        images: [
            {
                url: "/xiphias-immigration.png",
                width: 1200,
                height: 630,
                alt: "Client referral program at XIPHIAS Immigration",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Client Referral Program | XIPHIAS Immigration",
        description:
            "Share the benefits of trusted immigration advisory with your network and earn referral rewards.",
        images: ["/xiphias-immigration.png"],
    },
    robots: { index: true, follow: true },
};

export default function ClientReferralsPage() {
    return <ReferralsView serifClass={serif.className} />;
}
