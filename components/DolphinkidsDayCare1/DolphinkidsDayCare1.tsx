'use client';

import { mapThemeUploadAssetsInData } from '../../../lib/dolphinkidsAssets';
import { ArrowUpRight, Check, MessageCircle } from 'lucide-react';


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



function dayCarePageHref(url?: string) {
  const raw = String(url || '').trim();
  if (/^#page-day-care[a-z]/i.test(raw)) return '#page-day-care';
  return raw;
}

function DayCare({ data }: { data: any }) {
  return (
    <section id={data.id} className="bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5">
        <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--primary-bg,#912e5a)]">
          <span className="font-[family-name:var(--font-heading)] font-normal normal-case tracking-normal text-[#db6a24]">{data.index}</span>
          <span className="mx-3 font-normal text-[#db6a24]">—</span>
          {data.eyebrow}
        </p>
        <h2 className="font-[family-name:var(--font-heading)] mt-4 max-w-3xl text-4xl font-normal leading-[1.05] sm:text-5xl">{data.title}</h2>
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <article className="flex flex-col rounded-3xl bg-white p-8 sm:p-10">
            <span className="w-fit rounded-full bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_10%,transparent)] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[var(--primary-bg,#912e5a)]">{data.main_badge}</span>
            <h3 className="font-[family-name:var(--font-heading)] mt-6 text-3xl text-[var(--hero-bg,#1a2a52)] sm:text-4xl">{data.main_title}</h3>
            <p className="mt-3 text-lg text-[#3d4a66]">{data.main_text}</p>
            <ul className="mt-8 grid flex-1 gap-3 sm:grid-cols-2">
              {data.points.map((point) => (
                <li key={point} className="flex gap-2.5">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--primary-bg,#912e5a)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={data.primary_href} className="btn-lift inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--hero-bg,#1a2a52)] px-6 text-sm font-semibold text-[var(--secondary-bg,#fbf7f3)] hover:bg-[var(--primary-bg,#912e5a)]">
                {data.primary_label} <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href={data.whatsapp_href} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--hero-bg,#1a2a52)]/25 px-6 text-sm font-semibold text-[var(--hero-bg,#1a2a52)] transition-colors hover:border-[var(--primary-bg,#912e5a)] hover:text-[var(--primary-bg,#912e5a)]">
                <MessageCircle className="h-4 w-4" /> {data.whatsapp_label}
              </a>
            </div>
          </article>
          <article className="flex flex-col rounded-3xl bg-[#eef2f8] p-8 sm:p-10">
            <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#db6a24]">{data.extended_badge}</span>
            <h3 className="font-[family-name:var(--font-heading)] mt-6 text-3xl text-[var(--hero-bg,#1a2a52)] sm:text-4xl">{data.extended_title}</h3>
            <p className="mt-3 flex-1 text-lg text-[#3d4a66]">{data.extended_text}</p>
            <a href={dayCarePageHref(data.extended_href)} className="btn-lift mt-9 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-[var(--secondary-bg,#fbf7f3)] px-6 text-sm font-semibold text-[var(--hero-bg,#1a2a52)] hover:bg-white">
              {data.extended_label} <ArrowUpRight className="h-4 w-4" />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}


export function DolphinkidsDayCare1({ data: incoming }: { data?: any }) {
  const data = mapThemeUploadAssetsInData(incoming || {});
  
  
  return (<><style dangerouslySetInnerHTML={{ __html: dolphinCss }} /><DayCare data={data} /></>);
}
(DolphinkidsDayCare1 as any).editorFields = ["eyebrow","title","main_badge","main_title","main_text","points","extended_badge","extended_title","extended_text","primary_label","whatsapp_label","extended_label"];
export default DolphinkidsDayCare1;
