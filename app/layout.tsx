// import "@coinbase/onchainkit/styles.css";
import { Inter as FontSans, Alfa_Slab_One, Tilt_Prism } from "next/font/google";

import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import Nav from "@/components/layout/Nav";
import { MainLayout } from "@/components/layout/main-layout";
import { cn } from "@/lib/utils";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontAlfa = Alfa_Slab_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-alfa-slab-one",
});

const fontTiltPrism = Tilt_Prism({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-tilt-prism",
});

export async function generateMetadata(): Promise<Metadata> {
  const URL = process.env.NEXT_PUBLIC_URL;
  return {
    title: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE,
        button: {
          title: `Launch ${process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME}`,
          action: {
            type: "launch_frame",
            name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
            url: URL,
            splashImageUrl: process.env.NEXT_PUBLIC_APP_SPLASH_IMAGE,
            splashBackgroundColor:
              process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR,
          },
        },
      }),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background",
          fontSans.variable,
          fontAlfa.variable,
          fontTiltPrism.variable,
        )}
      >
        <Providers>
          <Nav />
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
