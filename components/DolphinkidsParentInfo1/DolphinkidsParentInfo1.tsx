'use client';

import { mapThemeUploadAssetsInData } from '../../../lib/dolphinkidsAssets';
import { Bus, Clock, MessageCircle, Phone, Wallet } from 'lucide-react';


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



const icons = { fees: Wallet, timings: Clock, transport: Bus };

function ParentInfo({ data }: { data: any }) {
  return (
    <section id={data.id} className="bg-[#fbf8f4] py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--primary-bg,#912e5a)]">{data.eyebrow}</p>
        <h2 className="font-[family-name:var(--font-heading)] mt-4 max-w-xl text-3xl font-normal leading-[1.08] text-[var(--hero-bg,#1a2a52)] sm:text-5xl">{data.title}</h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#3d4a66]">{data.lead}</p>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {data.items.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons] ?? Wallet;
            return (
              <li key={item.title} className=" flex flex-col rounded-3xl border border-[color-mix(in_srgb,var(--primary-bg,#912e5a)_15%,transparent)] bg-white p-6 transition-transform duration-300 hover:-translate-y-0.5 sm:p-7">
                <Icon className="h-5 w-5 text-[#db6a24]" strokeWidth={1.75} />
                <h3 className="font-[family-name:var(--font-heading)] mt-4 text-2xl font-normal text-[var(--hero-bg,#1a2a52)]">{item.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#3d4a66]">{item.text}</p>
                <a
                  href={data.action_href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--hero-bg,#1a2a52)]/25 px-4 text-sm font-semibold text-[var(--hero-bg,#1a2a52)] transition-colors hover:border-[var(--primary-bg,#912e5a)] hover:text-[var(--primary-bg,#912e5a)]"
                >
                  <MessageCircle className="h-4 w-4" /> {data.action_label}
                </a>
              </li>
            );
          })}
        </ul>
        <a href={data.phone_href} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--primary-bg,#912e5a)]/40 px-5 text-sm font-semibold text-[var(--primary-bg,#912e5a)] transition-colors hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)]">
          <Phone className="h-4 w-4" /> {data.call_label} {data.phone}
        </a>
      </div>
    </section>
  );
}


export function DolphinkidsParentInfo1({ data: incoming }: { data?: any }) {
  const data = mapThemeUploadAssetsInData(incoming || {});
  
  
  return (<><style dangerouslySetInnerHTML={{ __html: dolphinCss }} /><ParentInfo data={data} /></>);
}
(DolphinkidsParentInfo1 as any).editorFields = ["eyebrow","title","lead","phone","call_label","action_label","items"];
export default DolphinkidsParentInfo1;
