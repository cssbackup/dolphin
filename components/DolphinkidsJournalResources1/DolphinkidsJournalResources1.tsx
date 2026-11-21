'use client';

import { mapThemeUploadAssetsInData } from '../../../lib/dolphinkidsAssets';
import Link from 'next/link';
import { Download, FileText } from 'lucide-react';


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




function ResourcesPage({ data }: { data: any }) {
  const page = data;
  const resources = page.resources;
  return (
    <>
      <div data-editor-section-label="Journal Nav" data-editor-fields="heading heading_em heading_rest journal_label nav" className="border-b border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-[var(--secondary-bg,#fbf7f3)]">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-5">
          <Link href="#page-journal" className="hidden shrink-0 py-3 font-[family-name:var(--font-heading)] text-lg italic sm:block">{page.heading} {page.heading_em} {page.heading_rest}</Link>
          <nav aria-label={page.journal_label} className="flex flex-1 gap-1 overflow-x-auto py-2 sm:justify-end">
            {page.nav.map((item) => (
              <Link key={item.label} href={item.href} className={"inline-flex min-h-10 shrink-0 items-center whitespace-nowrap rounded-full px-3.5 text-sm font-semibold hover:text-[var(--primary-bg,#912e5a)] " + (item.href === '#page-journal-resources' ? 'bg-[var(--hero-bg,#1a2a52)] text-[var(--secondary-bg,#fbf7f3)]' : '')}>{item.label}</Link>
            ))}
          </nav>
        </div>
      </div>
      <section data-editor-section-label="Guides" data-editor-fields="resources" className="mx-auto max-w-7xl px-5 py-14">
        <ul className="grid gap-5 md:grid-cols-2">
          {resources.items.map((item) => (
            <li key={item.title} className="flex flex-col rounded-3xl bg-white p-7 ring-1 ring-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)]">
              <FileText className="h-8 w-8 text-[#db6a24]" strokeWidth={1.4} aria-hidden />
              <h2 className="font-[family-name:var(--font-heading)] mt-4 text-2xl">{item.title}</h2>
              <p className="mt-2 flex-1 text-[#3d4a66]">{item.description}</p>
              <a href={item.href} download className="mt-6 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-[var(--primary-bg,#912e5a)] px-6 text-sm font-semibold text-[var(--secondary-bg,#fbf7f3)] hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_82%,black)]"><Download className="h-4 w-4" aria-hidden />{resources.download}</a>
            </li>
          ))}
        </ul>
      </section>
      <section id="workshops" data-editor-section-label="Workshops" data-editor-fields="resources" className="scroll-mt-40 border-t border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5">
          <p className="dk-eyebrow">{resources.workshop_eyebrow}</p>
          <h2 className="font-[family-name:var(--font-heading)] mt-3 text-3xl leading-tight sm:text-5xl">{resources.workshop_heading}</h2>
          <p className="mt-4 text-lg text-[#3d4a66]">{resources.workshop_text}</p>
          <Link href={resources.workshop_href} className="mt-6 inline-flex min-h-12 items-center rounded-full bg-[var(--hero-bg,#1a2a52)] px-6 text-sm font-semibold text-[var(--secondary-bg,#fbf7f3)]">{resources.workshop_button}</Link>
        </div>
      </section>
    </>
  );
}


export function DolphinkidsJournalResources1({ data: incoming }: { data?: any }) {
  const data = mapThemeUploadAssetsInData(incoming || {});
  
  
  return (<><style dangerouslySetInnerHTML={{ __html: dolphinCss }} /><ResourcesPage data={data} /></>);
}
(DolphinkidsJournalResources1 as any).editorFields = ["heading","heading_em","heading_rest","resources","journal_label","nav"];
export default DolphinkidsJournalResources1;
