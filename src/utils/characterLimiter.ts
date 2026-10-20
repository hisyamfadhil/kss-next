export function characterLimiter(text: string, limit: number, end = ".."): string {
  if (!text) return "";
  return text.length > limit ? text.substring(0, limit) + end : text;
}