
// Validates whether a URL is properly formatted, uses HTTP or HTTPS, and contains a hostname.
export function isValidHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value.trim());

    return (
      (parsed.protocol === "http:" || parsed.protocol === "https:") &&
      Boolean(parsed.hostname)
    );
  } catch {
    return false;
  }
}

// Extracts the website's hostname from a URL and removes the "www." prefix for cleaner display in the bookmark library.
export function getWebsiteName(url: URL): string {
  return url.hostname.replace(/^www\./, "");
}
