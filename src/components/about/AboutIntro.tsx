const logo = "/assets/logo.png";
import { ParsedAboutIntro } from "@/lib/parseAboutContent";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Building2,
  Factory,
  Leaf,
  PenTool,
  Ruler,
  Warehouse,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SERVICE_ICONS = [Building2, Factory, Leaf, Warehouse, Ruler, PenTool];

interface AboutIntroProps {
  pageTitle: string;
  content: ParsedAboutIntro;
}

const AboutIntro = ({ pageTitle, content }: AboutIntroProps) => {
  const { companyName, tagline, intro, services } = content;

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20">
      <div className="container-main max-w-5xl">
        <ScrollReveal className="mx-auto text-center" direction="up">
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            {pageTitle}
          </h1>

          <div className="mt-8 flex justify-center">
            <img
              src={logo}
              alt="Siraj Tech"
              className="h-16 w-auto sm:h-20 md:h-24 hover:scale-105 transition-transform duration-300"
            />
          </div>

          <h2 className="mt-8 text-2xl font-extrabold text-slate-800 sm:text-3xl md:text-4xl">
            {companyName}
          </h2>

          {tagline && (
            <div className="mt-5 flex justify-center">
              <span className="inline-block bg-[#f99b1c] text-white px-6 py-2 rounded text-base font-semibold leading-relaxed shadow-sm tracking-wide">
                {tagline}
              </span>
            </div>
          )}
        </ScrollReveal>

        {intro && (
          <ScrollReveal className="mx-auto mt-8 max-w-3xl" delay={120} direction="up">
            <p className="text-center text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {intro}
            </p>
          </ScrollReveal>
        )}

        {services.length > 0 && (
          <div className="mx-auto mt-12 sm:mt-16">
            <ScrollReveal delay={180} direction="up">
              <h3 className="text-center text-lg font-bold text-slate-800 sm:text-xl md:text-2xl border-b border-slate-100 pb-4 max-w-xs mx-auto">
                আমাদের সার্ভিস সমুহঃ
              </h3>
            </ScrollReveal>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const Icon = SERVICE_ICONS[index % SERVICE_ICONS.length];
                return (
                  <ScrollReveal key={service} delay={220 + index * 60} direction="up">
                    <div
                      className={cn(
                        "flex flex-col items-center text-center gap-4 rounded-2xl border border-slate-100 p-6",
                        "bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                      )}
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00a850]/10 text-[#00a850]">
                        <Icon className="h-6 w-6" aria-hidden />
                      </span>
                      <span className="text-sm sm:text-base font-semibold leading-relaxed text-slate-800">
                        {service}
                      </span>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutIntro;

