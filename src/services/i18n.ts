let cache: Record<string, string> = {};

export async function downloadTranslations() {
    // todo: get browser locale or fall back to en
    const response = await fetch(`i18n/en-us.json`);
    cache = await response.json();
}

export function translate(key: string): string {
    const args = Array.from(arguments);
    let translation = cache[key] ?? key;

    {
        let i = 1;
        translation = translation.replace(/{}/g, () => args[i++]);
    }

    translation = translation.replace(/&nbsp;/ig, '\u00A0');

    return translation;
} export const t = translate;
