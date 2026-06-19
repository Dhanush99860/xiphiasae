import type { Metadata } from "next";
import HomeExperience from "@/components/HomeExperience/HomeExperience";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Best Immigration Consultants in India - XIPHIAS Immigration",
  description:
    "Xiphias Immigration offers expert residency, citizenship, corporate, and skilled migration services worldwide with 17+ years of experience",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Best Immigration Consultants in India – XIPHIAS Immigration",
    description:
      "Leading consultants for residency, citizenship, and skilled migration. Build your global future with XIPHIAS",
    url: "https://www.xiphiasimmigration.com",
    siteName: "XIPHIAS Immigration",
    locale: "en_US",
    type: "website",
    images: ["/xiphias-immigration.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Immigration Consultants in India – XIPHIAS Immigration",
    description:
      "Build your global future with XIPHIAS Immigration — experts in residency, citizenship, and migration",
    images: ["/xiphias-immigration.png"],
  },
};

export default function Home() {
  return <HomeExperience />;
}
