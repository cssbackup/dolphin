'use client';

import { mapThemeUploadAssetsInData } from '../../../lib/dolphinkidsAssets';
import { useState } from 'react';
import { Play } from 'lucide-react';


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




function Tour({ data }: { data: any }) {
  const [started, setStarted] = useState(false);

  return (
    <section id={data.id} className="bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--primary-bg,#912e5a)]">
              <span className="font-[family-name:var(--font-heading)] font-normal normal-case tracking-normal text-[#db6a24]">{data.index}</span>
              <span className="mx-3 font-normal text-[#db6a24]">—</span>
              {data.eyebrow}
            </p>
            <h2 className="font-[family-name:var(--font-heading)] mt-4 max-w-3xl text-4xl font-normal leading-[1.05] sm:text-5xl">{data.title}</h2>
            <p className="mt-4 max-w-2xl text-lg text-[#3d4a66]">{data.lead}</p>
          </div>
          <a href={data.button_href} className="btn-lift inline-flex min-h-12 shrink-0 items-center rounded-full bg-[var(--hero-bg,#1a2a52)] px-6 text-sm font-semibold text-[var(--secondary-bg,#fbf7f3)] hover:bg-[var(--primary-bg,#912e5a)]">
            {data.button_text}
          </a>
        </div>
        <figure className="mt-12">
          <div className="relative overflow-hidden rounded-2xl bg-[var(--hero-bg,#1a2a52)]">
            {started ? (
              <video src={data.video} poster={data.poster} controls autoPlay playsInline className="aspect-video w-full bg-[var(--hero-bg,#1a2a52)] object-contain" aria-label={data.video_title} />
            ) : (
              <button type="button" onClick={() => setStarted(true)} className="group relative block w-full" aria-label={data.play_label}>
                <img src={data.poster} alt="" className="aspect-video w-full object-cover" />
                <span className="absolute inset-0 bg-[var(--hero-bg,#1a2a52)]/35" />
                <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--secondary-bg,#fbf7f3)] text-[var(--hero-bg,#1a2a52)] transition-transform group-hover:scale-105">
                  <Play className="ml-1 h-8 w-8" fill="currentColor" />
                </span>
                <span className="absolute bottom-5 left-5 font-[family-name:var(--font-heading)] text-xl text-white">{data.video_title}</span>
              </button>
            )}
          </div>
          <figcaption className="mt-2 text-xs leading-relaxed text-[#3d4a66]">{data.notice}</figcaption>
        </figure>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#3d4a66]">
          <span>{data.links_label}</span>
          {data.links.map((link) => (
            <a key={link.name} href={link.href} className="min-h-11 content-center font-semibold text-[var(--hero-bg,#1a2a52)] underline-offset-4 hover:underline">
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}


export function DolphinkidsTour1({ data: incoming }: { data?: any }) {
  const data = mapThemeUploadAssetsInData(incoming || {});
  
  
  return (<><style dangerouslySetInnerHTML={{ __html: dolphinCss }} /><Tour data={data} /></>);
}
(DolphinkidsTour1 as any).editorFields = ["eyebrow","title","lead","poster","video","video_title","notice","play_label","button_text","links_label","links"];
export default DolphinkidsTour1;
