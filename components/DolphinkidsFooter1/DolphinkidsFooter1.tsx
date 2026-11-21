'use client';

import { mapThemeUploadAssetsInData } from '../../../lib/dolphinkidsAssets';
import { Download, MapPin, MessageCircle, Phone } from 'lucide-react';


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

const FOOTER_TARGET: Record<string, { page: string; section?: string }> = {
  Home: { page: '#page-home' },
  Admissions: { page: '#page-home', section: 'admissions' },
  'Day Care': { page: '#page-day-care' },
  'Why Dolphin Kids': { page: '#page-home', section: 'why' },
  Learning: { page: '#page-home', section: 'learning' },
  Campus: { page: '#page-home', section: 'campus' },
  Franchise: { page: '#page-home', section: 'franchise' },
  Journal: { page: '#page-journal' },
  'About Us': { page: '#page-home', section: 'about' },
  'Admission Process': { page: '#page-home', section: 'process' },
  'Fees, hours & transport': { page: '#page-home', section: 'process' },
  'Senior School Tie-ups': { page: '#page-home', section: 'senior' },
};

function footerHref(link: { name?: string; href?: string }) {
  const target = FOOTER_TARGET[link.name || ''];
  if (!target) return link.href;
  if (target.section) return '#' + target.section;
  return target.page;
}

const DOLPHIN_WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=919310589888&text&type=phone_number&app_absent=0";

function Footer({ data }: { data: any }) {
  return (
    <footer id="contact" className="bg-[hsl(222_42%_94%)] text-[var(--hero-bg,#1a2a52)]" style={shellBackground(data, "footer")}>
      <div className="wave-rule opacity-60" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="inline-block rounded-xl bg-[var(--secondary-bg,#fbf7f3)] p-3">
            <img src={data.logo} alt={data.logo_alt} data-editor-media="true" data-editor-media-type="image" data-editor-media-role="logo" data-editor-media-src={data.logo} data-editor-media-overlay="show" className="h-auto w-[210px]" />
          </div>
          <p className="font-[family-name:var(--font-heading)] mt-6 text-2xl">{data.tagline}</p>
          <p className="mt-4 flex gap-2 text-[#3d4a66]">
            <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#db6a24]" />
            {data.address}
          </p>
        </div>
        <div>
          <p className="dk-eyebrow !text-[#db6a24]">{data.contact_title}</p>
          <ul className="mt-4 grid gap-2">
            <li>
              <a href={data.phone_href} className="inline-flex min-h-11 items-center gap-2">
                <Phone className="h-4 w-4" /> {data.phone_label} {data.phone}
              </a>
            </li>
            <li>
              <a href={data.whatsapp_href} className="inline-flex min-h-11 items-center gap-2">
                <MessageCircle className="h-4 w-4" /> {data.whatsapp_label} {data.whatsapp}
              </a>
            </li>
          </ul>
        </div>
        <nav aria-label="Footer">
          <p className="dk-eyebrow !text-[#db6a24]">{data.explore_title}</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4">
            {data.links.map((link) => (
              <li key={link.name}>
                <a href={footerHref(link)} className="inline-flex min-h-11 items-center">{link.name}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-[color-mix(in_srgb,var(--hero-bg,#1a2a52)_10%,transparent)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-6 text-xs text-[#3d4a66] md:flex-row md:items-center md:justify-between">
          <div className="max-w-4xl space-y-3">
            <p>{data.note}</p>
            <p>{data.disclaimer}</p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-1 md:items-end">
            {data.brochures.map((item) => (
              <a key={item.name} href={item.href} download className="inline-flex min-h-11 items-center gap-2 font-semibold text-[var(--primary-bg,#912e5a)]">
                <Download className="h-4 w-4 shrink-0" />
                {item.name}
              </a>
            ))}
            <button type="button" className="min-h-11 text-left underline underline-offset-4">{data.privacy_label}</button>
          </div>
        </div>
      </div>
      <a href={DOLPHIN_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="fixed bottom-24 right-4 z-[90] inline-flex items-center gap-2 rounded-full bg-[var(--primary-bg,#912e5a)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(145,46,90,0.8)] hover:bg-[color-mix(in_srgb,var(--primary-bg,#912e5a)_86%,black)]">
        <MessageCircle className="h-4 w-4" />
        WhatsApp our team
      </a>
    </footer>
  );
}


export function DolphinkidsFooter1({ data: incoming }: { data?: any }) {
  const data = mapThemeUploadAssetsInData(incoming || {});
  data.logo = data.logoImage || data.image || data.logo || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  
  return (<><style dangerouslySetInnerHTML={{ __html: dolphinCss }} /><Footer data={data} /></>);
}
(DolphinkidsFooter1 as any).editorFields = ["logo","logo_alt","tagline","address","contact_title","phone_label","phone","whatsapp_label","whatsapp","explore_title","links","note","disclaimer","brochures","privacy_label","logoImage","image"];
export default DolphinkidsFooter1;
