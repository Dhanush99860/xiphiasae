import { redirect } from "next/navigation";
import { Cormorant_Garamond } from "next/font/google";
import { TOPMATE_REGISTRATION_URL } from "@/lib/topmate";
import RegistrationFallback from "./RegistrationFallback";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const dynamic = "force-dynamic";

function registrationUrl() {
  return TOPMATE_REGISTRATION_URL;
}

export default function RegistrationRedirectPage() {
  const target = registrationUrl();
  if (target) redirect(target);

  return <RegistrationFallback serifClass={serif.className} />;
}
