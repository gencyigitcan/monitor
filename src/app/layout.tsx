import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ToastProvider";
import { SiteProvider } from "@/context/SiteContext";

const inter = Inter({ subsets: ["latin"] });
// ... metadata ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </SiteProvider>
      </body>
    </html>
  );
}
