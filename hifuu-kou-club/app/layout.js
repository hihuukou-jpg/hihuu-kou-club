import "./globals.css";
import Navigation from "../components/Navigation";
import { Providers } from "../components/Providers";
import SharkTransition from "../components/SharkTransition";

export const metadata = {
  title: "秘封工倶楽部 - 東方Project二次創作サークル",
  description: "東方Projectの二次創作サークル「秘封工倶楽部」の公式サイトです。宇佐見蓮子とマエリベリー・ハーン（メリー）とともに、科学と幻想の境界を探求する動画や活動日誌を公開しています。",
  keywords: ["東方Project", "二次創作", "秘封倶楽部", "宇佐見蓮子", "マエリベリー・ハーン", "Web制作", "動画制作", "ガジェット", "同人サークル"],
  openGraph: {
    title: "秘封工倶楽部 - Hifuu Kou Club",
    description: "東方Project二次創作・動画制作サークル",
    url: 'https://hifuu-kou-club.vercel.app',
    siteName: '秘封工倶楽部',
    images: [
      {
        url: '/logo.png', // Main logo as OG image priority
        width: 1200,
        height: 630,
        alt: '秘封工倶楽部 ロゴ'
      },
      {
        url: '/hero-winter.jpg',
        width: 1200,
        height: 630,
        alt: '秘封工倶楽部 ヒーロー画像'
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "秘封工倶楽部 - Hifuu Kou Club",
    description: "東方Project二次創作・動画制作サークル",
    images: ['/logo.png', '/hero-winter.jpg'],
  },
  verification: {
    google: "1nsn07VkF2M5rLjer2pZ7l00U0mozvRZ1lzvsfGd-ak",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <SharkTransition />
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
