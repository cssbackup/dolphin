'use client';

import { mapThemeUploadAssetsInData } from '../../../lib/dolphinkidsAssets';
import { Drama, Footprints, Guitar, Mic2, Music, Palette, PenTool, Trophy } from 'lucide-react';


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



const icons = {
  dance: Footprints,
  acting: Drama,
  theatre: Mic2,
  music: Music,
  instruments: Guitar,
  sports: Trophy,
  calligraphy: PenTool,
  arts: Palette,
};

function Activities({ data }: { data: any }) {
  return (
    <section id={data.id} className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-12 sm:py-16 lg:grid-cols-2">
      <div>
        <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--primary-bg,#912e5a)]">
          <span className="font-[family-name:var(--font-heading)] font-normal normal-case tracking-normal text-[#db6a24]">{data.index}</span>
          <span className="mx-3 font-normal text-[#db6a24]">—</span>
          {data.eyebrow}
        </p>
        <h2 className="font-[family-name:var(--font-heading)] mt-4 text-4xl font-normal leading-[1.05] sm:text-5xl">{data.title}</h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#3d4a66]">{data.lead}</p>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {data.items.map((item, index) => {
            const Icon = icons[item.icon as keyof typeof icons] ?? Music;
            return (
              <li
                key={item.name}
                className=" flex flex-col items-center gap-2 rounded-2xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-white px-3 py-5 text-center transition-transform duration-300 hover:-translate-y-1 hover:border-[var(--primary-bg,#912e5a)]"
                style={{ transitionDelay: (index * 50) + "ms" }}
              >
                <Icon className="h-6 w-6 text-[var(--primary-bg,#912e5a)]" strokeWidth={1.5} />
                <span className="text-sm font-semibold text-[var(--hero-bg,#1a2a52)]">{item.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <figure className=" relative pb-8">
        <img src={data.image} alt={data.image_alt} className="aspect-[5/6] w-full rounded-[2rem] object-cover" />
        <div className="absolute -bottom-2 -left-1 max-w-[240px] rounded-2xl bg-[#eef2f8] p-5 sm:-left-6">
          <p className="font-[family-name:var(--font-heading)] text-lg leading-snug text-[var(--hero-bg,#1a2a52)]">{data.caption}</p>
        </div>
      </figure>
    </section>
  );
}


export function DolphinkidsActivities1({ data: incoming }: { data?: any }) {
  const data = mapThemeUploadAssetsInData(incoming || {});
  
  
  return (<><style dangerouslySetInnerHTML={{ __html: dolphinCss }} /><Activities data={data} /></>);
}
(DolphinkidsActivities1 as any).editorFields = ["eyebrow","title","lead","image","image_alt","caption","items"];
export default DolphinkidsActivities1;
