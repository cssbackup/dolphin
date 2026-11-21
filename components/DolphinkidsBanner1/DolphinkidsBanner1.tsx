'use client';

import { mapThemeUploadAssetsInData } from '../../../lib/dolphinkidsAssets';
import { useRef, useState } from 'react';
import { ArrowRight, Download, MessageCircle, Pause, Phone, Play, PlayCircle } from 'lucide-react';


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




function Flag({ country }: { country: string }) {
  if (country === 'India') {
    return (
      <svg viewBox="0 0 60 30" className="h-3.5 w-7 shrink-0 rounded-[2px] ring-1 ring-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_15%,transparent)]" aria-hidden>
        <path fill="#ff9933" d="M0 0h60v10H0z" />
        <path fill="#fff" d="M0 10h60v10H0z" />
        <path fill="#138808" d="M0 20h60v10H0z" />
        <circle cx="30" cy="15" r="3.2" fill="none" stroke="#000080" strokeWidth="0.6" />
      </svg>
    );
  }
  if (country === 'England') {
    return (
      <svg viewBox="0 0 60 30" className="h-3.5 w-7 shrink-0 rounded-[2px] ring-1 ring-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_15%,transparent)]" aria-hidden>
        <path fill="#fff" d="M0 0h60v30H0z" />
        <path fill="#ce1124" d="M26 0h8v30h-8zM0 11h60v8H0z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 60 30" className="h-3.5 w-7 shrink-0 rounded-[2px] ring-1 ring-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_15%,transparent)]" aria-hidden>
      <path fill="#012169" d="M0 0h60v30H0z" />
      <path stroke="#fff" strokeWidth="6" d="M0 0l60 30M60 0L0 30" />
      <path stroke="#c8102e" strokeWidth="3" d="M0 0l60 30M60 0L0 30" />
      <path stroke="#fff" strokeWidth="10" d="M30 0v30M0 15h60" />
      <path stroke="#c8102e" strokeWidth="6" d="M30 0v30M0 15h60" />
    </svg>
  );
}

function Hero({ data }: { data: any }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!started) setStarted(true);
    if (video.paused) {
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section id={data.id} className="hero-shell relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-20 lg:pt-14">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,#db6a24_40%,transparent)] bg-[var(--secondary-bg,#fbf7f3)] px-3.5 py-1.5 text-[11px] font-bold tracking-[0.18em] text-[#a34e22]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#db6a24]" /> {data.badge}
          </p>
          <p className="dk-eyebrow mt-4 sm:mt-5">{data.eyebrow}</p>
          <h1 className="font-[family-name:var(--font-heading)] mt-4 max-w-[14ch] text-[clamp(2.25rem,4.4vw,3.75rem)] font-normal leading-[1.03] text-[var(--hero-bg,#1a2a52)] sm:max-w-none">
            {data.title}
            <br />
            <span className="whitespace-nowrap">{data.title_rest} <span className="italic text-[var(--primary-bg,#912e5a)]">{data.title_highlight}</span></span>
          </h1>
          <div className="hero-wave" aria-hidden />
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#3d4a66] sm:text-lg">
            <strong className="font-semibold text-[var(--hero-bg,#1a2a52)]">{data.lead_strong}</strong> {data.lead}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={data.primary_href} className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[var(--primary-bg,#912e5a)] px-7 text-sm font-bold text-[var(--secondary-bg,#fbf7f3)] shadow-[0_12px_24px_-14px_hsl(332_54%_37%/0.6)] hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_82%,black)]">
              {data.primary_text} <ArrowRight className="h-4 w-4" />
            </a>
            <a href={data.secondary_href} className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--primary-bg,#912e5a)_30%,transparent)] bg-[var(--secondary-bg,#fbf7f3)] px-6 text-sm font-bold text-[var(--primary-bg,#912e5a)]">
              <Download className="h-4 w-4" /> {data.secondary_text}
            </a>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 text-sm">
            <a href={data.phone_href} className="inline-flex min-h-11 items-center gap-2 font-bold text-[var(--hero-bg,#1a2a52)]">
              <Phone className="h-4 w-4 text-[var(--primary-bg,#912e5a)]" /> {data.call_label} {data.phone}
            </a>
            <a href={data.whatsapp_href} className="inline-flex min-h-11 items-center gap-2 font-semibold text-[var(--primary-bg,#912e5a)] underline decoration-[color-mix(in_srgb,var(--primary-bg,#912e5a)_55%,white)] underline-offset-4">
              <MessageCircle className="h-4 w-4" /> {data.whatsapp_text}
            </a>
          </div>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[var(--hero-bg,#1a2a52)]">
            {data.origins.map((item) => (
              <li key={item.country} className="inline-flex items-center gap-2">
                <Flag country={item.country} /> {item.country}
              </li>
            ))}
          </ul>
          <p className="mt-2 max-w-md text-[11px] leading-relaxed text-[#3d4a66]">{data.origins_note}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm font-semibold">
            {data.links.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className={"inline-flex min-h-11 items-center gap-1 underline underline-offset-4 " + (index === data.links.length - 1 ? 'text-[var(--hero-bg,#1a2a52)] decoration-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_30%,transparent)]' : 'text-[var(--primary-bg,#912e5a)] decoration-[color-mix(in_srgb,var(--primary-bg,#912e5a)_55%,white)]')}
              >
                {index === 1 && <PlayCircle className="h-4 w-4" />}
                {link.name}
                {index === data.links.length - 1 && <ArrowRight className="h-4 w-4" />}
              </a>
            ))}
          </div>
        </div>
        <figure className="relative">
          <div className="relative">
            <div className="pointer-events-none absolute -bottom-3 -right-3 hidden h-[62%] w-[62%] rounded-[1.6rem] border-2 border-gilt/35 lg:block" aria-hidden />
            <div className="relative overflow-hidden rounded-2xl bg-[var(--hero-bg,#1a2a52)] shadow-[0_30px_60px_-36px_hsl(226_52%_21%/0.45)]">
              <div className="relative aspect-video">
                <img src={data.poster} alt={data.poster_alt} className={"h-full w-full object-cover " + (started ? 'invisible' : '')} />
                <video
                  ref={videoRef}
                  className={"absolute inset-0 h-full w-full object-cover " + (started ? '' : 'hidden')}
                  poster={data.poster}
                  playsInline
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                >
                  <source src={data.video} type="video/mp4" />
                </video>
              </div>
              <div className="bg-[var(--secondary-bg,#fbf7f3)] p-4 sm:p-5">
                <button type="button" onClick={toggle} className="inline-flex min-h-12 items-center rounded-full bg-[var(--secondary-bg,#fbf7f3)] p-1.5 text-sm font-bold text-[var(--hero-bg,#1a2a52)]" aria-pressed={playing} aria-label={playing ? data.pause_label : data.play_label}>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--primary-bg,#912e5a)] text-[var(--secondary-bg,#fbf7f3)]">
                    {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" fill="currentColor" />}
                  </span>
                </button>
              </div>
            </div>
            <div className="absolute -left-2 top-6 hidden max-w-[13rem] rounded-2xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-[var(--secondary-bg,#fbf7f3)] px-4 py-3 shadow-[0_14px_30px_-20px_hsl(226_52%_21%/0.4)] sm:block lg:-left-8">
              <p className="font-[family-name:var(--font-heading)] text-lg leading-snug text-[var(--primary-bg,#912e5a)]">Pioneer International School and day care</p>
            </div>
          </div>
          <figcaption className="mt-3 px-2 text-xs text-[#3d4a66]">{data.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}


export function DolphinkidsBanner1({ data: incoming }: { data?: any }) {
  const data = mapThemeUploadAssetsInData(incoming || {});
  
  
  return (<><style dangerouslySetInnerHTML={{ __html: dolphinCss }} /><Hero data={data} /></>);
}
(DolphinkidsBanner1 as any).editorFields = ["badge","eyebrow","title","title_rest","title_highlight","lead_strong","lead","primary_text","secondary_text","phone","call_label","whatsapp_text","links","origins","origins_note","poster","poster_alt","play_label","pause_label","video","year","year_label","caption"];
export default DolphinkidsBanner1;
