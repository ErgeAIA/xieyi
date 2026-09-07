import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { MotionProvider } from "@/components/motion-provider";
import { SiteHeader } from "@/components/site-header";
import { SidebarNav } from "@/components/site-sidebar";
import { ScrollSpyProvider } from "@/components/scroll-spy";
import { NavSpyProvider } from "@/components/nav-spy";
import { ScrollToTop } from "@/components/scroll-to-top";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "写意 · Vibe Coding 参考",
  description: "写意，以意运码，码落而器成。胸中之构，言而为品。",
  icons: { icon: `${BASE_PATH}/logo/icon.svg` },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="zh"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${plexMono.variable} antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('xieyi-theme');var dark=s===null||s==='dark';document.documentElement.classList.toggle('dark',dark);}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('xieyi-motion');var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var on=s===null?!r:s!=='off';document.documentElement.setAttribute('data-motion',on?'on':'off');}catch(e){}})();`,
          }}
        />
        <link
          rel="stylesheet"
          href={`${BASE_PATH}/fonts/lxgw-wenkai/lxgw-wenkai.css`}
        />
        <link
          rel="stylesheet"
          href={`${BASE_PATH}/fonts/ma-shan-zheng/ma-shan-zheng.css`}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <ThemeProvider>
          <MotionProvider>
            <TooltipProvider>
              <ScrollSpyProvider>
                <NavSpyProvider>
                <SiteHeader />
                <div className="flex min-h-[calc(100vh-3.5rem)]">
                  <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-80 shrink-0 self-start overflow-y-auto border-r border-sidebar-border bg-sidebar p-5 md:block">
                    <Suspense fallback={null}>
                      <SidebarNav />
                    </Suspense>
                  </aside>
                  <main className="min-w-0 flex-1 px-4 md:px-8 py-6">{children}</main>
                  <ScrollToTop />
                </div>
                </NavSpyProvider>
              </ScrollSpyProvider>
            </TooltipProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
