let cache: Record<string, string> = {};

export async function downloadTranslations() {
    // todo: get browser locale or fall back to en
    const response = await fetch(`i18n/en-us.json`);
    cache = await response.json();
}

export function translate(key: string): string {
    return cache[key] ?? key;
} export const t = translate;
