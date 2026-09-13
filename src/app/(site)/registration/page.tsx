import { redirect } from "next/navigation";
import { cormorant } from "@/lib/local-fonts";
import { TOPMATE_REGISTRATION_URL } from "@/lib/topmate";
import RegistrationFallback from "./RegistrationFallback";

const serif = cormorant;

export const dynamic = "force-dynamic";

function registrationUrl() {
  return TOPMATE_REGISTRATION_URL;
}

export default function RegistrationRedirectPage() {
  const target = registrationUrl();
  if (target) redirect(target);

  return <RegistrationFallback serifClass={serif.className} />;
}
