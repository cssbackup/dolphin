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




function Story({ item, notice }: { item: any; notice: string }) {
  const [started, setStarted] = useState(false);
  return (
    <>
      <div className="relative overflow-hidden rounded-2xl bg-[var(--hero-bg,#1a2a52)]">
        {started ? (
          <video src={item.video} poster={item.image} controls autoPlay playsInline className="aspect-[4/3] w-full bg-[var(--hero-bg,#1a2a52)] object-contain" aria-label={item.title} />
        ) : (
          <button type="button" onClick={() => setStarted(true)} className="group relative block w-full" aria-label={"Play video: " + (item.title)}>
            <img src={item.image} alt="" className="aspect-[4/3] w-full object-cover" />
            <span className="absolute inset-0 bg-[var(--hero-bg,#1a2a52)]/25" />
            <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[var(--hero-bg,#1a2a52)] shadow-lg transition-transform group-hover:scale-105">
              <Play className="ml-1 h-7 w-7" fill="currentColor" />
            </span>
            <span className="absolute inset-x-0 bottom-0 bg-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_45%,transparent)] px-4 py-3 text-left font-[family-name:var(--font-heading)] text-xl text-white">{item.title}</span>
          </button>
        )}
      </div>
      <p className="mt-2 px-2 text-xs leading-relaxed text-[#3d4a66]/80">{notice}</p>
    </>
  );
}

function Parents({ data }: { data: any }) {
  return (
    <section id={data.id} className="bg-[#fbf8f4] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5">
        <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--primary-bg,#912e5a)]">
          <span className="font-[family-name:var(--font-heading)] font-normal normal-case tracking-normal text-[#db6a24]">{data.index}</span>
          <span className="mx-3 font-normal text-[#db6a24]">—</span>
          {data.eyebrow}
        </p>
        <h2 className="font-[family-name:var(--font-heading)] mt-4 text-4xl font-normal leading-[1.05] sm:text-5xl">{data.title}</h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#3d4a66]">{data.lead}</p>
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {data.items.map((item, index) => (
            <figure key={item.title} className={" rounded-[1.75rem] bg-[var(--secondary-bg,#fbf7f3)] p-3 shadow-sm " + (index === 1 ? 'md:mt-16' : '')}>
              <Story item={item} notice={data.notice} />
              <figcaption className="mt-4 px-2 pb-2 text-[#3d4a66]">
                <span className="font-[family-name:var(--font-heading)] text-xl text-[var(--hero-bg,#1a2a52)]">{data.label}</span> · {item.text}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className=" mt-12 max-w-2xl text-sm text-[#3d4a66]/80">{data.footnote}</p>
      </div>
    </section>
  );
}


export function DolphinkidsParents1({ data: incoming }: { data?: any }) {
  const data = mapThemeUploadAssetsInData(incoming || {});
  
  
  return (<><style dangerouslySetInnerHTML={{ __html: dolphinCss }} /><Parents data={data} /></>);
}
(DolphinkidsParents1 as any).editorFields = ["eyebrow","title","lead","notice","label","footnote","items"];
export default DolphinkidsParents1;
