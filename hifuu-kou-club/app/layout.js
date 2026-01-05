import "./globals.css";
import Navigation from "../components/Navigation";
import { Providers } from "../components/Providers";

export const metadata = {
  title: "秘封工倶楽部 - Hifuu Kou Club",
  description: "東方Project二次創作・動画制作サークル。秘封倶楽部（宇佐見蓮子＆マエリベリー・ハーン）を中心とした活動を行っています。",
  openGraph: {
    title: "秘封工倶楽部 - Hifuu Kou Club",
    description: "東方Project二次創作・動画制作サークル",
    url: 'https://hifuu-kou-club.vercel.app', // Update this with your actual Vercel URL later
    siteName: '秘封工倶楽部',
    images: [
      {
        url: '/hero-winter.jpg', // Using the uploaded hero image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "秘封工倶楽部 - Hifuu Kou Club",
    description: "東方Project二次創作・動画制作サークル",
    images: ['/hero-winter.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
