import { AboutSection, getAboutSectionImageUrl } from "@/lib/api";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

interface AboutSectionBlockProps {
  section: AboutSection;
  index: number;
}

const AboutSectionBlock = ({ section, index }: AboutSectionBlockProps) => {
  const imageUrl = getAboutSectionImageUrl(section);
  const isImageRight = index % 2 === 0;

  const paragraphs = (section.description || "")
    .split(/\r?\n\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  // If there's no image, render as full-width centered text
  if (!imageUrl) {
    return (
      <section className="py-12 sm:py-16 bg-white">
        <div className="container-main max-w-4xl text-center px-4">
          <ScrollReveal direction="up">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-6">
              {section.title}
            </h2>
            <div className="space-y-4 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white overflow-hidden border-b border-slate-50 last:border-0">
      <div className="container-main max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Text Column */}
          <div
            className={cn(
              "flex flex-col justify-center",
              isImageRight ? "order-2 md:order-1" : "order-2 md:order-2"
            )}
          >
            <ScrollReveal direction={isImageRight ? "left" : "right"}>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-5">
                {section.title}
              </h2>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 text-justify">
                {paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Image Column */}
          <div
            className={cn(
              "flex justify-center",
              isImageRight ? "order-1 md:order-2" : "order-1 md:order-1"
            )}
          >
            <ScrollReveal
              className="w-full max-w-lg overflow-hidden rounded-2xl shadow-lg border border-slate-100/50"
              direction={isImageRight ? "right" : "left"}
            >
              <img
                src={imageUrl}
                alt={section.title}
                className="w-full h-auto aspect-[4/3] object-cover hover:scale-102 transition-transform duration-500"
                loading="lazy"
              />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionBlock;

