'use client';

import { mapThemeUploadAssetsInData } from '../../../lib/dolphinkidsAssets';

export function DolphinkidsBreadcrumb1({ data: incoming }: { data?: any }) {
  const data = mapThemeUploadAssetsInData(incoming || {});
  const title = data.title || data.label || 'Page';
  return (
    <section className="bg-[hsl(222_42%_94%)]">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-8">
        <p className="text-sm text-[#3d4a66]">
          <a href="#page-home" className="hover:text-[var(--primary-bg,#912e5a)]">Home</a>
          <span className="mx-2 text-[#db6a24]">/</span>
          <span>{title}</span>
        </p>
        <h1 className="mt-6 max-w-3xl font-[family-name:var(--font-heading)] text-[clamp(2.2rem,6vw,4rem)] leading-[1.05] text-[var(--hero-bg,#1a2a52)]">{title}</h1>
      </div>
    </section>
  );
}
(DolphinkidsBreadcrumb1 as any).editorFields = ["title"];
export default DolphinkidsBreadcrumb1;
