import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/components/providers/QueryProvider";
import "./globals.css";

const playfair = Playfair_Display({
  /* ...unchanged */
});
const inter = Inter({
  /* ...unchanged */
});

export const metadata = {
  /* ...unchanged */
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <QueryProvider>
          {children}
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              style: { borderRadius: "16px", fontFamily: "var(--font-inter)" },
            }}
          />
        </QueryProvider>
        {/* Google Identity Services — loaded once, available everywhere */}
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
