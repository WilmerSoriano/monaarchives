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

export function getWebsiteName(url: URL): string {
  return url.hostname.replace(/^www\./, "");
}