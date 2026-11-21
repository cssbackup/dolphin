'use client';

import { mapThemeUploadAssetsInData } from '../../../lib/dolphinkidsAssets';
import { ArrowUpRight } from 'lucide-react';


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



function Journal({ data }: { data: any }) {
  return (
    <section id={data.id} className="bg-[#fbf9f6] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5">
        <p className=" text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--primary-bg,#912e5a)]">
          <span className="font-[family-name:var(--font-heading)] font-normal normal-case tracking-normal text-[#db6a24]">{data.index}</span>
          <span className="mx-3 font-normal text-[#db6a24]">—</span>
          {data.eyebrow}
        </p>
        <h2 className=" font-[family-name:var(--font-heading)] mt-4 max-w-3xl text-4xl font-normal leading-[1.05] sm:text-5xl">{data.title}</h2>
        <p className=" mt-6 max-w-xl text-lg leading-relaxed text-[#3d4a66]">{data.lead}</p>
        <a href={data.button_href} className="btn-lift mt-10 inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--hero-bg,#1a2a52)] px-6 text-sm font-semibold text-[var(--secondary-bg,#fbf7f3)] hover:bg-[var(--primary-bg,#912e5a)]">
          {data.button} <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}


export function DolphinkidsJournal1({ data: incoming }: { data?: any }) {
  const data = mapThemeUploadAssetsInData(incoming || {});
  
  
  return (<><style dangerouslySetInnerHTML={{ __html: dolphinCss }} /><Journal data={data} /></>);
}
(DolphinkidsJournal1 as any).editorFields = ["eyebrow","title","lead","button"];
export default DolphinkidsJournal1;
