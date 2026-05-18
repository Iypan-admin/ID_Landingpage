"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import LanguagesSection from "@/components/LanguagesSection";
import ProgramModesSection from "@/components/ProgramModesSection";
import WhyIsmlSection from "@/components/WhyIsmlSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FeeSection from "@/components/FeeSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import RegistrationModal from "@/components/RegistrationModal";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const ref = searchParams.get("ref");
      const ame = searchParams.get("ame");
      const ap = searchParams.get("ap");

      if (ref) sessionStorage.setItem("isml_ref", ref);
      if (ame) sessionStorage.setItem("isml_ame", ame);
      if (ap) sessionStorage.setItem("isml_ap", ap);
    }
  }, []);



  return (
    <main style={{ background: "#FFFFFF" }}>
      <Navbar onBookDemo={openModal} />
      
      <HeroSection onBookDemo={openModal} />
      
      {/* ── Core Program Content ── */}
      <AboutSection />
      <LanguagesSection />
      <ProgramModesSection onSelect={openModal} />
      
      {/* ── Trust & Proof ── */}
      <WhyIsmlSection />
      <HowItWorksSection />
      
      {/* ── Social Proof & Support ── */}
      <TestimonialsSection />
      <FeeSection onEnrol={openModal} />
      <FaqSection />
      
      <CtaSection onApply={openModal} />
      
      <Footer />
      


      <RegistrationModal isOpen={isModalOpen} onClose={closeModal} />
      <WhatsAppButton />


    </main>
  );
}
