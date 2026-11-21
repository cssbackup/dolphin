'use client';

import { mapThemeUploadAssetsInData } from '../../../lib/dolphinkidsAssets';
import { type ReactNode, useState } from 'react';
import Link from 'next/link';
import { Check, Link2, MessageCircle, Share2 } from 'lucide-react';


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



function Mark({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="currentColor">
      <path d={d} />
    </svg>
  );
}

const WhatsApp = () => <Mark d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />;
const Facebook = () => <Mark d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073" />;
const X = () => <Mark d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />;
const LinkedIn = () => <Mark d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.06h4.56V24H.22V8.06zM8.34 8.06h4.37v2.18h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.48 3.04 5.48 7V24h-4.56v-7.22c0-1.72-.03-3.94-2.4-3.94-2.4 0-2.77 1.87-2.77 3.81V24H8.34V8.06z" />;

const icon: Record<string, ReactNode> = { WhatsApp: <WhatsApp />, Facebook: <Facebook />, X: <X />, LinkedIn: <LinkedIn /> };

function ShareBar({ url, title, copyLabel, copiedLabel, button, aria, shareOn, links }: { url: string; title: string; copyLabel: string; copiedLabel: string; button: string; aria: string; shareOn: string; links: { label: string; href: string }[] }) {
  const [copied, setCopied] = useState(false);
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);
  const items = links.map((item) => ({ ...item, href: item.href.replaceAll('{url}', encoded).replaceAll('{text}', text) }));

  return (
    <div className="flex max-w-[220px] flex-wrap items-center gap-2" aria-label={aria}>
      <button type="button" onClick={() => navigator.share?.({ title, url }).catch(() => undefined)} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--hero-bg,#1a2a52)] px-4 text-sm font-semibold text-[var(--secondary-bg,#fbf7f3)]">
        <Share2 className="h-4 w-4" aria-hidden />{button}
      </button>
      {items.map((item) => (
        <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={(shareOn) + " " + (item.label)} className="grid h-11 w-11 place-items-center rounded-full border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_15%,transparent)] text-[var(--hero-bg,#1a2a52)] hover:border-[var(--primary-bg,#912e5a)] hover:text-[var(--primary-bg,#912e5a)]">
          {icon[item.label]}
        </a>
      ))}
      <button
        type="button"
        onClick={() => navigator.clipboard?.writeText(url).then(() => { setCopied(true); window.setTimeout(() => setCopied(false), 2000); })}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_15%,transparent)] px-4 text-sm font-semibold text-[var(--hero-bg,#1a2a52)] hover:border-[var(--primary-bg,#912e5a)]"
      >
        {copied ? <Check className="h-4 w-4" aria-hidden /> : <Link2 className="h-4 w-4" aria-hidden />}
        {copied ? copiedLabel : copyLabel}
      </button>
    </div>
  );
}







function ArticlePage({ data }: { data: any }) {
  const page = data;
  const article = (page.articles || [])[0];
  if (!article) return null;
  const related = page.articles.filter((item) => item.slug !== article.slug && item.category === article.category).slice(0, 3);
  const minutes = Math.max(3, Math.ceil(article.paragraphs.join(' ').split(/\s+/).length / 180));
  const url = '#page-journal-article';

  return (
    <>
      <div data-editor-section-label="Journal Nav" data-editor-fields="heading heading_em heading_rest journal_label nav" className="border-b border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-[var(--secondary-bg,#fbf7f3)]">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-5">
          <Link href="#page-journal" className="hidden shrink-0 py-3 font-[family-name:var(--font-heading)] text-lg italic sm:block">{page.heading} {page.heading_em} {page.heading_rest}</Link>
          <nav aria-label={page.journal_label} className="flex flex-1 gap-1 overflow-x-auto py-2 sm:justify-end">
            {page.nav.map((item) => (
              <Link key={item.label} href={item.href} className="inline-flex min-h-10 shrink-0 items-center whitespace-nowrap rounded-full px-3.5 text-sm font-semibold hover:text-[var(--primary-bg,#912e5a)]">{item.label}</Link>
            ))}
          </nav>
        </div>
      </div>
      <article data-editor-section-label="Article" data-editor-fields="articles author_name read_suffix written_by author_bio disclaimer">
        <header className="mx-auto max-w-4xl px-5 pt-8 text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-[clamp(2.1rem,6.5vw,4.2rem)] leading-[1.04]">{article.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#3d4a66] sm:text-xl">{article.excerpt}</p>
          <p className="mt-6 flex flex-wrap items-center justify-center gap-x-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#3d4a66]">
            <span>{page.author_name}</span>
            <span className="text-[#db6a24]">/</span>
            <span>{minutes} {page.read_suffix}</span>
          </p>
        </header>
        <figure className="mx-auto mt-10 max-w-6xl px-5">
          <img src={article.image} alt={article.image_alt} className="aspect-[16/9] w-full rounded-[2rem] object-cover sm:aspect-[21/9]" />
          <figcaption className="mt-3 text-center text-xs text-[#3d4a66]">{article.image_alt}</figcaption>
        </figure>
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[200px_minmax(0,1fr)_200px]">
          <aside className="hidden lg:block">
            <div className="sticky top-40 space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#db6a24]">{page.share_label}</p>
              <ShareBar url={url} title={article.title} copyLabel={page.copy_label} copiedLabel={page.copied_label} button={page.share_button} aria={page.share_aria} shareOn={page.share_on} links={page.shares} />
            </div>
          </aside>
          <div className="mx-auto w-full max-w-[68ch]">
            <div className="journal-prose dropcap">
              {article.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <p className="mt-8 rounded-2xl bg-[#eef2f8] p-5 text-sm text-[#3d4a66]">{page.disclaimer}</p>
            <section className="mt-10 flex gap-5 border-y border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] py-8" aria-label={page.written_by}>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[var(--hero-bg,#1a2a52)] font-[family-name:var(--font-heading)] text-xl text-[var(--secondary-bg,#fbf7f3)]">{page.author_initials}</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#db6a24]">{page.written_by}</p>
                <p className="font-[family-name:var(--font-heading)] mt-1 text-xl">{page.author_name}</p>
                <p className="mt-2 text-sm text-[#3d4a66]">{page.author_bio}</p>
              </div>
            </section>
            <div className="mt-8 lg:hidden">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#db6a24]">{page.share_label}</p>
              <ShareBar url={url} title={article.title} copyLabel={page.copy_label} copiedLabel={page.copied_label} button={page.share_button} aria={page.share_aria} shareOn={page.share_on} links={page.shares} />
            </div>
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-40 rounded-2xl bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)] p-5">
              <p className="font-[family-name:var(--font-heading)] text-lg leading-snug">{page.sidebar_title}</p>
              <Link href={page.programmes_href} className="mt-3 inline-flex min-h-10 items-center text-sm font-semibold text-[var(--primary-bg,#912e5a)] underline underline-offset-4">{page.programmes_label}</Link>
              <Link href={page.daycare_href} className="inline-flex min-h-10 items-center text-sm font-semibold text-[var(--primary-bg,#912e5a)] underline underline-offset-4">{page.daycare_label}</Link>
            </div>
          </aside>
        </div>
      </article>
      {related.length ? (
        <section className="border-t border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-white/50 py-16">
          <div className="mx-auto max-w-7xl px-5">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl">{page.related_label}</h2>
            <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <article key={item.slug} className="group">
                  <Link href="#page-journal-article" className="block">
                    <img src={item.image} alt={item.image_alt} className="aspect-[4/3] w-full rounded-[1.5rem] object-cover transition-transform duration-700 group-hover:scale-[1.01]" />
                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary-bg,#912e5a)]">{item.category}</p>
                    <h3 className="font-[family-name:var(--font-heading)] mt-2 text-2xl leading-[1.12] group-hover:text-[var(--primary-bg,#912e5a)]">{item.title}</h3>
                    <p className="mt-3 line-clamp-3 text-[#3d4a66]">{item.excerpt}</p>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <section className="px-5 py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 rounded-[2rem] bg-[var(--hero-bg,#1a2a52)] p-8 text-[var(--secondary-bg,#fbf7f3)] sm:flex-row sm:items-center sm:p-12">
          <div>
            <p className="font-[family-name:var(--font-heading)] text-3xl">{page.visit_title}</p>
            <p className="mt-2 text-[var(--secondary-bg,#fbf7f3)]/75">{page.visit_text}</p>
          </div>
          <a href={page.visit_href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-paper/40 px-6 text-sm font-semibold text-[var(--secondary-bg,#fbf7f3)] hover:bg-white/10">
            <MessageCircle className="h-4 w-4" aria-hidden />
            {page.visit_button}
          </a>
        </div>
      </section>
    </>
  );
}


export function DolphinkidsJournalArticle1({ data: incoming }: { data?: any }) {
  const data = mapThemeUploadAssetsInData(incoming || {});
  
  
  return (<><style dangerouslySetInnerHTML={{ __html: dolphinCss }} /><ArticlePage data={data} /></>);
}
(DolphinkidsJournalArticle1 as any).editorFields = ["heading","heading_em","heading_rest","related_label","share_label","share_button","share_aria","share_on","read_suffix","author_initials","journal_label","shares","copy_label","copied_label","written_by","author_name","author_bio","disclaimer","sidebar_title","programmes_label","daycare_label","visit_title","visit_text","visit_button","nav","articles"];
export default DolphinkidsJournalArticle1;
