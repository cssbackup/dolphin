'use client';

import { mapThemeUploadAssetsInData } from '../../../lib/dolphinkidsAssets';
import { useEffect, useState } from 'react';
import { ArrowRight, CalendarClock } from 'lucide-react';


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




function monthsBetween(from: string, to: string) {
  const start = new Date(from);
  const end = new Date(to);
  if (Number.isNaN(start.getTime()) || end < start) return null;
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (end.getDate() < start.getDate()) months -= 1;
  return months;
}

function AgeCheck({ data }: { data: any }) {
  const check = data.age_check;
  const [session, setSession] = useState('');
  const [track, setTrack] = useState(check.tracks[0]?.id ?? 'nursery');
  const [dob, setDob] = useState('');
  const [today, setToday] = useState('');
  const pre = track === 'pre';

  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
  }, []);

  const months = dob && (!pre || today) ? monthsBetween(dob, pre ? today : check.cutoff) : null;
  const pool = pre ? data.items.filter((item) => item.months <= 20) : data.items.filter((item) => item.months > 20);
  const match = months !== null && months >= 0 ? [...pool].reverse().find((item) => months >= item.months) : undefined;

  return (
    <div id={check.id} className="mt-10 grid gap-8 rounded-2xl bg-[#eef2f8] p-7 sm:p-10 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <CalendarClock className="h-8 w-8 text-[#db6a24]" />
        <h3 className="font-[family-name:var(--font-heading)] mt-4 text-3xl">{check.title}</h3>
        <p className="mt-3 text-[#3d4a66]">{check.text}</p>
      </div>
      <div className="grid content-start gap-4">
        {!pre && (
          <label className="grid gap-2 text-sm font-semibold">
            {check.session_label}
            <select value={session} onChange={(event) => setSession(event.target.value)} className="field bg-white">
              <option value="">{check.session_placeholder}</option>
              {check.sessions.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        )}
        <label className="grid gap-2 text-sm font-semibold">
          {check.checking_label}
          <select value={track} onChange={(event) => setTrack(event.target.value)} className="field bg-white">
            {check.tracks.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          {check.dob_label}
          <input type="date" value={dob} max={today || undefined} onChange={(event) => setDob(event.target.value)} className="field bg-white" />
        </label>
        <div className="rounded-xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-white/70 p-5 text-sm text-[#3d4a66]" aria-live="polite">
          {months !== null && months >= 0 ? (
            <p>
              {pre ? check.age_today : (check.age_on) + " " + (check.cutoff_label)}: <strong className="text-[var(--hero-bg,#1a2a52)]">{Math.floor(months / 12)} {check.years_label} {months % 12} {check.months_label}</strong>
              {match ? <span className="mt-2 block font-[family-name:var(--font-heading)] text-2xl text-[var(--hero-bg,#1a2a52)]">{match.name}</span> : <span className="mt-2 block">{check.below_text}</span>}
              <span className="mt-2 block text-xs">{check.indicative}</span>
            </p>
          ) : (
            <p>
              {check.empty_result} <a href={check.phone_href} className="font-semibold text-[var(--hero-bg,#1a2a52)] underline">{check.phone}</a>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}





function Programmes({ data }: { data: any }) {
  return (
    <section id={data.id} className="mx-auto max-w-7xl px-5 pt-8 pb-10 sm:pt-10 sm:pb-14">
      <p className="dk-eyebrow"><span className="font-[family-name:var(--font-heading)] normal-case tracking-normal text-[#db6a24]">{data.index}</span> {data.eyebrow}</p>
      <h2 className="font-[family-name:var(--font-heading)] mt-4 max-w-3xl text-3xl font-normal leading-[1.08] sm:text-5xl">{data.title}</h2>
      <p className="mt-4 max-w-2xl text-lg text-[#3d4a66]">{data.lead}</p>
      <p className="mt-4 text-sm font-semibold text-[var(--primary-bg,#912e5a)]">{data.ribbon}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {data.cards.map((card, index) => (
          <a key={card.title} href={card.href} className={"group rounded-2xl border p-6 transition-colors " + (index === 0 ? 'border-[color-mix(in_srgb,var(--primary-bg,#912e5a)_15%,transparent)] bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)] hover:bg-white' : 'border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-white hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)]')}>
            <p className="dk-eyebrow">{card.eyebrow}</p>
            <h3 className="font-[family-name:var(--font-heading)] mt-3 text-2xl">{card.title}</h3>
            <p className="mt-2 text-sm text-[#3d4a66]">{card.text}</p>
            <span className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--primary-bg,#912e5a)]">{card.link} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
          </a>
        ))}
      </div>
      <p className="mt-6 text-sm text-[#3d4a66]">{data.note}</p>
      <a href={data.process_href} className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--primary-bg,#912e5a)] underline underline-offset-4">{data.process_link} <ArrowRight className="h-4 w-4" /></a>
      <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((item, index) => (
          <li key={item.name} className="group relative  bg-[var(--secondary-bg,#fbf7f3)] p-7 transition-colors hover:bg-white" style={{ transitionDelay: (index * 60) + "ms" }}>
            <div className="flex items-start justify-between">
              <span className="font-[family-name:var(--font-heading)] text-5xl text-[color-mix(in_srgb,var(--primary-bg,#912e5a)_20%,transparent)]">{String(index + 1).padStart(2, '0')}</span>
              <span className="rounded-full bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_10%,transparent)] px-3 py-1 text-xs font-semibold text-[var(--primary-bg,#912e5a)]">{data.badge}</span>
            </div>
            <h3 className="font-[family-name:var(--font-heading)] mt-6 text-3xl text-[var(--hero-bg,#1a2a52)]">{item.name}</h3>
            <p className="mt-1 text-[#3d4a66]">{item.age}</p>
            <p className="mt-4 line-clamp-2 text-sm text-[#3d4a66]/80">{item.focus}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a href={data.process_href} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[var(--hero-bg,#1a2a52)] hover:text-[var(--primary-bg,#912e5a)]">
                {data.details_label} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href={data.whatsapp_href} className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--primary-bg,#912e5a)] underline-offset-4 hover:underline">{data.whatsapp_label}</a>
            </div>
          </li>
        ))}
      </ol>
      <AgeCheck data={data} />
    </section>
  );
}


export function DolphinkidsProgrammes1({ data: incoming }: { data?: any }) {
  const data = mapThemeUploadAssetsInData(incoming || {});
  
  
  return (<><style dangerouslySetInnerHTML={{ __html: dolphinCss }} /><Programmes data={data} /></>);
}
(DolphinkidsProgrammes1 as any).editorFields = ["eyebrow","title","lead","ribbon","cards","note","process_link","badge","details_label","whatsapp_label","age_check","items"];
export default DolphinkidsProgrammes1;
