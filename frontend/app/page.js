import Features from "@/components/Features";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Image from "next/image";

export default function Home() {
  return (
    <main className="  ">
      <HeroSection/>
      <HowItWorks/>
      <Features/>
    </main>
  );
}
