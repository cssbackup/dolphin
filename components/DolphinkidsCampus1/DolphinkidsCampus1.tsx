'use client';

import { mapThemeUploadAssetsInData } from '../../../lib/dolphinkidsAssets';


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


function Campus({ data }: { data: any }) {
  return (
    <section id={data.id} className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
      <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--primary-bg,#912e5a)]">
        <span className="font-[family-name:var(--font-heading)] font-normal normal-case tracking-normal text-[#db6a24]">{data.index}</span>
        <span className="mx-3 font-normal text-[#db6a24]">—</span>
        {data.eyebrow}
      </p>
      <h2 className="font-[family-name:var(--font-heading)] mt-4 max-w-3xl text-4xl font-normal leading-[1.05] sm:text-5xl">{data.title}</h2>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#3d4a66]">{data.lead}</p>
      <dl className="mt-10 grid gap-4 sm:grid-cols-2">
        {data.stats.map((stat, index) => (
          <div key={stat.label} className={"rounded-2xl border p-6 sm:p-8 " + (index === 0 ? 'border-[color-mix(in_srgb,var(--primary-bg,#912e5a)_10%,transparent)] bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_5%,transparent)]' : 'border-[color-mix(in_srgb,#db6a24_20%,transparent)] bg-[color-mix(in_srgb,#db6a24_10%,transparent)]')}>
            <dt className="text-base font-semibold text-[var(--hero-bg,#1a2a52)]">{stat.label}</dt>
            <dd className="font-[family-name:var(--font-heading)] mt-3 text-4xl text-[var(--primary-bg,#912e5a)] sm:text-5xl">
              {stat.value} <span className="text-xl sm:text-2xl">{stat.unit}</span>
            </dd>
            <p className="mt-3 text-[#3d4a66]">{stat.text}</p>
          </div>
        ))}
      </dl>
      <figure className=" relative mt-14 overflow-hidden rounded-2xl">
        <img src={data.hero.src} alt={data.hero.alt} className="h-[280px] w-full object-cover sm:h-[360px]" />
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-6 text-white">
          <span className="font-[family-name:var(--font-heading)] text-2xl">{data.hero.caption}</span>
        </figcaption>
      </figure>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {data.gallery.map((shot) => (
          <figure key={shot.title} className="group flex flex-col rounded-2xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-white p-3">
            <div className="overflow-hidden rounded-xl">
              <img src={shot.src} alt={shot.alt} className="aspect-square w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
            </div>
            <figcaption className="px-2 pb-2 pt-4">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--primary-bg,#912e5a)]">{shot.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#3d4a66]">{shot.text}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <dl className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.zones.map((zone) => (
          <div key={zone.title} className="border-l-2 border-gilt pl-5">
            <dt className="font-[family-name:var(--font-heading)] text-xl text-[var(--hero-bg,#1a2a52)]">{zone.title}</dt>
            <dd className="mt-2 text-[#3d4a66]">{zone.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}


export function DolphinkidsCampus1({ data: incoming }: { data?: any }) {
  const data = mapThemeUploadAssetsInData(incoming || {});
  
  
  return (<><style dangerouslySetInnerHTML={{ __html: dolphinCss }} /><Campus data={data} /></>);
}
(DolphinkidsCampus1 as any).editorFields = ["eyebrow","title","lead","stats","hero","gallery","zones"];
export default DolphinkidsCampus1;
