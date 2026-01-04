"use client";

import Hero from '../components/Hero';
import NewsSection from '../components/NewsSection';
import VideoSection from '../components/VideoSection';
import CharacterSection from '../components/CharacterSection';
import DiarySection from '../components/DiarySection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main style={{ width: '100%', overflowX: 'hidden' }}>
      <Hero />
      <NewsSection />
      <VideoSection />
      <CharacterSection />
      <DiarySection />
      <Footer />
    </main>
  );
}
