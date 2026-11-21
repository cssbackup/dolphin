const THEME_KEY = 'dolphinkids-20261118163700';

export function themeUploadAsset(relative: string) {
  const clean = relative.replace(/^\//, '');
  return `http://localhost:4000/uploads/themes/${THEME_KEY}/${clean}`;
}

export function mapThemeUploadAssetsInData<T>(data: T): T {
  const walk = (value: unknown): unknown => {
    if (typeof value === 'string') {
      if (value.startsWith('/media/')) return themeUploadAsset('assets/images/' + value.slice('/media/'.length));
      if (value.startsWith('/images/')) return themeUploadAsset('assets/images/' + value.slice('/images/'.length));
      if (value.startsWith('/downloads/')) return themeUploadAsset('assets/downloads/' + value.slice('/downloads/'.length));
      if (value.startsWith('/logo/')) return themeUploadAsset('assets/logo/' + value.slice('/logo/'.length));
      const match = value.match(/^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?\/uploads\/themes\/([^/]+)\/assets\/(.+)$/i);
      if (match) return themeUploadAsset('assets/' + match[2]);
      return value;
    }
    if (Array.isArray(value)) return value.map(walk);
    if (value && typeof value === 'object') {
      return Object.fromEntries(Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, walk(v)]));
    }
    return value;
  };
  return walk(data) as T;
}
