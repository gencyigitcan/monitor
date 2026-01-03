import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ToastProvider";
import { SiteProvider } from "@/context/SiteContext";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Pulse | Status Monitoring",
  description: "A warm and friendly website & subdomain monitoring tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SiteProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </SiteProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
