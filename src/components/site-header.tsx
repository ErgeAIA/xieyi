"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Moon, Sun, Sparkles, ZapOff } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "@/components/theme-provider";
import { useMotionPref } from "@/components/motion-provider";
import { CommandSearch } from "@/components/command-search";
import { SidebarNav } from "@/components/site-sidebar";
import { Logo } from "@/components/logo";

/* GitHub 品牌图标：lucide 已弃用品牌 logo，此处内联 SVG（fill=currentColor 继承文字色，跟随主题）。 */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />
    </svg>
  );
}

export function SiteHeader() {
  const { theme, toggle } = useTheme();
  const { motionOn, toggle: toggleMotion } = useMotionPref();

  return (
    <header className="sticky top-0 z-30 flex min-h-14 items-center gap-3 border-b border-sidebar-border bg-sidebar px-5 py-2.5">
      <Sheet>
        <SheetTrigger
          render={
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="size-4" />
              <span className="sr-only">菜单</span>
            </Button>
          }
        />
        <SheetContent side="left" className="w-64">
          <SheetHeader>
            <SheetTitle>写意 · 导航</SheetTitle>
          </SheetHeader>
          <div className="mt-4 px-2">
            <SidebarNav />
          </div>
        </SheetContent>
      </Sheet>

      <Link href="/" className="flex items-center gap-2.5">
        <Logo size={30} className="shrink-0" />
        <span className="flex flex-col gap-0.5 leading-tight">
          <span className="flex items-baseline gap-2">
            <span className="font-brush text-xl font-semibold tracking-tight">
              写意
            </span>
            <span className="hidden font-brush text-sm tracking-wide text-primary sm:inline">
              XIEYI
            </span>
          </span>
          <span className="hidden max-w-[36ch] truncate text-[11px] text-muted-foreground/70 lg:block">
            以意运码，码落而器成。胸中之构，言而为品。
          </span>
        </span>
      </Link>

      <div className="ml-auto flex w-full max-w-sm items-center gap-2">
        <CommandSearch />
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={toggle}
        aria-label="切换主题"
      >
        {theme === "dark" ? (
          <Sun className="size-4" />
        ) : (
          <Moon className="size-4" />
        )}
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={toggleMotion}
        aria-label={motionOn ? "关闭动效" : "开启动效"}
        title={motionOn ? "关闭动效" : "开启动效"}
      >
        {motionOn ? (
          <Sparkles className="size-4" />
        ) : (
          <ZapOff className="size-4" />
        )}
      </Button>

      <Link
        href="https://github.com/ErgeAIA/xieyi"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub 仓库"
        title="GitHub 仓库"
        className={buttonVariants({ variant: "outline", size: "icon" })}
      >
        <GithubIcon className="size-4" />
      </Link>
    </header>
  );
}
