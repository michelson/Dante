export function getUrl(url: any, domain: any) {
  if (!url) return;
  if (url.includes('://')) return url;
  if (!domain) return url
  return `${domain}${url}`;
}