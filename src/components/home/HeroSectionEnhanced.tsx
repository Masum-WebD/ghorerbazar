'use client';

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { Slider } from "@/lib/api/home";
import { getImageUrl } from "@/lib/api/images";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSectionEnhancedProps {
  sliders?: Slider[];
}

const AUTO_PLAY_MS = 5000;

const HeroSectionEnhanced = ({ sliders }: HeroSectionEnhancedProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeSliders = sliders?.filter((s) => s.status === "active") || [];
  const count = activeSliders.length;
  const hasSliders = count > 0;
  const multiSlide = count > 1;

  const goToSlide = useCallback(
    (index: number) => setCurrentIndex((index + count) % count),
    [count]
  );

  // Autoplay loop
  useEffect(() => {
    if (!multiSlide || isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % count);
    }, AUTO_PLAY_MS);
    return () => clearInterval(timer);
  }, [multiSlide, count, isPaused]);

  if (!hasSliders) return null;

  return (
    <section className="w-full bg-white py-2 md:py-4">
      <div 
        className="container-main"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slider Container with rounded 10px and light shadow */}
        <div className="relative w-full bg-white rounded-[10px] overflow-hidden border border-slate-200/60 shadow-sm">
          
          {/* Active / Inactive Slides */}
          <div className="relative w-full overflow-hidden">
            {activeSliders.map((slider, index) => {
              const isActive = index === currentIndex;
              return (
                <div
                  key={slider.id}
                  className={cn(
                    "w-full transition-opacity duration-700 ease-in-out",
                    isActive ? "relative opacity-100 z-10" : "absolute inset-0 opacity-0 z-0 pointer-events-none"
                  )}
                >
                  <Image
                    src={getImageUrl(slider.image_url)}
                    alt={slider.title || "Banner"}
                    width={1920}
                    height={800}
                    priority={index === 0}
                    className="w-full h-auto block object-contain"
                  />
                </div>
              );
            })}
          </div>

          {/* Navigation Arrow buttons (Always visible) */}
          {multiSlide && (
            <>
              <button
                onClick={() => goToSlide(currentIndex - 1)}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-sm border border-slate-200/80 transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>
              <button
                onClick={() => goToSlide(currentIndex + 1)}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-sm border border-slate-200/80 transition-all"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 text-slate-700" />
              </button>
            </>
          )}

          {/* Indicators at the bottom */}
          {multiSlide && (
            <div className="absolute bottom-3 left-0 right-0 z-20 flex items-center justify-center gap-1.5">
              {activeSliders.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    idx === currentIndex
                      ? "w-6 bg-primary"
                      : "w-1.5 bg-slate-300/80 hover:bg-slate-400"
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-current={idx === currentIndex ? "true" : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSectionEnhanced;
