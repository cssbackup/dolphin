'use client';

import { mapThemeUploadAssetsInData } from '../../../lib/dolphinkidsAssets';
import { type FormEvent, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, MessageCircle, Search, X } from 'lucide-react';


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

let page: any = {};




function ChipRow({ children }: { children: ReactNode }) {
  const scroller = useRef<HTMLDivElement>(null);
  const move = (direction: number) => scroller.current?.scrollBy({ left: direction * 280, behavior: 'smooth' });
  return (
    <div className="hidden min-w-0 flex-1 items-center gap-2 rounded-full bg-white p-1.5 ring-1 ring-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] md:flex">
      <button type="button" aria-label={page.prev_categories} onClick={() => move(-1)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[var(--hero-bg,#1a2a52)] hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)] hover:text-[var(--primary-bg,#912e5a)]">
        <ChevronLeft className="h-4 w-4" />
      </button>
      <div ref={scroller} className="flex gap-2 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
      <button type="button" aria-label={page.next_categories} onClick={() => move(1)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[var(--hero-bg,#1a2a52)] hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)] hover:text-[var(--primary-bg,#912e5a)]">
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function AgeSelect({ label, placeholder, value, onChange, options }: { label: string; placeholder: string; value: string; onChange: (value: string) => void; options: string[] }) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (box.current && !box.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div ref={box} className="relative">
      <span className="text-sm font-semibold">{label}</span>
      <button type="button" aria-expanded={open} onClick={() => setOpen((current) => !current)} className="mt-1 flex min-h-12 w-full items-center justify-between rounded-2xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_15%,transparent)] bg-white px-4 text-left text-[15px]">
        <span className={value ? 'font-semibold text-[var(--hero-bg,#1a2a52)]' : 'text-[#3d4a66]'}>{value || placeholder}</span>
        <ChevronDown className={"h-4 w-4 text-[var(--primary-bg,#912e5a)] transition-transform " + (open ? 'rotate-180' : '')} />
      </button>
      {open ? (
        <ul className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-white p-2 shadow-[0_18px_40px_-24px_rgba(40,52,96,0.35)]">
          {options.map((option) => (
            <li key={option}>
              <button type="button" onClick={() => { onChange(option); setOpen(false); }} className={"flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm " + (value === option ? 'bg-[var(--primary-bg,#912e5a)] text-white' : 'text-[var(--hero-bg,#1a2a52)] hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)]')}>
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

function Subscribe() {
  const copy = page.subscribe;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (name.trim().length < 2) return setError(copy.name_error);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setError(copy.email_error);
    if (!age) return setError(copy.age_error);
    if (!consent) return setError(copy.consent_error);
    setError('');
    setDone(true);
  };

  if (done) return <p role="status" className="font-[family-name:var(--font-heading)] text-2xl">{copy.success}</p>;

  return (
    <form onSubmit={submit} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold">{copy.name_label}<input value={name} onChange={(event) => setName(event.target.value)} className="field mt-1" /></label>
        <label className="text-sm font-semibold">{copy.email_label}<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="field mt-1" /></label>
      </div>
      <AgeSelect label={copy.age_label} placeholder={copy.select_placeholder} value={age} onChange={setAge} options={page.age_groups.map((group) => group.label)} />
      <fieldset>
        <legend className="text-sm font-semibold">{copy.interest_label} <span className="font-normal text-[#3d4a66]">{copy.optional_label}</span></legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {page.categories.map((item) => {
            const on = interests.includes(item.label);
            return (
              <button key={item.label} type="button" aria-pressed={on} onClick={() => setInterests((current) => on ? current.filter((value) => value !== item.label) : [...current, item.label])} className={"min-h-9 rounded-full border px-3 text-xs font-semibold " + (on ? 'border-[var(--hero-bg,#1a2a52)] bg-[var(--hero-bg,#1a2a52)] text-[var(--secondary-bg,#fbf7f3)]' : 'border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_20%,transparent)] bg-[var(--secondary-bg,#fbf7f3)] hover:border-[var(--primary-bg,#912e5a)]')}>{item.label}</button>
            );
          })}
        </div>
      </fieldset>
      <label className="flex cursor-pointer items-start gap-3 text-sm text-[#3d4a66]">
        <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--primary-bg,#912e5a)]" />
        <span>{copy.consent}</span>
      </label>
      {error ? <p role="alert" className="text-sm text-[var(--primary-bg,#912e5a)]">{error}</p> : null}
      <button type="submit" className="inline-flex min-h-[52px] w-fit items-center rounded-full bg-[var(--primary-bg,#912e5a)] px-8 text-sm font-bold text-[var(--secondary-bg,#fbf7f3)] hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_82%,black)]">{copy.submit}</button>
    </form>
  );
}

function JournalList({ data }: { data: any }) {
  const [term, setTerm] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const menuBox = useRef<HTMLDivElement>(null);
  const categories = [...new Set(page.articles.map((article) => article.category))];
  const filtering = term.trim().length > 0 || category !== null;
  const results = useMemo(() => {
    const query = term.trim().toLowerCase();
    return page.articles.filter((article) => {
      if (category && article.category !== category) return false;
      if (!query) return true;
      const haystack = [article.title, article.excerpt, article.category].join(" ").toLowerCase();
      return haystack.includes(query);
    });
  }, [term, category]);
  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (menuBox.current && !menuBox.current.contains(event.target as Node)) setMenu(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);
  const lead = page.articles.find((article) => article.featured) ?? page.articles[0];
  const side = page.articles.filter((article) => article.slug !== lead.slug).slice(0, 4);
  const rest = page.articles.filter((article) => article.slug !== lead.slug && !side.some((item) => item.slug === article.slug));

  return (
    <div>
      <header data-editor-section-label="Journal Intro" data-editor-fields="kicker heading heading_em heading_rest tagline lead" className="border-b border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)]">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-12 text-center">
          <p className="dk-eyebrow">{page.kicker}</p>
          <h1 className="font-[family-name:var(--font-heading)] mt-4 text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.95]">
            {page.heading} <span className="italic">{page.heading_em}</span> {page.heading_rest}
          </h1>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#a34e22]">{page.tagline}</p>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-[#3d4a66]">{page.lead}</p>
        </div>
      </header>
      <section data-editor-section-label="Journal Search" data-editor-fields="search_placeholder all_label latest_label clear_label empty_title empty_text prev_categories next_categories" className="mx-auto max-w-7xl px-5 py-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <label className="relative block w-full shrink-0 sm:w-56">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3d4a66]" />
            <input value={term} onChange={(event) => setTerm(event.target.value)} placeholder={page.search_placeholder} className="h-12 w-full rounded-full border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-white pl-10 pr-4 text-sm text-[var(--hero-bg,#1a2a52)] outline-none placeholder:text-[#3d4a66] focus:border-[var(--primary-bg,#912e5a)]" />
          </label>
          <div ref={menuBox} className="relative w-full md:hidden">
            <button type="button" aria-expanded={menu} onClick={() => setMenu((current) => !current)} className="flex h-12 w-full items-center justify-between rounded-full border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-white px-4 text-left text-sm font-semibold">
              {category ?? page.all_label}
              <ChevronDown className={"h-4 w-4 text-[var(--primary-bg,#912e5a)] transition-transform " + (menu ? 'rotate-180' : '')} />
            </button>
            {menu ? (
              <ul className="absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-2xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-white p-2 shadow-[0_18px_40px_-24px_rgba(40,52,96,0.35)]">
                <li>
                  <button type="button" onClick={() => { setCategory(null); setMenu(false); }} className={"w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold " + (!category ? 'bg-[var(--hero-bg,#1a2a52)] text-[var(--secondary-bg,#fbf7f3)]' : 'text-[var(--hero-bg,#1a2a52)] hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)]')}>{page.all_label}</button>
                </li>
                {categories.map((name) => (
                  <li key={name}>
                    <button type="button" onClick={() => { setCategory(name); setMenu(false); }} className={"w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold " + (category === name ? 'bg-[var(--hero-bg,#1a2a52)] text-[var(--secondary-bg,#fbf7f3)]' : 'text-[var(--hero-bg,#1a2a52)] hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)]')}>{name}</button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <ChipRow>
            <button type="button" onClick={() => setCategory(null)} className={"min-h-9 shrink-0 rounded-full px-4 text-sm font-semibold " + (!category ? 'bg-[var(--hero-bg,#1a2a52)] text-[var(--secondary-bg,#fbf7f3)]' : 'text-[var(--hero-bg,#1a2a52)] hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)] hover:text-[var(--primary-bg,#912e5a)]')}>{page.all_label}</button>
            {categories.map((name) => (
              <button key={name} type="button" onClick={() => setCategory(category === name ? null : name)} className={"min-h-9 shrink-0 rounded-full px-4 text-sm font-semibold " + (category === name ? 'bg-[var(--hero-bg,#1a2a52)] text-[var(--secondary-bg,#fbf7f3)]' : 'text-[var(--hero-bg,#1a2a52)] hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)] hover:text-[var(--primary-bg,#912e5a)]')}>{name}</button>
            ))}
          </ChipRow>
        </div>
      </section>
      {filtering ? (
        <section className="mx-auto max-w-7xl px-5 pb-20">
          <div className="flex items-center justify-between border-b border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] pb-4">
            <p className="text-[#3d4a66]">{results.length} articles</p>
            <button type="button" onClick={() => { setTerm(''); setCategory(null); }} className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary-bg,#912e5a)]"><X className="h-4 w-4" />{page.clear_label}</button>
          </div>
          {results.length ? (
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((article) => (
                <Link key={article.slug} href="#page-journal-article" className="group">
                  <img src={article.image} alt={article.image_alt} className="aspect-[4/3] w-full rounded-3xl object-cover" />
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary-bg,#912e5a)]">{article.category}</p>
                  <h2 className="font-[family-name:var(--font-heading)] mt-2 text-2xl group-hover:text-[var(--primary-bg,#912e5a)]">{article.title}</h2>
                </Link>
              ))}
            </div>
          ) : <p className="mt-10 text-lg">{page.empty_title} {page.empty_text}</p>}
        </section>
      ) : (
        <>
          <section data-editor-section-label="Journal Articles" data-editor-fields="articles latest_label" className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 lg:grid-cols-[1.45fr_1fr]">
            <Link href="#page-journal-article" className="group">
              <img src={lead.image} alt={lead.image_alt} className="aspect-[16/10] w-full rounded-3xl object-cover transition-transform duration-500 group-hover:scale-[1.01]" />
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary-bg,#912e5a)]">{lead.category}</p>
              <h2 className="font-[family-name:var(--font-heading)] mt-2 text-4xl group-hover:text-[var(--primary-bg,#912e5a)]">{lead.title}</h2>
              <p className="mt-3 text-[#3d4a66]">{lead.excerpt}</p>
            </Link>
            <div>
              <p className="dk-eyebrow border-b border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] pb-3">{page.latest_label}</p>
              <ul className="divide-y divide-ink/10">
                {side.map((article) => (
                  <li key={article.slug}>
                    <Link href="#page-journal-article" className="group flex gap-4 py-5">
                      <img src={article.image} alt="" className="h-20 w-24 shrink-0 rounded-xl object-cover" />
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--primary-bg,#912e5a)]">{article.category}</p>
                        <h3 className="font-[family-name:var(--font-heading)] mt-1 text-lg leading-snug group-hover:text-[var(--primary-bg,#912e5a)]">{article.title}</h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section data-editor-section-label="Journal Articles" data-editor-fields="articles" className="mx-auto grid max-w-7xl gap-8 px-5 pb-20 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => (
              <Link key={article.slug} href="#page-journal-article" className="group">
                <img src={article.image} alt={article.image_alt} className="aspect-[4/3] w-full rounded-3xl object-cover" />
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary-bg,#912e5a)]">{article.category}</p>
                <h2 className="font-[family-name:var(--font-heading)] mt-2 text-2xl group-hover:text-[var(--primary-bg,#912e5a)]">{article.title}</h2>
              </Link>
            ))}
          </section>
          <section id="ages" data-editor-section-label="Age Guides" data-editor-fields="age_eyebrow age_heading age_groups articles_label" className="scroll-mt-40 border-y border-[var(--primary-bg,#912e5a)]/25 bg-[hsl(338_46%_95.5%)] py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-5">
              <p className="dk-eyebrow">{page.age_eyebrow}</p>
              <h2 className="font-[family-name:var(--font-heading)] mt-3 text-3xl sm:text-4xl">{page.age_heading}</h2>
              <ol className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
                {page.age_groups.map((group, index) => (
                  <li key={group.label}>
                    <Link href="#page-journal" className="group flex h-full min-h-[132px] flex-col justify-between rounded-2xl bg-[var(--secondary-bg,#fbf7f3)] p-5 ring-1 ring-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_8%,transparent)] transition-colors hover:ring-[color-mix(in_srgb,var(--primary-bg,#912e5a)_40%,transparent)]">
                      <span className="font-[family-name:var(--font-heading)] text-sm text-[#db6a24]">{String(index + 1).padStart(2, '0')}</span>
                      <span className="font-[family-name:var(--font-heading)] text-xl leading-tight">{group.label}</span>
                      <span className="text-xs font-semibold text-[var(--primary-bg,#912e5a)]">{group.count} {page.articles_label} <ArrowRight className="inline h-3 w-3" aria-hidden /></span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </section>
          <section id="categories" data-editor-section-label="Categories" data-editor-fields="category_eyebrow category_heading categories" className="scroll-mt-40 py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-5">
              <p className="dk-eyebrow">{page.category_eyebrow}</p>
              <h2 className="font-[family-name:var(--font-heading)] mt-3 text-3xl sm:text-4xl">{page.category_heading}</h2>
              <ul className="mt-10 grid border-t border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] sm:grid-cols-2 lg:grid-cols-3">
                {page.categories.map((item, index) => (
                  <li key={item.label} className="border-b border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(odd)]:border-r-0 lg:[&:not(:nth-child(3n))]:border-r">
                    <Link href="#page-journal" className="group flex min-h-[76px] items-center justify-between gap-3 px-1 py-4 sm:px-5">
                      <span className="flex items-baseline gap-3">
                        <span className="font-[family-name:var(--font-heading)] text-sm text-[#db6a24]">{String(index + 1).padStart(2, '0')}</span>
                        <span className="font-[family-name:var(--font-heading)] text-lg group-hover:text-[var(--primary-bg,#912e5a)]">{item.label}</span>
                      </span>
                      <span className="text-xs text-[#3d4a66]">{item.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section id="subscribe" data-editor-section-label="Subscribe" data-editor-fields="subscribe" className="scroll-mt-40 px-5 pb-20">
            <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] bg-[var(--hero-bg,#1a2a52)] p-7 text-[var(--secondary-bg,#fbf7f3)] sm:p-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[hsl(36_70%_70%)]">{page.subscribe.eyebrow}</p>
                <h2 className="font-[family-name:var(--font-heading)] mt-3 text-3xl leading-tight sm:text-5xl">{page.subscribe.heading}</h2>
                <p className="mt-4 text-[var(--secondary-bg,#fbf7f3)]/75">{page.subscribe.text}</p>
                <a href={page.subscribe.ask_href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full border border-paper/40 px-6 text-sm font-semibold text-[var(--secondary-bg,#fbf7f3)] hover:bg-white/10">
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  {page.subscribe.ask_label}
                </a>
              </div>
              <div className="rounded-3xl bg-[var(--secondary-bg,#fbf7f3)] p-6 text-[var(--hero-bg,#1a2a52)] sm:p-8"><Subscribe /></div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}


export function DolphinkidsJournalList1({ data: incoming }: { data?: any }) {
  const data = mapThemeUploadAssetsInData(incoming || {});
  
  
  return (<><style dangerouslySetInnerHTML={{ __html: dolphinCss }} />{(() => { page = data; return <JournalList data={data} />; })()}</>);
}
(DolphinkidsJournalList1 as any).editorFields = ["kicker","heading","heading_em","heading_rest","tagline","lead","age_eyebrow","age_heading","category_eyebrow","category_heading","subscribe","categories","articles_label","age_groups","search_placeholder","all_label","latest_label","clear_label","empty_title","empty_text","prev_categories","next_categories","articles"];
export default DolphinkidsJournalList1;
