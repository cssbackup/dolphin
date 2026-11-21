'use client';

import { mapThemeUploadAssetsInData } from '../../../lib/dolphinkidsAssets';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Bus, Check, ChevronDown, Clock, MessageCircle, Phone, Play, School, ShieldCheck, Sun, Wallet } from 'lucide-react';


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






function ArrangementSelect({ options, placeholder }: { options: string[]; placeholder: string }) {
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
      <input name="arrangement" value={value} required readOnly className="sr-only" tabIndex={-1} />
      <button type="button" aria-expanded={open} onClick={() => setOpen((current) => !current)} className="flex min-h-12 w-full items-center justify-between rounded-xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_15%,transparent)] bg-white px-4 text-left text-[15px]">
        <span className={value ? 'text-[var(--hero-bg,#1a2a52)]' : 'text-[#3d4a66]'}>{value || placeholder}</span>
        <ChevronDown className={"h-4 w-4 text-[var(--primary-bg,#912e5a)] transition-transform " + (open ? 'rotate-180' : '')} />
      </button>
      {open ? (
        <ul className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-white p-2 shadow-lg">
          {options.map((option) => (
            <li key={option}>
              <button type="button" onClick={() => { setValue(option); setOpen(false); }} className={"w-full rounded-xl px-3 py-2.5 text-left text-sm " + (value === option ? 'bg-[var(--primary-bg,#912e5a)] text-white' : 'hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)]')}>
                {option}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function DayCarePage({ data }: { data: any }) {
  const [tour, setTour] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <div>
      <section data-editor-section-label="Day Care Intro" data-editor-fields="crumbs eyebrow title_line title_highlight title_rest lead points explore_label enquire_label images tour_poster tour_title stat_value stat_text" className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <p className="text-sm text-[#3d4a66]">
            <a href={data.crumbs[0].href} className="hover:text-[var(--primary-bg,#912e5a)]">{data.crumbs[0].label}</a>
            <span className="mx-2">/</span>
            {data.crumbs[1].label}
          </p>
          <p className="dk-eyebrow mt-8">{data.eyebrow}</p>
          <h1 className="font-[family-name:var(--font-heading)] mt-5 text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.02]">
            {data.title_line} <span className="italic text-[var(--primary-bg,#912e5a)]">{data.title_highlight}</span> {data.title_rest}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#3d4a66]">{data.lead}</p>
          <ul className="mt-7 grid max-w-xl grid-cols-2 gap-x-5 gap-y-2 text-sm">
            {data.points.map((point) => (
              <li key={point} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#db6a24]" />{point}</li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={data.explore_href} className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[var(--hero-bg,#1a2a52)] px-7 text-sm font-bold text-[var(--secondary-bg,#fbf7f3)] hover:bg-[var(--primary-bg,#912e5a)]">{data.explore_label} <ArrowDown className="h-4 w-4" /></a>
            <a href={data.enquire_href} className="inline-flex min-h-[52px] items-center rounded-full bg-[var(--primary-bg,#912e5a)] px-7 text-sm font-bold text-[var(--secondary-bg,#fbf7f3)] hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_82%,black)]">{data.enquire_label}</a>
          </div>
        </div>
        <div className="grid grid-cols-5 grid-rows-6 gap-3" style={{ height: 'min(560px, 110vw)' }}>
          <img src={data.images[0].src} alt={data.images[0].alt} className="col-span-3 row-span-4 h-full w-full rounded-[1.75rem] object-cover" />
          <img src={data.images[1].src} alt={data.images[1].alt} className="col-span-2 row-span-3 h-full w-full rounded-[1.75rem] object-cover" />
          <button type="button" onClick={() => setTour(true)} className="group relative col-span-2 row-span-3 overflow-hidden rounded-[1.75rem] bg-[var(--hero-bg,#1a2a52)] text-left">
            <img src={data.tour_poster} alt="" className="h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 flex flex-col justify-end p-4 text-[var(--secondary-bg,#fbf7f3)]">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--secondary-bg,#fbf7f3)] text-[var(--hero-bg,#1a2a52)]"><Play className="ml-0.5 h-4 w-4" fill="currentColor" /></span>
              <span className="mt-2 font-[family-name:var(--font-heading)] text-lg leading-tight">{data.tour_title}</span>
            </span>
          </button>
          <div className="col-span-3 row-span-2 flex items-center gap-4 rounded-[1.75rem] bg-[#eef2f8] p-5">
            <p className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl">{data.stat_value}</p>
            <p className="text-sm leading-snug text-[#3d4a66]">{data.stat_text}</p>
          </div>
        </div>
      </section>

      {tour ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_70%,transparent)] p-5" onClick={() => setTour(false)}>
          <video src={data.tour_video} controls autoPlay className="max-h-[80vh] w-full max-w-4xl rounded-2xl bg-[var(--hero-bg,#1a2a52)]" onClick={(event) => event.stopPropagation()} />
        </div>
      ) : null}

      <section id="arrangements" data-editor-section-label="Arrangements" data-editor-fields="arrange_eyebrow arrange_title main_title main_text main_note main_button extended_badge extended_title extended_highlight extended_text extended_points extended_button" className="scroll-mt-28 bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)] py-20">
        <div className="mx-auto max-w-7xl px-5">
          <p className="dk-eyebrow">{data.arrange_eyebrow}</p>
          <h2 className="font-[family-name:var(--font-heading)] mt-4 text-4xl sm:text-5xl">{data.arrange_title}</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl bg-white p-8 sm:p-10">
              <Sun className="h-9 w-9 text-[var(--primary-bg,#912e5a)]" strokeWidth={1.4} />
              <h3 className="font-[family-name:var(--font-heading)] mt-6 text-3xl">{data.main_title}</h3>
              <p className="mt-3 text-[#3d4a66]">{data.main_text}</p>
              <p className="mt-5 text-sm text-[#3d4a66]">{data.main_note}</p>
              <a href={data.whatsapp_href} target="_blank" rel="noreferrer" className="btn-lift mt-7 inline-flex min-h-12 items-center rounded-full bg-[var(--primary-bg,#912e5a)] px-6 text-sm font-semibold text-white">{data.main_button}</a>
            </article>
            <article id="extended" className="scroll-mt-28 rounded-3xl bg-[#eef2f8] p-8 sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <School className="h-9 w-9" strokeWidth={1.4} />
                <span className="rounded-full border border-[color-mix(in_srgb,#db6a24_50%,transparent)] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#a34e22]">{data.extended_badge}</span>
              </div>
              <h3 className="font-[family-name:var(--font-heading)] mt-6 text-3xl">{data.extended_title}</h3>
              <p className="mt-2 font-[family-name:var(--font-heading)] text-xl italic text-[var(--primary-bg,#912e5a)]">{data.extended_highlight}</p>
              <p className="mt-4 text-[#3d4a66]">{data.extended_text}</p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {data.extended_points.map((point) => <li key={point} className="flex gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary-bg,#912e5a)]" />{point}</li>)}
              </ul>
              <a href="#enquiry" className="mt-8 inline-flex min-h-12 items-center rounded-full border border-[var(--hero-bg,#1a2a52)]/25 px-6 text-sm font-semibold hover:border-[var(--primary-bg,#912e5a)] hover:text-[var(--primary-bg,#912e5a)]">{data.extended_button}</a>
            </article>
          </div>
        </div>
      </section>

      <section id="activities" data-editor-section-label="Activities" data-editor-fields="activities_eyebrow activities_title activities_lead activities_note activities" className="scroll-mt-28 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <p className="dk-eyebrow">{data.activities_eyebrow}</p>
          <h2 className="font-[family-name:var(--font-heading)] mt-4 max-w-3xl text-4xl sm:text-5xl">{data.activities_title}</h2>
          <p className="mt-4 max-w-2xl text-lg text-[#3d4a66]">{data.activities_lead}</p>
          <ol className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {data.activities.map((item, index) => (
              <li key={item.title} className={"group " + (index === 0 ? 'lg:col-span-2' : '')}>
                <div className={"overflow-hidden rounded-[1.5rem] " + (index === 0 ? 'aspect-[16/8]' : 'aspect-[4/3]')}>
                  <img src={item.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <p className="mt-5 font-[family-name:var(--font-heading)] text-lg text-[#db6a24]">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="font-[family-name:var(--font-heading)] mt-2 text-2xl">{item.title}</h3>
                <p className="mt-2 text-[#3d4a66]">{item.text}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary-bg,#912e5a)]">{data.builds_label}: {item.builds}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-xs text-[#3d4a66]">{data.activities_note}</p>
        </div>
      </section>

      <section id="infrastructure" data-editor-section-label="Infrastructure" data-editor-fields="infra_eyebrow infra_title stats care gallery gallery_alt" className="scroll-mt-28 bg-[#eef2f8] py-20">
        <div className="mx-auto max-w-7xl px-5">
          <p className="dk-eyebrow">{data.infra_eyebrow}</p>
          <h2 className="font-[family-name:var(--font-heading)] mt-4 max-w-3xl text-4xl sm:text-5xl">{data.infra_title}</h2>
          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] md:grid-cols-5">
            {data.stats.map((stat) => (
              <div key={stat.label} className="bg-[var(--secondary-bg,#fbf7f3)] p-6">
                <dd className="font-[family-name:var(--font-heading)] text-3xl">{stat.value} <span className="text-base text-[#3d4a66]">{stat.unit}</span></dd>
                <dt className="mt-1 text-sm text-[#3d4a66]">{stat.label}</dt>
              </div>
            ))}
          </dl>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.care.map((item) => (
              <div key={item.title} className="border-t border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_15%,transparent)] pt-5">
                <h3 className="font-[family-name:var(--font-heading)] text-xl">{item.title}</h3>
                <p className="mt-2 text-[#3d4a66]">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {data.gallery.map((src) => <img key={src} src={src} alt={data.gallery_alt} className="aspect-square w-full rounded-2xl object-cover" />)}
          </div>
        </div>
      </section>

      <ParentInfo data={data.parentInfo} />

      <section id="enquiry" data-editor-section-label="Enquiry" data-editor-fields="form_eyebrow form_title form_lead phone brochure_label card_kicker card_title card_text card_note builds_label call_label success_message fields contact_title needs_title arrangement_label arrangement_placeholder arrangements consent submit_text next_note privacy_note parentInfo" className="scroll-mt-28 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="dk-eyebrow">{data.form_eyebrow}</p>
            <h2 className="font-[family-name:var(--font-heading)] mt-4 text-4xl sm:text-5xl">{data.form_title}</h2>
            <p className="mt-5 text-lg text-[#3d4a66]">{data.form_lead}</p>
            <a href={data.phone_href} className="mt-6 inline-flex min-h-11 items-center font-semibold">{data.call_label} {data.phone}</a>
            <a href={data.brochure_href} download className="mt-2 flex min-h-11 items-center font-semibold text-[var(--primary-bg,#912e5a)] underline underline-offset-4">{data.brochure_label}</a>
          </div>
          <form className="rounded-3xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-white p-6 shadow-sm sm:p-8" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
            {sent ? <p className="text-[var(--primary-bg,#912e5a)]">{data.success_message}</p> : (
              <>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--primary-bg,#912e5a)]">{data.card_kicker}</p>
                <h3 className="font-[family-name:var(--font-heading)] mt-2 text-3xl">{data.card_title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3d4a66]">{data.card_text}</p>
                <p className="mt-2 text-xs text-[#3d4a66]">{data.card_note}</p>
                {['1', '2'].map((group) => (
                  <div key={group}>
                    <p className={(group === '1' ? 'mt-6 border-t border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] pt-5' : 'mt-6') + " text-sm font-semibold text-[var(--primary-bg,#912e5a)]"}>{group} {group === '1' ? data.contact_title : data.needs_title}</p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {data.fields.filter((field) => field.group === group && (group === '1' || ['child', 'age', 'school'].includes(field.name))).map((field) => (
                        <label key={field.name} className={"text-sm font-semibold " + (field.wide ? 'sm:col-span-2' : '')}>
                          {field.label}{field.required ? ' *' : ''}
                          <input name={field.name} type={field.type || 'text'} required={field.required} placeholder={field.placeholder} className="field mt-1" />
                        </label>
                      ))}
                      {group === '2' ? (
                        <label className="text-sm font-semibold sm:col-span-2">{data.arrangement_label} *
                          <ArrangementSelect options={data.arrangements} placeholder={data.arrangement_placeholder} />
                        </label>
                      ) : null}
                      {data.fields.filter((field) => field.group === '2' && group === '2' && !['child', 'age', 'school'].includes(field.name)).map((field) => (
                        <label key={field.name} className={"text-sm font-semibold " + (field.wide ? 'sm:col-span-2' : '')}>
                          {field.label}{field.required ? ' *' : ''}
                          {field.type === 'textarea' ? (
                            <textarea name={field.name} rows={4} required={field.required} placeholder={field.placeholder} className="field mt-1 h-auto py-3" />
                          ) : (
                            <input name={field.name} type={field.type || 'text'} required={field.required} placeholder={field.placeholder} className="field mt-1" />
                          )}
                          {field.hint ? <span className="mt-1 block text-xs font-normal text-[#3d4a66]">{field.hint}</span> : null}
                        </label>
                      ))}
                      {group === '2' ? <label className="flex items-start gap-2 text-sm font-normal sm:col-span-2"><input required type="checkbox" className="mt-1" /> {data.consent}</label> : null}
                    </div>
                  </div>
                ))}
                <p className="mt-4 text-sm text-[#3d4a66]">{data.next_note}</p>
                <button type="submit" className="btn-lift mt-4 min-h-12 rounded-full bg-[var(--hero-bg,#1a2a52)] px-6 text-sm font-semibold text-[var(--secondary-bg,#fbf7f3)] hover:bg-[var(--primary-bg,#912e5a)]">{data.submit_text}</button>
                <p className="mt-3 flex items-center gap-2 text-xs text-[#3d4a66]"><ShieldCheck className="h-4 w-4 text-[var(--primary-bg,#912e5a)]" /> {data.privacy_note}</p>
              </>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}


export function DolphinkidsDayCarePage1({ data: incoming }: { data?: any }) {
  const data = mapThemeUploadAssetsInData(incoming || {});
  
  
  return (<><style dangerouslySetInnerHTML={{ __html: dolphinCss }} /><DayCarePage data={data} /></>);
}
(DolphinkidsDayCarePage1 as any).editorFields = ["title","crumbs","eyebrow","title_line","title_highlight","title_rest","lead","points","explore_label","enquire_label","images","tour_poster","tour_video","tour_title","stat_value","stat_text","arrange_eyebrow","arrange_title","main_title","main_text","main_note","main_button","extended_badge","extended_title","extended_highlight","extended_text","extended_points","extended_button","activities_eyebrow","activities_title","activities_lead","activities_note","activities","infra_eyebrow","infra_title","stats","care","gallery_alt","gallery","form_eyebrow","form_title","form_lead","phone","brochure_label","card_kicker","card_title","card_text","card_note","builds_label","call_label","success_message","fields","contact_title","needs_title","arrangement_label","arrangement_placeholder","arrangements","consent","submit_text","next_note","privacy_note","parentInfo"];
export default DolphinkidsDayCarePage1;
