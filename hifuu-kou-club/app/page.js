"use client";

import Hero from "@/components/Hero";
import NewsSection from "@/components/NewsSection";
import CharacterSection from "@/components/CharacterSection";
import VideoSection from "@/components/VideoSection";
import EmaSection from "@/components/EmaSection"; // NEW
import DiarySection from "@/components/DiarySection";
import Footer from "@/components/Footer";
import Omikuji from "@/components/Omikuji"; // NEW
import BgmPlayer from "@/components/BgmPlayer"; // NEW
import FusumaGate from "@/components/FusumaGate"; // NEW

export default function Home() {
  return (
    <main>
      <FusumaGate /> {/* Entrance Animation */}
      <Hero />
      <NewsSection />
      <CharacterSection />
      <VideoSection />
      <EmaSection /> {/* Added Ema Section */}
      <DiarySection />
      <Footer />

      {/* Floating Widgets */}
      <Omikuji />
      <BgmPlayer />
    </main>
  );
}
