"use client";

import Hero from "@/components/Hero";
import NewsSection from "@/components/NewsSection";
import IllustrationSection from "@/components/IllustrationSection"; // REPLACED CharacterSection
import VideoSection from "@/components/VideoSection";
import EmaSection from "@/components/EmaSection"; // NEW
import DiarySection from "@/components/DiarySection";
import Footer from "@/components/Footer";
import Omikuji from "@/components/Omikuji"; // NEW
import BgmPlayer from "@/components/BgmPlayer"; // NEW
import FusumaGate from "@/components/FusumaGate"; // Entrance Animation
import FusumaTransition from "@/components/FusumaTransition"; // Theme Transition
import SharkTransition from "@/components/SharkTransition"; // Theme Transition
import SnowEffect from "@/components/SnowEffect"; // Global Background Effect
import ScrollReveal from "@/components/ScrollReveal"; // NEW

export default function Home() {
  return (
    <main style={{ position: 'relative' }}>
      <FusumaGate /> {/* Entrance Animation */}
      <FusumaTransition /> {/* Ura -> Omote */}
      <SharkTransition /> {/* Omote -> Ura */}
      <SnowEffect /> {/* Global Background Effect */}

      <Hero />

      <ScrollReveal><NewsSection /></ScrollReveal>
      <ScrollReveal><IllustrationSection /></ScrollReveal>
      <ScrollReveal><VideoSection /></ScrollReveal>
      <ScrollReveal><EmaSection /></ScrollReveal>
      <ScrollReveal><DiarySection /></ScrollReveal>

      <Footer />

      {/* Floating Widgets */}
      <Omikuji />
      <BgmPlayer />
    </main>
  );
}
