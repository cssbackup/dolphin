'use client';

import { mapThemeUploadAssetsInData } from '../../../lib/dolphinkidsAssets';
import { BedDouble, Building2, Cctv, Check, CookingPot, GraduationCap, Heart, MessageCircle, Shield, Smile, Stethoscope } from 'lucide-react';


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
  teacher: GraduationCap,
  speech: MessageCircle,
  psed: Smile,
  care: Heart,
  campus: Building2,
  safety: Shield,
};

const facilityIcons = {
  cctv: Cctv,
  infirmary: Stethoscope,
  kitchen: CookingPot,
  rest: BedDouble,
};

function Why({ data }: { data: any }) {
  return (
    <section id={data.id} className="bg-[#fbf8f4] py-10 sm:py-14">
      <div className="mx-auto grid max-w-7xl items-start gap-14 px-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#db6a24]">
            <span className="font-[family-name:var(--font-heading)] font-normal normal-case tracking-normal">{data.index}</span>
            <span className="mx-3 font-normal">—</span>
            {data.eyebrow}
          </p>
          <h2 className="font-[family-name:var(--font-heading)] mt-4 text-4xl font-normal leading-[1.05] text-[var(--hero-bg,#1a2a52)] sm:text-5xl">{data.title}</h2>
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-[#3d4a66]">{data.lead}</p>
          <figure className=" mt-10 overflow-hidden rounded-[2rem] rounded-tr-[5rem] bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)] p-3">
            <img src={data.image} alt={data.image_alt} className="mx-auto aspect-square w-full max-w-[320px] rounded-[1.5rem] object-cover" />
          </figure>
        </div>
        <ul className="grid gap-x-10 sm:grid-cols-2">
          {data.items.map((item, index) => {
            const Icon = icons[item.icon as keyof typeof icons] ?? GraduationCap;
            return (
              <li id={"why-" + String(item.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")} key={item.title} className="why-card  border-t-2 border-[color-mix(in_srgb,#db6a24_30%,transparent)] py-8" style={{ transitionDelay: ((index % 2) * 90) + "ms" }}>
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)] text-[var(--primary-bg,#912e5a)]">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <span className="text-xs font-semibold text-[#db6a24]">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-[family-name:var(--font-heading)] mt-4 text-[1.35rem] font-normal leading-snug text-[var(--hero-bg,#1a2a52)]">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#3d4a66]">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div id={data.safety.id} className=" mx-auto mt-20 max-w-7xl px-5">
        <div className="overflow-hidden rounded-[2rem] border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-[#f8efe4] p-6 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="dk-eyebrow">{data.safety.eyebrow}</p>
              <h3 className="font-[family-name:var(--font-heading)] mt-3 text-3xl leading-tight text-[var(--hero-bg,#1a2a52)] sm:text-4xl">
                {data.safety.title} <span className="italic text-[var(--primary-bg,#912e5a)]">{data.safety.title_highlight}</span>
              </h3>
              <p className="mt-4 max-w-xl leading-relaxed text-[#3d4a66]">{data.safety.lead}</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {data.safety.facilities.map((item) => {
                  const Icon = facilityIcons[item.icon as keyof typeof facilityIcons] ?? Shield;
                  return (
                    <li key={item.title} className="rounded-2xl bg-[var(--secondary-bg,#fbf7f3)] p-5">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)] text-[var(--primary-bg,#912e5a)]">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <p className="mt-4 font-semibold text-[var(--hero-bg,#1a2a52)]">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#3d4a66]">{item.text}</p>
                    </li>
                  );
                })}
              </ul>
              <dl className="mt-8 grid grid-cols-3 gap-3 border-t border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] pt-6">
                {data.safety.areas.map((area) => (
                  <div key={area.label}>
                    <dt className="sr-only">{area.label}</dt>
                    <dd>
                      <span className="font-[family-name:var(--font-heading)] block text-2xl text-[var(--hero-bg,#1a2a52)] sm:text-3xl">{area.value}</span>
                      <span className="text-xs text-[#3d4a66] sm:text-sm">{area.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="flex flex-col gap-5">
              <img src={data.safety.image} alt={data.safety.image_alt} className="mx-auto aspect-square w-full max-w-[320px] rounded-[1.5rem] object-cover" />
              <div className="rounded-2xl bg-[var(--secondary-bg,#fbf7f3)] p-6">
                <p className="font-[family-name:var(--font-heading)] text-xl text-[var(--hero-bg,#1a2a52)]">{data.safety.ask_title}</p>
                <ul className="mt-4 space-y-3">
                  {data.safety.ask.map((question) => (
                    <li key={question} className="flex gap-3 text-sm leading-relaxed text-[#3d4a66]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                      {question}
                    </li>
                  ))}
                </ul>
                <a href={data.safety.button_href} className="btn-lift mt-5 inline-flex min-h-11 items-center rounded-full bg-[var(--hero-bg,#1a2a52)] px-5 text-sm font-bold text-[var(--secondary-bg,#fbf7f3)] hover:bg-[var(--primary-bg,#912e5a)]">
                  {data.safety.button}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export function DolphinkidsWhy1({ data: incoming }: { data?: any }) {
  const data = mapThemeUploadAssetsInData(incoming || {});
  
  
  return (<><style dangerouslySetInnerHTML={{ __html: dolphinCss }} /><Why data={data} /></>);
}
(DolphinkidsWhy1 as any).editorFields = ["eyebrow","title","lead","image","image_alt","items","safety"];
export default DolphinkidsWhy1;
