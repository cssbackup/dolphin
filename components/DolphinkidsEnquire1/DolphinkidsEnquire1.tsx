'use client';

import { mapThemeUploadAssetsInData } from '../../../lib/dolphinkidsAssets';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Download, MessageCircle, Phone, ShieldCheck } from 'lucide-react';


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




function ProgrammeSelect({ item }: { item: EnquireField }) {
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
      <input type="text" name={item.name} value={value} required={item.required} readOnly className="sr-only" tabIndex={-1} />
      <button
        type="button"
        id={item.name}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex min-h-12 w-full items-center justify-between rounded-2xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_15%,transparent)] bg-white px-4 text-left text-[15px] shadow-sm"
      >
        <span className={value ? 'font-semibold text-[var(--hero-bg,#1a2a52)]' : 'text-[#3d4a66]'}>{value || item.placeholder}</span>
        <ChevronDown className={"h-4 w-4 text-[var(--primary-bg,#912e5a)] transition-transform " + (open ? 'rotate-180' : '')} />
      </button>
      {open && (
        <ul className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-white p-2 shadow-[0_18px_40px_-24px_rgba(40,52,96,0.35)]">
          {item.options?.map((option) => (
            <li key={option}>
              <button
                type="button"
                onClick={() => {
                  setValue(option);
                  setOpen(false);
                }}
                className={"flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm " + (value === option ? 'bg-[var(--primary-bg,#912e5a)] text-[var(--secondary-bg,#fbf7f3)]' : 'text-[var(--hero-bg,#1a2a52)] hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)]')}
              >
                {option}
                {value === option && <Check className="h-4 w-4" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const actionClass = {
  solid: 'bg-[var(--primary-bg,#912e5a)] text-[var(--secondary-bg,#fbf7f3)] hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_82%,black)]',
  tint: 'border border-[var(--primary-bg,#912e5a)]/35 bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)] text-[var(--primary-bg,#912e5a)] hover:bg-white',
  outline: 'border border-[var(--hero-bg,#1a2a52)]/25 text-[var(--hero-bg,#1a2a52)] hover:border-[var(--primary-bg,#912e5a)] hover:text-[var(--primary-bg,#912e5a)]',
};

function Enquire({ data }: { data: any }) {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  const field = (item: EnquireField) => {
    const common = 'field mt-1';
    if (item.type === 'textarea') {
      return <textarea id={item.name} name={item.name} required={item.required} placeholder={item.placeholder} className={(common) + " min-h-28 py-3"} />;
    }
    if (item.type === 'select') return <ProgrammeSelect item={item} />;
    return <input id={item.name} name={item.name} type={item.type} required={item.required} placeholder={item.placeholder} className={common} />;
  };

  return (
    <section className="px-5 py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-[var(--secondary-bg,#fbf7f3)] ring-1 ring-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] lg:grid-cols-[1.2fr_1fr]">
        <div className="p-8 sm:p-14">
          <p className="dk-eyebrow">
            <span className="font-[family-name:var(--font-heading)] text-base normal-case tracking-normal text-[#db6a24]">{data.index}</span> {data.eyebrow}
          </p>
          <h2 className="font-[family-name:var(--font-heading)] mt-4 text-4xl font-normal leading-[1.05] sm:text-6xl">{data.title}</h2>
          <p className="mt-5 max-w-lg text-lg text-[#3d4a66]">{data.lead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            {data.actions.map((action) => (
              <a key={action.name} href={action.href} className={"inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold " + (actionClass[action.style as keyof typeof actionClass])}>
                {action.style === 'tint' && <Download className="h-4 w-4" />}
                {action.style === 'outline' && <MessageCircle className="h-4 w-4" />}
                {action.name}
              </a>
            ))}
          </div>
          <div id={data.id} className="mt-10">
            {sent ? (
              <div className="rounded-3xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-white p-6 sm:p-9">
                <h3 className="font-[family-name:var(--font-heading)] text-3xl">{data.success_title}</h3>
                <p className="mt-3 text-[#3d4a66]">{data.success_message}</p>
                <p className="mt-3 text-sm text-[#3d4a66]">{data.next_note}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="rounded-3xl bg-white p-5 ring-1 ring-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary-bg,#912e5a)]">{data.form_kicker}</p>
                <h3 className="font-[family-name:var(--font-heading)] mt-2 text-3xl">{data.form_title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#3d4a66]">{data.form_text}</p>
                <p className="mt-4 text-xs text-[#3d4a66]"><span className="font-semibold text-[var(--primary-bg,#912e5a)]">*</span> {data.form_note}</p>
                <div className="mt-7 space-y-7">
                  {data.groups.map((group, index) => (
                    <fieldset key={group.title}>
                      <legend className="mb-4 flex items-center gap-2 text-sm font-bold">
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_10%,transparent)] text-xs text-[var(--primary-bg,#912e5a)]">{index + 1}</span>
                        {group.title}
                      </legend>
                      <div className="grid gap-5 md:grid-cols-2">
                        {group.fields.map((item) => (
                          <div key={item.name} className={item.wide || item.type === 'textarea' || item.type === 'select' ? 'md:col-span-2' : ''}>
                            <label htmlFor={item.name} className="text-sm font-bold">
                              {item.label}
                              {item.required ? <span className="text-[var(--primary-bg,#912e5a)]"> *</span> : <span className="font-normal text-[#3d4a66]"> (optional)</span>}
                            </label>
                            {field(item)}
                            {item.hint && <p className="mt-2 text-xs text-[#3d4a66]">{item.hint}</p>}
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  ))}
                </div>
                <label className="mt-7 flex items-start gap-3 rounded-2xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-[var(--secondary-bg,#fbf7f3)] p-4 text-sm leading-relaxed text-[#3d4a66]">
                  <input type="checkbox" required className="mt-1 h-5 w-5 accent-[hsl(332_54%_37%)]" />
                  <span>{data.consent} <span className="font-semibold text-[var(--primary-bg,#912e5a)]">(Required)</span></span>
                </label>
                <p className="mt-6 text-xs leading-relaxed text-[#3d4a66]">{data.next_note}</p>
                <button type="submit" className="mt-4 inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-[var(--hero-bg,#1a2a52)] px-5 text-sm font-bold text-[var(--secondary-bg,#fbf7f3)] hover:bg-[var(--primary-bg,#912e5a)]">{data.submit_text}</button>
                <p className="mt-4 inline-flex items-start gap-2 text-xs text-[#3d4a66]"><ShieldCheck className="h-4 w-4 shrink-0 text-[var(--primary-bg,#912e5a)]" />{data.privacy_note}</p>
              </form>
            )}
          </div>
          <a href={data.phone_href} className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold">
            <Phone className="h-4 w-4 text-[var(--primary-bg,#912e5a)]" /> {data.phone_line} {data.phone}
          </a>
        </div>
        <img src={data.image} alt={data.image_alt} className="h-full min-h-[280px] w-full object-cover" />
      </div>
    </section>
  );
}


export function DolphinkidsEnquire1({ data: incoming }: { data?: any }) {
  const data = mapThemeUploadAssetsInData(incoming || {});
  
  
  return (<><style dangerouslySetInnerHTML={{ __html: dolphinCss }} /><Enquire data={data} /></>);
}
(DolphinkidsEnquire1 as any).editorFields = ["eyebrow","title","lead","actions","form_kicker","form_title","form_text","form_note","groups","consent","submit_text","next_note","privacy_note","phone_line","phone","image","image_alt","success_title","success_message"];
export default DolphinkidsEnquire1;
