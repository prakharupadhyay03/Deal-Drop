"use client";

import { useState, useMemo } from "react";
import Header from "./Header";
import AddProductForm from "./AddProductForm";
import ProductCard from "./ProductCard";
import { TrendingDown, Shield, Bell, Rabbit } from "lucide-react";

const FEATURES = [
  {
    icon: Rabbit,
    title: "Lightning Fast",
    description:
      "Deal Drop extracts prices in seconds, handling JavaScript and dynamic content",
  },
  {
    icon: Shield,
    title: "Always Reliable",
    description:
      "Works across all major e-commerce sites with built-in anti-bot protection",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Get notified instantly when prices drop below your target",
  },
];

export default function DashboardContent({ user, initialProducts }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return initialProducts;
    const query = searchQuery.toLowerCase();
    return initialProducts.filter(
      (p) =>
        p.name?.toLowerCase().includes(query) ||
        p.url?.toLowerCase().includes(query)
    );
  }, [searchQuery, initialProducts]);

  return (
    <main className="min-h-screen relative overflow-hidden noise">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] animate-float opacity-30 pointer-events-none sm:left-1/4 sm:translate-x-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse-slow pointer-events-none" />

      <Header
        user={user}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-44 pb-20 px-6 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-sm font-medium text-orange-200/80">
              Made with ❤️ by Prakhar
            </span>
          </div>

          <h1 className="text-4xl sm:text-7xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
            <span className="font-heading text-white">Never Miss a</span>
            <br />
            <span className="text-gradient font-heading">Price Drop</span>
          </h1>

          <p className="text-base sm:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both leading-relaxed">
            Track prices from any e-commerce site. Get instant alerts when
            prices drop. Save money effortlessly.
          </p>

          <div className="animate-in fade-in slide-in-from-bottom-16 duration-1000 fill-mode-both">
            <AddProductForm user={user} />
          </div>

          {/* Features Grid - Only show if not searching or no products */}
          {(!user || initialProducts.length === 0) && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-24 px-4 sm:px-0">
              {FEATURES.map(({ icon: Icon, title, description }, i) => (
                <div
                  key={title}
                  className="glass-card p-8 text-left group animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${200 * i}ms` }}
                >
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center mb-6 group-hover:glow-orange transition-all duration-300">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-heading">
                    {title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      {user && initialProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-32">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <h3 className="text-2xl font-bold text-white font-heading">
              {searchQuery ? "Search Results" : "Tracked Products"}
            </h3>
            <div className="px-3 py-1 rounded-full glass text-xs font-medium text-zinc-400">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "Product" : "Products"}
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 items-start">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 glass rounded-3xl border-dashed border-white/10">
              <p className="text-zinc-500">No products match your search.</p>
            </div>
          )}
        </section>
      )}

      {/* Empty State (Global) */}
      {user && initialProducts.length === 0 && (
        <section className="max-w-2xl mx-auto px-4 pb-32 text-center animate-in fade-in duration-1000">
          <div className="glass-card rounded-[2rem] p-16 border-dashed border-white/10 group">
            <div className="w-20 h-20 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <TrendingDown className="w-10 h-10 text-zinc-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 font-heading">
              Your tracker is empty
            </h3>
            <p className="text-zinc-400 max-w-sm mx-auto">
              Ready to save? Paste a product link above and we'll start watching
              for price drops.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
