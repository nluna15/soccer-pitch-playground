const REGIONAL_INDICATOR_OFFSET = 0x1f1a5;

export function flagEmoji(countryCode: string | undefined): string {
  if (!countryCode) return '';
  const code = countryCode.trim().toUpperCase();
  if (code.length !== 2) return '';
  if (!/^[A-Z]{2}$/.test(code)) return '';
  return String.fromCodePoint(
    code.charCodeAt(0) + REGIONAL_INDICATOR_OFFSET,
    code.charCodeAt(1) + REGIONAL_INDICATOR_OFFSET,
  );
}
