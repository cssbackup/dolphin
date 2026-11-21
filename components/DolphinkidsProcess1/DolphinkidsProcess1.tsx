'use client';

import { mapThemeUploadAssetsInData } from '../../../lib/dolphinkidsAssets';
import { useState } from 'react';
import { Check, ChevronDown, FileDown, MessageCircle, Phone } from 'lucide-react';


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




function Process({ data }: { data: any }) {
  const [open, setOpen] = useState(0);

  return (
    <section id={data.id} className="bg-[var(--secondary-bg,#fbf7f3)] py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="text-sm font-semibold tracking-wide text-[#a34e22]">
          {data.index} <span className="mx-2 text-[#db6a24]">—</span>
          <span className="rounded bg-[#db6a24] px-2 py-0.5 text-[11px] font-bold tracking-[0.14em] text-white">{data.eyebrow.toUpperCase()}</span>
          <span className="ml-2 text-[var(--primary-bg,#912e5a)]">· {data.scope.toUpperCase()}</span>
        </p>
        <h2 className="font-[family-name:var(--font-heading)] mt-4 max-w-4xl text-4xl font-normal leading-[1.08] text-[var(--hero-bg,#1a2a52)] sm:text-5xl">{data.title}</h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#3d4a66]">{data.lead}</p>
        <p className="mt-5 rounded-xl border border-[color-mix(in_srgb,var(--primary-bg,#912e5a)_15%,transparent)] bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)] p-4 text-sm text-[var(--hero-bg,#1a2a52)]">
          <strong>{data.notice_lead}</strong> {data.notice}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {data.actions.map((action) => (
            <a
              key={action.name}
              href={action.href}
              className={
                action.style === 'solid'
                  ? 'inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--primary-bg,#912e5a)] px-6 text-sm font-semibold text-[var(--secondary-bg,#fbf7f3)]'
                  : action.style === 'outline'
                    ? 'inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--hero-bg,#1a2a52)]/25 px-6 text-sm font-semibold text-[var(--hero-bg,#1a2a52)] hover:border-[var(--primary-bg,#912e5a)] hover:text-[var(--primary-bg,#912e5a)]'
                    : 'inline-flex min-h-12 items-center gap-2 px-2 text-sm font-semibold text-[var(--primary-bg,#912e5a)]'
              }
            >
              {action.style === 'solid' && <MessageCircle className="h-4 w-4" />}
              {action.style === 'outline' && <Phone className="h-4 w-4" />}
              {action.style === 'link' && <FileDown className="h-4 w-4" />}
              {action.name}
            </a>
          ))}
        </div>
        <p className="mt-3 text-sm text-[#3d4a66]">{data.action_note}</p>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-2xl text-[var(--hero-bg,#1a2a52)]">{data.steps_title}</h3>
            <ol className="relative mt-6 space-y-3 before:absolute before:bottom-4 before:left-[21px] before:top-4 before:w-px before:bg-[#db6a24]/40">
              {data.steps.map((step, index) => {
                const isOpen = open === index;
                return (
                  <li key={step.title} className="relative">
                    <button type="button" onClick={() => setOpen(isOpen ? -1 : index)} aria-expanded={isOpen} className="flex w-full items-center gap-4 rounded-xl py-2 pr-2 text-left">
                      <span className={"relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border font-[family-name:var(--font-heading)] text-lg " + (isOpen ? 'border-[var(--primary-bg,#912e5a)] bg-[var(--primary-bg,#912e5a)] text-[var(--secondary-bg,#fbf7f3)]' : 'border-[color-mix(in_srgb,#db6a24_50%,transparent)] bg-[var(--secondary-bg,#fbf7f3)] text-[#a34e22]')}>{index + 1}</span>
                      <span className="flex-1 font-semibold text-[var(--hero-bg,#1a2a52)]">{step.title}</span>
                      <ChevronDown className={"h-5 w-5 text-[#3d4a66] transition-transform " + (isOpen ? 'rotate-180' : '')} />
                    </button>
                    {isOpen && (
                      <div className="ml-[60px] rounded-2xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-white/70 p-5">
                        <p className="leading-relaxed text-[#3d4a66]">{step.intro}</p>
                        <ul className="mt-3 space-y-2">
                          {step.points.map((point) => (
                            <li key={point} className="flex gap-2.5 text-sm text-[var(--hero-bg,#1a2a52)]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary-bg,#912e5a)]" />{point}</li>
                          ))}
                        </ul>
                        {step.note && <p className="mt-4 border-l-2 border-gilt pl-3 text-sm italic text-[#3d4a66]">{step.note}</p>}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="space-y-8">
            <div className="rounded-2xl bg-[#f8efe4] p-6 sm:p-8">
              <p className="dk-eyebrow">{data.checklist_kicker}</p>
              <h3 className="font-[family-name:var(--font-heading)] mt-2 text-2xl">{data.checklist_title}</h3>
              <ul className="mt-5 divide-y divide-ink/10">
                {data.documents.map((document) => (
                  <li key={document.name} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between">
                    <span className="font-medium text-[var(--hero-bg,#1a2a52)]">{document.name}</span>
                    <span className="text-sm text-[#a34e22] sm:text-right">{document.detail}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-[#3d4a66]">{data.checklist_note}</p>
            </div>
            <div className="rounded-2xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-white/70 p-6 sm:p-8">
              <p className="dk-eyebrow">{data.age_kicker}</p>
              <h3 className="font-[family-name:var(--font-heading)] mt-2 text-2xl">{data.age_title}</h3>
              <p className="mt-2 text-sm text-[#3d4a66]">{data.age_text}</p>
              <dl className="mt-4 grid gap-2 sm:grid-cols-2">
                {data.ages.map((item) => (
                  <div key={item.name} className="rounded-xl bg-[var(--secondary-bg,#fbf7f3)] px-4 py-3">
                    <dt className="text-sm text-[#3d4a66]">{item.name}</dt>
                    <dd className="font-[family-name:var(--font-heading)] text-lg text-[var(--hero-bg,#1a2a52)]">{item.age}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs leading-relaxed text-[#3d4a66]">{data.age_note}</p>
            </div>
          </div>
        </div>

        <div className="mt-14 rounded-2xl bg-[#eef2f8] p-6 sm:p-10">
          <p className="dk-eyebrow">{data.guidelines_kicker}</p>
          <h3 className="font-[family-name:var(--font-heading)] mt-2 text-2xl">{data.guidelines_title}</h3>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {data.guidelines.map((item) => (
              <li key={item} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#db6a24]" />{item}</li>
            ))}
          </ul>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] pt-10 sm:flex-row sm:items-center">
          <div>
            <p className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl">{data.closing_title}</p>
            <p className="mt-1 text-sm text-[#3d4a66]">{data.closing_text}</p>
          </div>
          <a href={data.closing_href} className="inline-flex min-h-12 items-center rounded-full border border-[var(--hero-bg,#1a2a52)]/25 px-6 text-sm font-semibold hover:border-[var(--primary-bg,#912e5a)] hover:text-[var(--primary-bg,#912e5a)]">{data.closing_button}</a>
        </div>
      </div>
    </section>
  );
}


export function DolphinkidsProcess1({ data: incoming }: { data?: any }) {
  const data = mapThemeUploadAssetsInData(incoming || {});
  
  
  return (<><style dangerouslySetInnerHTML={{ __html: dolphinCss }} /><Process data={data} /></>);
}
(DolphinkidsProcess1 as any).editorFields = ["eyebrow","scope","title","lead","notice_lead","notice","actions","action_note","steps_title","steps","checklist_kicker","checklist_title","checklist_note","documents","age_kicker","age_title","age_text","ages","age_note","guidelines_kicker","guidelines_title","guidelines","closing_title","closing_text","closing_button"];
export default DolphinkidsProcess1;
