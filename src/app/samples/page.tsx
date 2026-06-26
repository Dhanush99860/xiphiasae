import { Cormorant_Garamond } from "next/font/google";
import MenuIconSamples from "./MenuIconSamples";
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500","600","700"], style: ["normal","italic"], display: "swap" });
export default function SamplesPage() { return <MenuIconSamples serifClass={serif.className} />; }
