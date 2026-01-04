import "./globals.css";
import Navigation from "../components/Navigation";
import { Providers } from "../components/Providers";

export const metadata = {
  title: "秘封工倶楽部 - Hifuu Kou Club",
  description: "東方Project二次創作・動画制作サークル",
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
