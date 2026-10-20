export function getInitialKeyword(searchParams: URLSearchParams) {
  const param = searchParams.get("search");
  return param ? decodeURIComponent(param) : "";
}
