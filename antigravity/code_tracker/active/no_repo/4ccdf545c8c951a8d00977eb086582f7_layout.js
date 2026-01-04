îimport "./globals.css";
import Navigation from "../components/Navigation";
import { Providers } from "../components/Providers";

export const metadata = {
  title: "ç§˜å°å·¥å€¶æ¥½éƒ¨ - Hifuu Kou Club",
  description: "æ±æ–¹ProjectäºŒæ¬¡å‰µä½œãƒ»å‹•ç”»åˆ¶ä½œã‚µãƒ¼ã‚¯ãƒ«",
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
 *cascade08K*cascade08K€*cascade08€ô *cascade08ôÿ *cascade08ÿ••¡ *cascade08¡£ *cascade08£¤*cascade08¤¬ *cascade08¬­*cascade08­· *cascade08·Ì*cascade08Ìî *cascade082;file:///c:/Users/kouki/.gemini/hifuu-kou-club/app/layout.js