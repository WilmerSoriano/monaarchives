
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

// Extracts ONLY the main website name between the first and second dots in the hostname.
export function getWebsiteName(url: URL): string {
  const hostname = url.hostname.replace(/^www\./, "");
  const parts = hostname.split(".");

  return parts.length > 1 ? parts[0] : hostname;
}
