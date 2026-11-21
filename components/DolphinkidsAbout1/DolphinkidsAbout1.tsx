'use client';

import { mapThemeUploadAssetsInData } from '../../../lib/dolphinkidsAssets';
import { Award, Compass, Heart, Lightbulb, Target, type LucideIcon } from 'lucide-react';


const dolphinCss = `
.dk-eyebrow{font-size:.75rem;font-weight:700;letter-spacing:.2em;line-height:1.5;text-transform:uppercase;color:var(--primary-bg,#912e5a)}
.hero-shell{background:linear-gradient(180deg,#fbf8f4 0%,#f8eef3 55%,#f3f6fb 100%)}
.hero-wave{width:7.25rem;height:12px;margin-top:.7rem;background:radial-gradient(circle at 12px 0,transparent 7px,#db6a24 8px,transparent 10px) left center/22px 12px repeat-x}
.wave-rule{height:10px;background:radial-gradient(circle at 10px -4px,transparent 9px,#db6a24 10px,transparent 11px) 0 0/20px 10px repeat-x}
.btn-lift{transition:transform .2s ease,background-color .2s ease}
.btn-lift:hover{transform:translateY(-1px)}
.field{min-height:48px;width:100%;border-radius:12px;border:1px solid rgba(28,39,72,.14);background:#fff;padding:0 14px;color:var(--hero-bg,#1a2a52)}
.nav-link{position:relative}
.nav-link::after{content:"";position:absolute;left:.75rem;right:.75rem;bottom:.45rem;height:2px;border-radius:2px;background:#db6a24;transform:scaleX(0);transform-origin:left;transition:transform .25s}
.nav-link:hover::after,.nav-link.is-open::after{transform:scaleX(1)}
`;



const icons: Record<string, LucideIcon> = {
  compass: Compass,
  target: Target,
  lightbulb: Lightbulb,
  award: Award,
  heart: Heart,
};

function About({ data }: { data: any }) {
  return (
    <section id={data.id} className="mx-auto max-w-7xl px-5 pt-20 pb-8 sm:pt-28 sm:pb-10">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="dk-eyebrow"><span className="font-[family-name:var(--font-heading)] normal-case tracking-normal text-[#db6a24]">{data.index}</span> {data.eyebrow}</p>
          <h2 className="font-[family-name:var(--font-heading)] mt-4 text-3xl font-normal leading-[1.08] text-[var(--hero-bg,#1a2a52)] sm:text-5xl">{data.title}</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-[#3d4a66]">
            {data.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <p className="font-[family-name:var(--font-heading)] text-xl text-[var(--hero-bg,#1a2a52)]">{data.closing}</p>
          </div>
        </div>
        <figure className="rounded-[2rem] rounded-bl-[5rem] bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)] p-4 lg:sticky lg:top-36 lg:h-fit">
          <img src={data.image} alt={data.image_alt} className="aspect-square w-full rounded-xl object-cover" />
          <figcaption className="mt-3 flex justify-between px-1 text-sm text-[#3d4a66]">
            <span>{data.image_caption}</span>
            <span className="font-[family-name:var(--font-heading)] text-[#a34e22]">{data.image_year}</span>
          </figcaption>
        </figure>
      </div>
      <ul className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
        {data.pillars.map((pillar) => {
          const Icon = icons[pillar.icon] ?? Compass;
          return (
            <li key={pillar.title} className="border-t border-[var(--hero-bg,#1a2a52)]/12 py-8">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_10%,transparent)] text-[var(--primary-bg,#912e5a)]">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <h3 className="font-[family-name:var(--font-heading)] mt-5 text-2xl font-normal leading-snug text-[var(--hero-bg,#1a2a52)]">{pillar.title}</h3>
              <p className="mt-3 leading-relaxed text-[#3d4a66]">{pillar.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}


export function DolphinkidsAbout1({ data: incoming }: { data?: any }) {
  const data = mapThemeUploadAssetsInData(incoming || {});
  
  
  return (<><style dangerouslySetInnerHTML={{ __html: dolphinCss }} /><About data={data} /></>);
}
(DolphinkidsAbout1 as any).editorFields = ["eyebrow","title","paragraphs","closing","image","image_alt","image_caption","image_year","pillars"];
export default DolphinkidsAbout1;
