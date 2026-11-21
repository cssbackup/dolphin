'use client';

import { mapThemeUploadAssetsInData } from '../../../lib/dolphinkidsAssets';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Atom, BookMarked, BookOpen, ChevronDown, Drama, Dumbbell, FlaskConical, Globe2, HeartHandshake, Leaf, MessageCircle, Mic, Music, PenLine, Phone, PiggyBank, Puzzle, Search, Shapes, Type, X } from 'lucide-react';


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
  globe: Globe2,
  type: Type,
  pen: PenLine,
  book: BookOpen,
  marked: BookMarked,
  puzzle: Puzzle,
  atom: Atom,
  mic: Mic,
  flask: FlaskConical,
  leaf: Leaf,
  shapes: Shapes,
  gym: Dumbbell,
  music: Music,
  bank: PiggyBank,
  heart: HeartHandshake,
  search: Search,
  drama: Drama,
};

function Flag({ country }: { country: string }) {
  if (country === 'India') {
    return (
      <svg viewBox="0 0 60 30" className="h-4 w-8 shrink-0 overflow-hidden rounded-sm ring-1 ring-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_15%,transparent)]" aria-hidden>
        <path fill="#ff9933" d="M0 0h60v10H0z" /><path fill="#fff" d="M0 10h60v10H0z" /><path fill="#138808" d="M0 20h60v10H0z" />
        <circle cx="30" cy="15" r="3.2" fill="none" stroke="#000080" strokeWidth="0.6" />
      </svg>
    );
  }
  if (country === 'England') {
    return (
      <svg viewBox="0 0 60 30" className="h-4 w-8 shrink-0 overflow-hidden rounded-sm ring-1 ring-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_15%,transparent)]" aria-hidden>
        <path fill="#fff" d="M0 0h60v30H0z" /><path fill="#ce1124" d="M26 0h8v30h-8zM0 11h60v8H0z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 60 30" className="h-4 w-8 shrink-0 overflow-hidden rounded-sm ring-1 ring-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_15%,transparent)]" aria-hidden>
      <path fill="#012169" d="M0 0h60v30H0z" />
      <path fill="#fff" d="M0 0l60 30M60 0L0 30" stroke="#fff" strokeWidth="8" />
      <path stroke="#c8102e" strokeWidth="4" d="M0 0l60 30M60 0L0 30" />
      <path stroke="#fff" strokeWidth="10" d="M30 0v30M0 15h60" />
      <path stroke="#c8102e" strokeWidth="6" d="M30 0v30M0 15h60" />
    </svg>
  );
}

const LEARNING_GALLERY = "http://localhost:4000/uploads/themes/dolphinkids-20261118163700/assets/images/";
const LEARNING_PHOTO: Record<string, string> = {
  international: LEARNING_GALLERY + "campus-gallery-1.webp",
  montessori: LEARNING_GALLERY + "campus-gallery-1.webp",
  financial: LEARNING_GALLERY + "campus-gallery-1.webp",
  psed: LEARNING_GALLERY + "campus-gallery-1.webp",
  enquiry: LEARNING_GALLERY + "campus-gallery-1.webp",
  "jolly-phonics": LEARNING_GALLERY + "campus-gallery-2.webp",
  "jolly-grammar": LEARNING_GALLERY + "campus-gallery-2.webp",
  "grammar-starter": LEARNING_GALLERY + "campus-gallery-2.webp",
  fitzroy: LEARNING_GALLERY + "campus-gallery-2.webp",
  kindermusic: LEARNING_GALLERY + "campus-gallery-2.webp",
  steam: LEARNING_GALLERY + "campus-gallery-5.webp",
  "language-lab": LEARNING_GALLERY + "campus-gallery-5.webp",
  "science-lab": LEARNING_GALLERY + "campus-gallery-5.webp",
  performing: LEARNING_GALLERY + "campus-gallery-4.webp",
  kindergym: LEARNING_GALLERY + "campus-gallery-4.webp",
  "evs-lab": LEARNING_GALLERY + "campus-gallery-3.webp",
  "maths-lab": LEARNING_GALLERY + "campus-gallery-6.webp",
};
const LEARNING_POINTS: Record<string, string[]> = {
  international: ["Global learning approaches", "Child-centred classrooms", "Preschool to Grade 2 continuity"],
  "jolly-phonics": ["Letter sounds", "Sound recognition", "Blending", "Segmenting", "Early reading", "Writing readiness"],
  "jolly-grammar": ["Grammar awareness", "Sentence construction", "Punctuation", "Spelling", "Vocabulary", "Written communication"],
  "grammar-starter": ["First grammar concepts", "Language development", "Confident speaking"],
  fitzroy: ["Phonics-based reading", "Decoding", "Vocabulary", "Reading confidence", "Reading fluency"],
  montessori: ["Practical life", "Sensorial development", "Independence", "Fine motor development", "Self-directed exploration"],
  steam: ["Hands-on experiments", "Construction", "Design", "Robotics where available", "Creative problem-solving", "Logical thinking"],
  "language-lab": ["Speech development", "Pronunciation", "Vocabulary", "Storytelling", "Public speaking", "Reading confidence"],
  "science-lab": ["Observation", "Experimentation", "Discovery", "Scientific thinking", "Cause and effect"],
  financial: ["Money awareness", "Saving", "Exchange", "Decision-making", "Entrepreneurship"],
  psed: ["Self-awareness", "Confidence", "Empathy", "Cooperation", "Emotional regulation", "Positive behavioural guidance", "Independence", "Responsibility"],
  enquiry: ["Asking questions", "Exploring", "Observing", "Investigating", "Reasoning", "Problem-solving"],
  performing: ["Dance", "Acting and theatre", "Music", "Stage confidence"],
};
const LEARNING_WHATSAPP = "https://api.whatsapp.com/send/?phone=919310589888&text&type=phone_number&app_absent=0";
const LEARNING_CALL = "tel:+919811029884";

function Learning({ data }: { data: any }) {
  const [filter, setFilter] = useState(data.filters[0] ?? 'All');
  const [open, setOpen] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const menuBox = useRef<HTMLDivElement>(null);
  const list = data.items.filter((item) => filter === 'All' || item.group === filter);
  const selected = data.items.find((item) => item.id === open) ?? null;

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (menuBox.current && !menuBox.current.contains(event.target as Node)) setMenu(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <section id={data.id} className="relative overflow-hidden bg-[#eef6f1] py-12 text-[var(--hero-bg,#1a2a52)] sm:py-16">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-[color-mix(in_srgb,#db6a24_20%,transparent)]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5">
        <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--primary-bg,#912e5a)]">
          <span className="font-[family-name:var(--font-heading)] font-normal normal-case tracking-normal text-[#db6a24]">{data.index}</span>
          <span className="mx-3 font-normal text-[#db6a24]">—</span>
          {data.eyebrow}
        </p>
        <h2 className="font-[family-name:var(--font-heading)] mt-4 max-w-3xl text-4xl font-normal leading-[1.05] sm:text-5xl">{data.title}</h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#3d4a66]">{data.lead}</p>

        <div className=" mt-8 rounded-2xl border border-[color-mix(in_srgb,#db6a24_30%,transparent)] bg-white/70 px-5 py-2 sm:px-7">
          <dl className="divide-y divide-gilt/25">
            {data.origins.map((row) => (
              <div key={row.country} className="grid gap-2 py-5 md:grid-cols-[170px_1fr] md:gap-6">
                <dt className="flex items-center gap-3 font-semibold text-[var(--hero-bg,#1a2a52)]"><Flag country={row.country} />{row.country}</dt>
                <dd className="text-sm leading-relaxed text-[#3d4a66]">{row.detail}</dd>
              </div>
            ))}
          </dl>
          <p className="border-t border-gilt/25 py-4 text-xs leading-relaxed text-[#3d4a66]">{data.origins_note}</p>
        </div>

        <div ref={menuBox} className="relative mt-8 md:hidden">
          <button type="button" aria-expanded={menu} onClick={() => setMenu((current) => !current)} className="flex min-h-12 w-full items-center justify-between rounded-2xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_15%,transparent)] bg-white px-4 text-left text-sm font-semibold">
            {filter}
            <ChevronDown className={"h-4 w-4 text-[var(--primary-bg,#912e5a)] transition-transform " + (menu ? 'rotate-180' : '')} />
          </button>
          {menu ? (
            <ul className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-white p-2 shadow-lg">
              {data.filters.map((name) => (
                <li key={name}>
                  <button
                    type="button"
                    onClick={() => {
                      setFilter(name);
                      setMenu(false);
                    }}
                    className={"w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold " + (filter === name ? 'bg-[var(--hero-bg,#1a2a52)] text-[var(--secondary-bg,#fbf7f3)]' : 'text-[var(--hero-bg,#1a2a52)] hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)]')}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div role="tablist" className="mt-10 hidden flex-wrap gap-2 md:flex">
          {data.filters.map((name) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={filter === name}
              onClick={() => setFilter(name)}
              className={"min-h-11 rounded-full px-5 text-sm font-semibold transition-colors " + (filter === name ? 'bg-[var(--hero-bg,#1a2a52)] text-[var(--secondary-bg,#fbf7f3)]' : 'border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_15%,transparent)] bg-white text-[var(--hero-bg,#1a2a52)] hover:border-[var(--primary-bg,#912e5a)] hover:text-[var(--primary-bg,#912e5a)]')}
            >
              {name}
            </button>
          ))}
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons] ?? BookOpen;
            return (
              <li id={"learning-" + item.id} key={item.id}>
                <button
                  type="button"
                  onClick={() => setOpen(item.id)}
                  className="group flex h-full w-full flex-col rounded-2xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-white p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary-bg,#912e5a)] hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--primary-bg,#912e5a)] text-white">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </span>
                    {item.origin ? <span className="rounded-full border border-[color-mix(in_srgb,#db6a24_50%,transparent)] px-2.5 py-0.5 text-xs font-semibold text-[#db6a24]">{item.origin}</span> : null}
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] mt-6 text-xl text-[var(--hero-bg,#1a2a52)]">{item.name}</h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[#3d4a66]">{item.text}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary-bg,#912e5a)]">
                    {data.learn_more}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {selected ? (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-[var(--hero-bg,#1a2a52)]/45 p-4" onClick={() => setOpen(null)}>
          <div className="max-h-[88vh] w-full max-w-xl overflow-auto rounded-3xl bg-[var(--secondary-bg,#fbf7f3)] p-6 shadow-2xl sm:p-7" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary-bg,#912e5a)]">{selected.origin ? "Origin: " + selected.origin : "Dolphin Kids Learning"}</p>
              <button type="button" onClick={() => setOpen(null)} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--primary-bg,#912e5a)] text-[var(--primary-bg,#912e5a)]" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>
            <h3 className="font-[family-name:var(--font-heading)] mt-2 text-4xl text-[var(--hero-bg,#1a2a52)]">{selected.name}</h3>
            <img src={selected.image || LEARNING_PHOTO[selected.id]} alt={selected.name} className="mt-4 aspect-[16/9] w-full rounded-2xl object-cover" />
            <p className="mt-2 text-xs text-[#6b7280]">From the school gallery; programme-specific classroom photographs await review.</p>
            <p className="mt-4 leading-relaxed text-[#3d4a66]">{selected.text}</p>
            <p className="mt-5 font-semibold text-[var(--hero-bg,#1a2a52)]">Educational objectives</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {(LEARNING_POINTS[selected.id] || selected.points || []).map((point) => (
                <li key={point} className="rounded-full border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_18%,transparent)] px-3 py-1.5 text-sm text-[var(--hero-bg,#1a2a52)]">{point}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3 border-t border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_12%,transparent)] pt-5">
              <a href={LEARNING_WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--primary-bg,#912e5a)] px-5 text-sm font-semibold text-white">
                <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
              </a>
              <a href={LEARNING_CALL} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_25%,transparent)] px-5 text-sm font-semibold text-[var(--hero-bg,#1a2a52)]">
                <Phone className="h-4 w-4" /> Call admissions
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}


export function DolphinkidsLearning1({ data: incoming }: { data?: any }) {
  const data = mapThemeUploadAssetsInData(incoming || {});
  
  
  return (<><style dangerouslySetInnerHTML={{ __html: dolphinCss }} /><Learning data={data} /></>);
}
(DolphinkidsLearning1 as any).editorFields = ["eyebrow","title","lead","origins","origins_note","filters","learn_more","items"];
export default DolphinkidsLearning1;
