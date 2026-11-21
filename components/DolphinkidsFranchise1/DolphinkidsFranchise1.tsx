'use client';

import { mapThemeUploadAssetsInData } from '../../../lib/dolphinkidsAssets';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Award, Baby, Briefcase, Check, ChevronDown, Download, Home, Landmark, MessageCircle, Minus, Plus, School, X } from 'lucide-react';


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




const icons = { award: Award, case: Briefcase, home: Home, baby: Baby, school: School, landmark: Landmark };

function FormatSelect({ options, placeholder }: { options: string[]; placeholder: string }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (box.current && !box.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div ref={box} className="relative mt-1">
      <input type="text" name="format" value={value} required readOnly className="sr-only" tabIndex={-1} />
      <button type="button" aria-expanded={open} onClick={() => setOpen((current) => !current)} className="flex min-h-12 w-full items-center justify-between rounded-2xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_15%,transparent)] bg-white px-4 text-left text-[15px]">
        <span className={value ? 'font-semibold text-[var(--hero-bg,#1a2a52)]' : 'text-[#3d4a66]'}>{value || placeholder}</span>
        <ChevronDown className={"h-4 w-4 text-[var(--primary-bg,#912e5a)] transition-transform " + (open ? 'rotate-180' : '')} />
      </button>
      {open ? (
        <ul className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-white p-2 shadow-[0_18px_40px_-24px_rgba(40,52,96,0.35)]">
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                onClick={() => {
                  setValue(option);
                  setOpen(false);
                }}
                className={"flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm " + (value === option ? 'bg-[var(--primary-bg,#912e5a)] text-white' : 'text-[var(--hero-bg,#1a2a52)] hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)]')}
              >
                {option}
                {value === option ? <Check className="h-4 w-4" /> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Franchise({ data }: { data: any }) {
  const [open, setOpen] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const model = data.models.find((item) => item.id === selected) ?? null;

  return (
    <section id={data.id} className="bg-[#fbf6f1] py-12 text-[var(--hero-bg,#1a2a52)] sm:py-16">
      <div className="mx-auto max-w-7xl px-5">
        <p className=" inline-flex rounded-full border border-[color-mix(in_srgb,#db6a24_50%,transparent)] px-4 py-1.5 text-xs font-bold tracking-[0.16em] text-[#a34e22]">{data.badge}</p>
        <p className=" mt-8 text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--primary-bg,#912e5a)]">
          <span className="font-[family-name:var(--font-heading)] font-normal normal-case tracking-normal text-[#db6a24]">{data.index}</span>
          <span className="mx-3 font-normal text-[#db6a24]">—</span>
          {data.eyebrow}
        </p>
        <h2 className=" font-[family-name:var(--font-heading)] mt-4 max-w-3xl text-4xl font-normal leading-[1.05] sm:text-5xl">{data.title}</h2>
        <p className=" mt-5 max-w-3xl text-lg leading-relaxed text-[#3d4a66]">{data.lead}</p>
        <p className=" mt-4 max-w-3xl text-sm leading-relaxed text-[#3d4a66]">{data.disclaimer}</p>

        <dl className="mt-10 grid gap-4 sm:grid-cols-3">
          {data.targets.map((item) => (
            <div key={item.label} className=" rounded-2xl border border-[color-mix(in_srgb,var(--primary-bg,#912e5a)_15%,transparent)] bg-[var(--secondary-bg,#fbf7f3)] p-6">
              <dt className="text-sm font-semibold text-[#3d4a66]">{item.label}</dt>
              <dd className="font-[family-name:var(--font-heading)] mt-3 text-4xl text-[var(--primary-bg,#912e5a)]">{item.value}</dd>
              <p className="mt-2 text-sm text-[#3d4a66]">{item.note}</p>
            </div>
          ))}
        </dl>
        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#3d4a66]">{data.targets_note}</p>

        <div id="franchise-terms" className="mt-20">
          <p className="dk-eyebrow">{data.reasons_eyebrow}</p>
          <h3 className="font-[family-name:var(--font-heading)] mt-3 text-3xl sm:text-4xl">{data.reasons_title}</h3>
          <ol className="mt-8 divide-y divide-brand/15 overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--primary-bg,#912e5a)_15%,transparent)] bg-[var(--secondary-bg,#fbf7f3)]">
            {data.reasons.map((reason) => {
              const isOpen = open === reason.n;
              return (
                <li key={reason.n}>
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : reason.n)} className="flex min-h-16 w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)] sm:px-7">
                    <span className="font-[family-name:var(--font-heading)] text-xl text-[#db6a24]">{reason.n}</span>
                    <span className="flex-1 text-base font-semibold sm:text-lg">{reason.title}</span>
                    {isOpen ? <Minus className="h-5 w-5 text-[var(--primary-bg,#912e5a)]" /> : <Plus className="h-5 w-5 text-[var(--primary-bg,#912e5a)]" />}
                  </button>
                  <div className={"grid transition-[grid-template-rows,opacity] duration-300 " + (isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
                    <ul className="space-y-3 overflow-hidden px-5 pb-6 pl-14 sm:px-7">
                      {reason.points.map((point) => (
                        <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-[#3d4a66]"><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-700" />{point}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ol>
          <dl className="mt-6 grid gap-3 sm:grid-cols-3">
            {data.terms.map((term) => (
              <div key={term.label} className="rounded-2xl border border-[color-mix(in_srgb,#db6a24_40%,transparent)] bg-[var(--secondary-bg,#fbf7f3)] p-5">
                <dt className="text-sm font-semibold text-[#3d4a66]">{term.label}</dt>
                <dd className="font-[family-name:var(--font-heading)] mt-2 text-3xl text-[var(--primary-bg,#912e5a)]">{term.value}</dd>
                <p className="mt-1 text-sm text-[#3d4a66]">{term.note}</p>
              </div>
            ))}
          </dl>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#3d4a66]">{data.terms_note}</p>
        </div>

        <div id="franchise-support" className="mt-20">
          <p className="dk-eyebrow">{data.support_eyebrow}</p>
          <h3 className="font-[family-name:var(--font-heading)] mt-3 text-3xl sm:text-4xl">{data.support_title}</h3>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {data.support.map((item, index) => (
              <li key={item} className="flex gap-3 rounded-2xl border border-[color-mix(in_srgb,var(--primary-bg,#912e5a)_15%,transparent)] bg-[var(--secondary-bg,#fbf7f3)] p-5 transition-transform duration-300 hover:-translate-y-0.5">
                <span className="font-[family-name:var(--font-heading)] text-lg text-[#db6a24]">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-[15px] font-medium leading-snug">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-[#3d4a66]">{data.support_note}</p>
        </div>

        <div className="mt-20">
          <p className="dk-eyebrow">{data.models_eyebrow}</p>
          <h3 className="font-[family-name:var(--font-heading)] mt-3 text-3xl sm:text-4xl">{data.models_title}</h3>
          <p className="mt-3 max-w-3xl text-[#3d4a66]">{data.models_lead}</p>
        </div>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_10%,transparent)] sm:grid-cols-2 lg:grid-cols-3">
          {data.models.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons] ?? Award;
            return (
              <li id={"franchise-" + item.id} key={item.id} className="bg-[#fbf6f1]">
                <button type="button" onClick={() => setSelected(item.id)} className="group flex h-full w-full flex-col p-8 text-left transition-colors hover:bg-white">
                  <Icon className="h-8 w-8 text-[#db6a24]" strokeWidth={1.3} />
                  <h3 className="font-[family-name:var(--font-heading)] mt-6 text-2xl">{item.title}</h3>
                  <p className="mt-2 flex-1 text-[#3d4a66]">{item.text}</p>
                  {item.fee ? (
                    <div className="mt-5 border-t border-[color-mix(in_srgb,var(--primary-bg,#912e5a)_15%,transparent)] pt-4">
                      <p className="text-xs font-semibold text-[#3d4a66]">{item.fee_label}</p>
                      <p className="mt-1 text-lg font-bold text-[var(--primary-bg,#912e5a)]">{item.fee}</p>
                      <p className="mt-2 text-sm text-[#3d4a66]">{item.fee_note}</p>
                    </div>
                  ) : null}
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary-bg,#912e5a)]">{data.view_label} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                </button>
              </li>
            );
          })}
        </ul>

        <div id="franchise-projects" className="mt-6 grid gap-3 sm:grid-cols-2">
          {data.projects.map((project) => (
            <div key={project.title} className="rounded-2xl border border-dashed border-[color-mix(in_srgb,var(--primary-bg,#912e5a)_30%,transparent)] bg-[var(--secondary-bg,#fbf7f3)] p-6">
              <p className="text-xs font-bold tracking-[0.16em] text-[#a34e22]">{data.projects_kicker}</p>
              <h4 className="font-[family-name:var(--font-heading)] mt-2 text-2xl">{project.title}</h4>
              <p className="mt-2 text-[#3d4a66]">{project.text}</p>
              <p className="mt-4 text-lg font-bold text-[var(--primary-bg,#912e5a)]">{project.value}</p>
              <p className="mt-1 text-sm text-[#3d4a66]">{project.note}</p>
              <a href={data.discuss_href} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--hero-bg,#1a2a52)]/25 px-5 text-sm font-semibold transition-colors hover:border-[var(--primary-bg,#912e5a)] hover:text-[var(--primary-bg,#912e5a)]">
                <MessageCircle className="h-4 w-4" /> {data.discuss_label}
              </a>
            </div>
          ))}
        </div>

        <details className="mt-12 rounded-2xl border border-[var(--primary-bg,#912e5a)]/20 bg-[var(--secondary-bg,#fbf7f3)] p-6 sm:p-8">
          <summary className="cursor-pointer font-[family-name:var(--font-heading)] text-2xl">{data.budget_title}</summary>
          <p className="mt-3 text-sm text-[#3d4a66]">{data.budget_text}</p>
        </details>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href={data.whatsapp_href} target="_blank" rel="noreferrer" className="btn-lift inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--primary-bg,#912e5a)] px-6 text-sm font-semibold text-white hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_82%,black)]">
            <MessageCircle className="h-4 w-4" /> {data.whatsapp_label}
          </a>
          <a href={data.brochure_href} download className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--primary-bg,#912e5a)]/35 bg-[var(--secondary-bg,#fbf7f3)] px-6 text-sm font-semibold text-[var(--primary-bg,#912e5a)] transition-colors hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)]">
            <Download className="h-4 w-4" /> {data.brochure_label}
          </a>
        </div>

        <form
          className="mt-8 max-w-3xl rounded-3xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-[var(--secondary-bg,#fbf7f3)] p-6 sm:p-8"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary-bg,#912e5a)]">{data.form_kicker}</p>
          <h3 className="font-[family-name:var(--font-heading)] mt-2 text-3xl">{data.form_title}</h3>
          <p className="mt-2 text-[#3d4a66]">{data.form_lead}</p>
          <p className="mt-2 text-sm text-[#3d4a66]">{data.form_note}</p>
          {sent ? (
            <p className="mt-6 rounded-2xl bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)] p-4 text-[var(--primary-bg,#912e5a)]">{data.success_message}</p>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold">{data.name_label} *<input required name="name" className="field mt-1" /></label>
              <label className="text-sm font-semibold">{data.phone_label} *<input required name="phone" className="field mt-1" placeholder={data.phone_placeholder} /></label>
              <label className="text-sm font-semibold sm:col-span-2">{data.email_label} *<input required type="email" name="email" className="field mt-1" /></label>
              <p className="sm:col-span-2 text-sm font-semibold text-[var(--primary-bg,#912e5a)]">{data.school_group}</p>
              <label className="text-sm font-semibold">{data.city_label} *<input required name="city" className="field mt-1" /></label>
              <label className="text-sm font-semibold">{data.state_label} *<input required name="state" className="field mt-1" /></label>
              <label className="text-sm font-semibold sm:col-span-2">{data.format_label} *
                <FormatSelect options={data.models.map((item) => item.title)} placeholder={data.select_placeholder} />
              </label>
              <label className="text-sm font-semibold sm:col-span-2">{data.capacity_label}<input name="capacity" className="field mt-1" placeholder={data.capacity_placeholder} /></label>
              <label className="flex items-start gap-2 text-sm sm:col-span-2"><input required type="checkbox" className="mt-1" /> {data.consent}</label>
              <p className="text-sm text-[#3d4a66] sm:col-span-2">{data.form_footer}</p>
              <button type="submit" className="btn-lift min-h-12 w-fit rounded-full bg-[var(--hero-bg,#1a2a52)] px-6 text-sm font-semibold text-[var(--secondary-bg,#fbf7f3)] hover:bg-[var(--primary-bg,#912e5a)]">{data.submit_text}</button>
            </div>
          )}
        </form>
        <p className="mt-4 max-w-3xl text-sm text-[#3d4a66]">{data.footnote}</p>
      </div>

      {model ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[var(--hero-bg,#1a2a52)]/40 p-5" onClick={() => setSelected(null)}>
          <div className="max-h-[80vh] w-full max-w-lg overflow-auto rounded-3xl bg-[var(--secondary-bg,#fbf7f3)] p-7" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-[family-name:var(--font-heading)] text-3xl">{model.title}</h3>
              <button type="button" onClick={() => setSelected(null)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-[var(--hero-bg,#1a2a52)]/5" aria-label="Close"><X className="h-5 w-5" /></button>
            </div>
            <p className="mt-3 text-[#3d4a66]">{model.text}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {model.points.map((point) => <li key={point} className="rounded-full bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)] px-3 py-1 text-sm text-[var(--primary-bg,#912e5a)]">{point}</li>)}
            </ul>
            {model.fee ? <p className="mt-4 text-lg font-bold text-[var(--primary-bg,#912e5a)]">{model.fee}</p> : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}


export function DolphinkidsFranchise1({ data: incoming }: { data?: any }) {
  const data = mapThemeUploadAssetsInData(incoming || {});
  
  
  return (<><style dangerouslySetInnerHTML={{ __html: dolphinCss }} /><Franchise data={data} /></>);
}
(DolphinkidsFranchise1 as any).editorFields = ["eyebrow","badge","title","lead","disclaimer","targets","targets_note","reasons_eyebrow","reasons_title","reasons","terms","terms_note","support_eyebrow","support_title","support","support_note","models_eyebrow","models_title","models_lead","view_label","models","projects_kicker","projects","discuss_label","budget_title","budget_text","whatsapp_label","brochure_label","form_kicker","form_title","form_lead","form_note","success_message","school_group","select_placeholder","name_label","phone_label","phone_placeholder","email_label","city_label","state_label","format_label","capacity_label","capacity_placeholder","consent","submit_text","form_footer","footnote"];
export default DolphinkidsFranchise1;
