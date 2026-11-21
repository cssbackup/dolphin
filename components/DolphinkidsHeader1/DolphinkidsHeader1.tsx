'use client';

import { mapThemeUploadAssetsInData } from '../../../lib/dolphinkidsAssets';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Download, Lock, Menu, Phone, Play, X } from 'lucide-react';


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




function shellBackground(data: any, kind: "header" | "footer") {
  const type = data?.[kind + "BackgroundType"];
  const solid = data?.[kind + "BackgroundColor"];
  const gradient = data?.[kind + "GradientColor"] || data?.[kind + "BackgroundGradient"];
  const fallbackSolid = kind === "header" ? "#fbf7f3" : "#e8eef6";
  const fallbackGradient = "#912e5a";
  if (type === "gradient") {
    return { background: "linear-gradient(90deg, " + (solid || fallbackSolid) + ", " + (gradient || fallbackGradient) + ")" };
  }
  if (type === "solid") return { background: solid || fallbackSolid };
  if (typeof gradient === "string" && gradient.trim()) return { background: gradient };
  return undefined;
}

function Header({ data }: { data: any }) {
  const [open, setOpen] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const [note, setNote] = useState<any | null>(null);
  const [login, setLogin] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const closeT = useRef<number | undefined>(undefined);

  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(null);
    };
    const click = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setOpen(null);
    };
    window.addEventListener('keydown', key);
    document.addEventListener('mousedown', click);
    return () => {
      window.removeEventListener('keydown', key);
      document.removeEventListener('mousedown', click);
    };
  }, []);

  const openMenu = () => {
    setMobile(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setDrawer(true)));
  };
  const closeMenu = () => {
    setDrawer(false);
    window.setTimeout(() => setMobile(false), 320);
  };

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobile]);

  const act = (item: any) => {
    setOpen(null);
    closeMenu();
    if (item.note) setNote(item);
  };

  const itemClass = 'min-h-11 min-w-0 whitespace-normal break-words rounded-md px-2 py-2.5 text-left text-[15px] leading-relaxed text-[var(--hero-bg,#1a2a52)] hover:bg-[var(--primary-bg,#912e5a)]/8 hover:text-[var(--primary-bg,#912e5a)]';

  const renderItem = (item: any, index: number) =>
    item.href ? (
      <a key={(item.name) + "-" + (index)} href={item.href} onClick={() => act(item)} className={itemClass}>{item.name}</a>
    ) : (
      <button key={(item.name) + "-" + (index)} type="button" onClick={() => act(item)} className={(itemClass) + " text-left"}>
        {item.name} <span className="ml-1 text-xs text-[#a34e22]">{data.coming_soon}</span>
      </button>
    );

  return (
    <>
      <div className="bg-[#eef2f8] text-[var(--hero-bg,#1a2a52)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2 text-[11px] sm:text-sm">
          <a href={data.banner_href} className="font-semibold tracking-[0.08em] sm:tracking-[0.14em]">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#db6a24]" />
            {data.banner}
          </a>
          <div className="hidden items-center gap-5 lg:flex">
            {data.utility.map((item) => (
              <a key={item.name} href={item.href} className="text-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_72%,white)] hover:text-[var(--hero-bg,#1a2a52)]">{item.name}</a>
            ))}
            <button type="button" onClick={() => setLogin(true)} className="inline-flex items-center gap-1 text-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_72%,white)] hover:text-[var(--hero-bg,#1a2a52)]">
              <Lock className="h-3.5 w-3.5" /> {data.login_text}
            </button>
            <a href={data.phone_href} className="font-semibold text-[#db6a24]">{data.phone}</a>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-50 border-b border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-[var(--secondary-bg,#fbf7f3)]" style={shellBackground(data, "header")}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3">
          <a href={data.logo_href} className="shrink-0"><img src={data.logo} alt={data.logo_alt} data-editor-media="true" data-editor-media-type="image" data-editor-media-role="logo" data-editor-media-src={data.logo} data-editor-media-overlay="show" className="h-auto w-[min(190px,52vw)] sm:w-[230px] xl:w-[200px]" /></a>
          <nav ref={navRef} aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {data.nav.map((group, index) => (
                <li
                  key={group.name}
                  className="relative"
                  onMouseEnter={() => {
                    window.clearTimeout(closeT.current);
                    if (group.items.length) setOpen(index);
                  }}
                  onMouseLeave={() => {
                    closeT.current = window.setTimeout(() => setOpen(null), 160);
                  }}
                >
                  {group.items.length === 0 ? (
                    <a href={group.href} className="nav-link block whitespace-nowrap rounded-full px-2 py-3 text-xs font-semibold tracking-[0.04em] text-[var(--hero-bg,#1a2a52)] hover:text-[var(--primary-bg,#912e5a)]">{group.name.toUpperCase()}</a>
                  ) : (
                    <button
                      type="button"
                      aria-expanded={open === index}
                      onClick={() => setOpen(open === index ? null : index)}
                      className={"nav-link flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-3 text-xs font-semibold tracking-[0.04em] " + (open === index ? 'is-open text-[var(--primary-bg,#912e5a)]' : 'text-[var(--hero-bg,#1a2a52)] hover:text-[var(--primary-bg,#912e5a)]')}
                    >
                      {group.name.toUpperCase()}
                      <ChevronDown className={"h-3.5 w-3.5 transition-transform " + (open === index ? 'rotate-180' : '')} />
                    </button>
                  )}
                  {open === index && group.items.length > 0 && (
                    <div className={"absolute top-full z-50 mt-2 text-left " + (index > 2 ? 'right-0' : 'left-0')}>
                      <div className="grid max-h-[min(70dvh,650px)] w-[min(640px,calc(100vw-2rem))] grid-cols-[170px_minmax(0,1fr)] gap-6 overflow-y-auto rounded-2xl border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] bg-[var(--secondary-bg,#fbf7f3)] p-6 shadow-[0_18px_40px_-24px_rgba(40,52,96,0.28)]">
                        <div className="min-w-0 border-r border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] pr-5">
                          <p className="font-[family-name:var(--font-heading)] text-2xl text-[var(--hero-bg,#1a2a52)]">{group.name}</p>
                          <p className="mt-2 text-sm font-normal tracking-normal text-[#3d4a66]">{group.blurb}</p>
                          <a href={group.href} onClick={() => setOpen(null)} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold tracking-normal text-[var(--primary-bg,#912e5a)]">
                            {data.overview_label} <ArrowUpRight className="h-4 w-4" />
                          </a>
                        </div>
                        <div className="grid min-w-0 grid-cols-2 content-start gap-x-4 gap-y-1">
                          {group.items.map(renderItem)}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <a href={data.button_href} suppressHydrationWarning className="hidden min-h-11 shrink-0 items-center whitespace-nowrap rounded-full bg-[var(--primary-bg,#912e5a)] px-5 text-sm font-semibold text-[var(--secondary-bg,#fbf7f3)] hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_82%,black)] md:inline-flex">{data.button_text}</a>
            <button type="button" className="grid h-12 w-12 place-items-center rounded-full border border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_15%,transparent)] bg-[var(--secondary-bg,#fbf7f3)] xl:hidden" aria-label={data.open_menu} onClick={openMenu}>
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="border-t border-[color-mix(in_srgb,var(--primary-bg,#912e5a)_10%,transparent)] bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)]">
          <nav className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 sm:justify-center sm:gap-4 sm:px-5">
            <a href={data.promo_href} className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl px-2 font-sans text-sm font-semibold text-[var(--hero-bg,#1a2a52)] hover:text-[var(--primary-bg,#912e5a)] sm:px-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--hero-bg,#1a2a52)] text-[var(--secondary-bg,#fbf7f3)]"><Play className="ml-0.5 h-3.5 w-3.5" fill="currentColor" /></span>
              <span className="hidden whitespace-nowrap font-sans text-sm font-semibold md:inline">{data.promo_text}</span>
            </a>
            <a href={data.admission_brochure} download suppressHydrationWarning className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--primary-bg,#912e5a)] px-4 text-xs font-bold text-[var(--secondary-bg,#fbf7f3)] sm:px-6 sm:text-sm">
              <Download className="h-4 w-4" />{data.admission_brochure_text}
            </a>
            <a href={data.franchise_brochure} download className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--primary-bg,#912e5a)]/25 bg-[var(--secondary-bg,#fbf7f3)] px-4 text-xs font-bold text-[var(--primary-bg,#912e5a)] sm:px-6 sm:text-sm">
              <Download className="h-4 w-4" />{data.franchise_brochure_text}
            </a>
          </nav>
        </div>
      </header>
      {mobile && (
        <div className={"fixed inset-0 z-[70] bg-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_45%,transparent)] transition-opacity duration-300 xl:hidden " + (drawer ? 'opacity-100' : 'opacity-0')} onClick={closeMenu}>
          <div className={"ml-auto flex h-full w-full max-w-md flex-col bg-[var(--secondary-bg,#fbf7f3)] text-[var(--hero-bg,#1a2a52)] shadow-2xl transition-transform duration-300 ease-out " + (drawer ? 'translate-x-0' : 'translate-x-full')} onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] px-5 py-3">
              <p className="font-[family-name:var(--font-heading)] text-xl">{data.menu_label}</p>
              <button type="button" className="grid h-12 w-12 place-items-center rounded-full hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)]" aria-label={data.close_menu} onClick={closeMenu}><X className="h-5 w-5" /></button>
            </div>
            <nav className="min-h-0 flex-1 overflow-y-auto px-5 py-3">
              {data.nav.map((group) => group.items.length === 0 ? (
                <a key={group.name} href={group.href} onClick={closeMenu} className="block border-b border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] py-4 text-lg font-semibold">{group.name}</a>
              ) : (
                <div key={group.name} className="border-b border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)]">
                  <button type="button" aria-expanded={section === group.name} onClick={() => setSection(section === group.name ? null : group.name)} className="flex min-h-14 w-full items-center justify-between py-3 text-left text-lg font-semibold">
                    {group.name}
                    <ChevronDown className={"h-5 w-5 transition-transform duration-300 " + (section === group.name ? 'rotate-180' : '')} />
                  </button>
                  <div className={"grid transition-[grid-template-rows] duration-300 ease-out " + (section === group.name ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                    <div className="overflow-hidden">
                      <div className="grid pb-3">
                        {group.items.map((item, index) => (
                          item.href ? (
                            <a key={(item.name) + "-" + (index)} href={item.href} onClick={closeMenu} className="rounded-lg py-3 pl-3 text-base hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)] hover:text-[var(--primary-bg,#912e5a)]">{item.name}</a>
                          ) : (
                            <button key={(item.name) + "-" + (index)} type="button" onClick={() => act(item)} className="rounded-lg py-3 pl-3 text-left text-base hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_8%,white)]">{item.name} <span className="text-xs text-[#a34e22]">{data.coming_soon}</span></button>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </nav>
            <div className="grid gap-2 border-t border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)] p-4">
              <a href={data.phone_href} className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--hero-bg,#1a2a52)] font-semibold text-[var(--secondary-bg,#fbf7f3)]"><Phone className="h-4 w-4" /> {data.call_label} {data.phone}</a>
              <a href={data.button_href} onClick={closeMenu} className="flex min-h-12 items-center justify-center rounded-full bg-[var(--primary-bg,#912e5a)] font-semibold text-[var(--secondary-bg,#fbf7f3)]">{data.button_text}</a>
            </div>
          </div>
        </div>
      )}
      {note && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-[var(--hero-bg,#1a2a52)]/40 p-5" onClick={() => setNote(null)}>
          <div className="max-w-md rounded-2xl bg-[var(--secondary-bg,#fbf7f3)] p-6 text-[var(--hero-bg,#1a2a52)]" onClick={(event) => event.stopPropagation()}>
            <p className="dk-eyebrow">{data.phase_title}</p>
            <h3 className="font-[family-name:var(--font-heading)] mt-3 text-2xl">{note.name}</h3>
            <p className="mt-3 text-[#3d4a66]">{note.note}</p>
            <button type="button" className="mt-5 rounded-full bg-[var(--primary-bg,#912e5a)] px-5 py-2 text-sm font-semibold text-[var(--secondary-bg,#fbf7f3)]" onClick={() => setNote(null)}>{data.close_label}</button>
          </div>
        </div>
      )}
      {login && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-[var(--hero-bg,#1a2a52)]/40 p-5" onClick={() => setLogin(false)}>
          <div className="max-w-md rounded-2xl bg-[var(--secondary-bg,#fbf7f3)] p-6 text-[var(--hero-bg,#1a2a52)]" onClick={(event) => event.stopPropagation()}>
            <p className="dk-eyebrow">{data.login_text}</p>
            <h3 className="font-[family-name:var(--font-heading)] mt-3 text-2xl">{data.login_title}</h3>
            <p className="mt-3 text-[#3d4a66]">{data.login_body}</p>
            <button type="button" className="mt-5 rounded-full bg-[var(--primary-bg,#912e5a)] px-5 py-2 text-sm font-semibold text-[var(--secondary-bg,#fbf7f3)]" onClick={() => setLogin(false)}>{data.close_label}</button>
          </div>
        </div>
      )}
    </>
  );
}


export function DolphinkidsHeader1({ data: incoming }: { data?: any }) {
  const data = mapThemeUploadAssetsInData(incoming || {});
  data.logo = data.logoImage || data.image || data.logo || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  data.button_text = data.ctaText || data.button_text; data.button_href = data.ctaUrl || data.button_href;
  return (<><style dangerouslySetInnerHTML={{ __html: dolphinCss }} /><Header data={data} /></>);
}
(DolphinkidsHeader1 as any).editorFields = ["banner","logo","logo_alt","login_text","coming_soon","phase_title","close_label","menu_label","open_menu","close_menu","overview_label","login_title","login_body","phone","call_label","button_text","promo_text","admission_brochure","admission_brochure_text","franchise_brochure","franchise_brochure_text","logoImage","image"];
export default DolphinkidsHeader1;
