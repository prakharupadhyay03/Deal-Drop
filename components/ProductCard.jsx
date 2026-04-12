"use client";

import { useState } from "react";
import { deleteProduct } from "@/app/actions";
import PriceChart from "./PriceChart";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Trash2,
  TrendingDown,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product }) {
  const [showChart, setShowChart] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Remove this product from tracking?")) return;

    setDeleting(true);
    await deleteProduct(product.id);
  };

  return (
    <Card className="glass-card overflow-hidden border-white/5 group hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 rounded-3xl sm:rounded-2xl backdrop-blur-xl">
      <CardHeader className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
          {product.image_url && (
            <div className="relative shrink-0 w-full sm:w-24 h-44 sm:h-24 rounded-2xl overflow-hidden glass group-hover:scale-105 transition-transform duration-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="font-bold text-white line-clamp-2 leading-tight font-heading group-hover:text-orange-400 transition-colors">
                {product.name}
              </h3>
              <Badge variant="secondary" className="glass text-[10px] uppercase tracking-wider font-bold text-orange-400 hover:bg-orange-500/20 transition-colors shrink-0">
                <TrendingDown className="w-3 h-3 mr-1" />
                Live
              </Badge>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-gradient tracking-tight">
                {product.currency} {product.current_price}
              </span>
              <span className="text-xs text-zinc-500 font-medium line-through">
                {/* Mockup original price if needed, otherwise just show label */}
                Original
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowChart(!showChart)}
            className="glass hover:bg-white/10 text-zinc-300 border-white/10 gap-2 h-9 px-4 rounded-xl"
          >
            {showChart ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Hide Stats
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show Stats
              </>
            )}
          </Button>

          <Button variant="secondary" size="sm" asChild className="glass hover:bg-orange-500 hover:text-white text-zinc-300 border-white/10 gap-2 h-9 px-4 rounded-xl group/btn">
            <Link href={product.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              Store
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={deleting}
            className="ml-auto text-zinc-500 hover:text-red-400 hover:bg-red-400/10 gap-2 h-9 px-3 rounded-xl transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>

      {showChart && (
        <CardFooter className="px-6 pb-6 pt-0 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-full glass rounded-2xl p-4 border-white/5">
            <PriceChart productId={product.id} />
          </div>
        </CardFooter>
      )}
    </Card>
  );
}