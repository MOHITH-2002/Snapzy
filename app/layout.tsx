import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from 'sonner';
import { EdgeStoreProvider } from "@/lib/edgestore";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Snapzy",
  description: "Snapzy is a dynamic social media platform where users can post, follow, like, add stories, and block suspicious accounts. Engage with friends, share moments, and stay safe with our robust security features. Join Snapzy today for a seamless and secure social experience!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
        <div className="dark:bg-black w-full min-h-screen ">

        <EdgeStoreProvider>{children}</EdgeStoreProvider>

                <Toaster />
        </div>
        </ThemeProvider>
        </body>
    </html>
  );
}
