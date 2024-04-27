import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Sidebar from "@/components/Layout/Sidebar";
import Providers from "./providers";
import "@/styles/globals.scss";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Booster Solana",
  description: "Booster Solana App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Sidebar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
