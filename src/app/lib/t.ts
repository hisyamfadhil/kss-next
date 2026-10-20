export function t(dict: Record<string, string>, label: string) {
  return dict[label] || label;
}
