let cache: Record<string, string> = {};

export async function downloadTranslations() {
    // todo: get browser locale or fall back to en
    const response = await fetch(`i18n/en-us.json`);
    cache = await response.json();
}

export function translate(key: string, ...formatValues: string[]): string {
    let translation = cache[key] ?? key;

    {
        let i = 0;
        translation = translation.replace(/{}/g, () => formatValues[i++]);
    }

    translation = translation.replace(/&nbsp;/ig, '\u00A0');

    return translation;
} export const t = translate;
