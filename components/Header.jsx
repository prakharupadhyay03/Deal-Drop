"use client";

import Image from "next/image";
import { Search, Command } from "lucide-react";
import AuthButton from "./AuthButton";
import { Input } from "./ui/input";

export default function Header({ user, searchQuery, setSearchQuery }) {
  return (
    <header className="absolute sm:fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 py-5 flex justify-between items-center gap-4 transition-all duration-300">
        {/* Logo */}
        <div className="flex items-center gap-3 group shrink-0">
          <Image
            src="/deal-drop-logo.png"
            alt="Deal Drop Logo"
            width={600}
            height={200}
            className="h-8 w-auto invert contrast-[1.2] brightness-150 mix-blend-screen opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
          />
        </div>

        {/* Centered Search Bar - Hidden on mobile */}
        {user && (
          <div className="relative w-full max-w-sm group hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-orange-500 transition-colors" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-full bg-white/[0.03] border-white/10 pl-10 pr-12 rounded-xl focus-visible:ring-1 focus-visible:ring-orange-500/50 transition-all text-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 pointer-events-none">
              <Command className="w-3 h-3 text-zinc-500" />
              <span className="text-[10px] font-bold text-zinc-500 uppercase">K</span>
            </div>
          </div>
        )}

        {/* Auth Button */}
        <div className="shrink-0">
          <AuthButton user={user} />
        </div>
      </div>
    </header>
  );
}
