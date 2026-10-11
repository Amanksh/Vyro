export const SOURCE = "https://www.swayhouse.in";

export function hrefFor(path: string) {
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:")
  ) {
    return path;
  }
  if (path.startsWith("/") || path.startsWith("#")) return path;
  return `/${path}`;
}

export function opensNewTab(href: string) {
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  if (!href.startsWith("http")) return false;
  try {
    const url = new URL(href);
    return url.hostname !== "vyroinfluence.in" && url.hostname !== "vyroinfluence.in";
  } catch {
    return true;
  }
}
