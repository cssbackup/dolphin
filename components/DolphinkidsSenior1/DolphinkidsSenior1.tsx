'use client';

import { mapThemeUploadAssetsInData } from '../../../lib/dolphinkidsAssets';
import { BookOpen, Compass, GraduationCap, MessageCircle, School, Users } from 'lucide-react';


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
  school: School,
  compass: Compass,
  book: BookOpen,
  grad: GraduationCap,
  users: Users,
};

function Senior({ data }: { data: any }) {
  return (
    <section id={data.id} className="bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--primary-bg,#912e5a)]">
              <span className="font-[family-name:var(--font-heading)] font-normal normal-case tracking-normal text-[#db6a24]">{data.index}</span>
              <span className="mx-3 font-normal text-[#db6a24]">—</span>
              {data.eyebrow}
            </p>
            <h2 className="font-[family-name:var(--font-heading)] mt-4 text-4xl font-normal leading-[1.05] sm:text-5xl">{data.title}</h2>
            <p className=" font-[family-name:var(--font-heading)] mt-5 text-xl text-[var(--primary-bg,#912e5a)] sm:text-2xl">{data.highlight}</p>
            <div className=" mt-6 space-y-4 text-lg leading-relaxed text-[#3d4a66]">
              {data.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className=" mt-8">
              <p className="text-sm font-semibold text-[var(--hero-bg,#1a2a52)]">{data.boards_label}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {data.boards.map((board) => (
                  <li key={board} className="rounded-full border border-[var(--primary-bg,#912e5a)]/25 bg-[var(--secondary-bg,#fbf7f3)] px-4 py-1.5 text-sm font-semibold text-[var(--hero-bg,#1a2a52)]">{board}</li>
                ))}
              </ul>
            </div>
          </div>
          <ul className="grid content-start gap-3">
            {data.points.map((point, index) => {
              const Icon = icons[point.icon as keyof typeof icons] ?? School;
              return (
                <li key={point.text} className=" flex items-start gap-4 rounded-2xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-[var(--secondary-bg,#fbf7f3)] p-5 transition-colors hover:border-[color-mix(in_srgb,var(--primary-bg,#912e5a)_40%,transparent)]" style={{ transitionDelay: (index * 70) + "ms" }}>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_10%,transparent)] text-[var(--primary-bg,#912e5a)]">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span className="pt-2 leading-relaxed text-[var(--hero-bg,#1a2a52)]">{point.text}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className=" mt-14 rounded-2xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-[var(--secondary-bg,#fbf7f3)] p-6 sm:p-10">
          <p className="text-lg leading-relaxed text-[#3d4a66]">{data.note}</p>
          <div className="mt-8 flex flex-col gap-4 border-t border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#3d4a66]">{data.disclaimer}</p>
            <a href={data.button_href} target="_blank" rel="noreferrer" className="btn-lift inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--primary-bg,#912e5a)] px-5 text-sm font-semibold text-white hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_82%,black)]">
              <MessageCircle className="h-4 w-4" /> {data.button}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


export function DolphinkidsSenior1({ data: incoming }: { data?: any }) {
  const data = mapThemeUploadAssetsInData(incoming || {});
  
  
  return (<><style dangerouslySetInnerHTML={{ __html: dolphinCss }} /><Senior data={data} /></>);
}
(DolphinkidsSenior1 as any).editorFields = ["eyebrow","title","highlight","paragraphs","boards_label","boards","points","note","disclaimer","button"];
export default DolphinkidsSenior1;
