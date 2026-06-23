/** Apple public iTunes lookup/search — no auth required. */

export interface AppleLookupResult {
  appStoreId: string;
  bundleId: string;
  name: string;
  developerName: string;
  category: string;
  iconUrl: string;
  description: string;
  ratingAverage: number | null;
  ratingCount: number | null;
  currentVersion: string;
  releaseNotes: string;
  price: number;
  storeUrl: string;
  supportedLangs: string[];
  screenshotUrls: string[];
}

export function extractAppStoreId(input: string): string | null {
  const trimmed = input.trim();
  if (/^\d+$/.test(trimmed)) return trimmed;
  const match = trimmed.match(/id(\d{6,})/);
  return match ? match[1] : null;
}

export async function lookupAppleApp(
  appStoreId: string,
  country = "us"
): Promise<AppleLookupResult> {
  const url = `https://itunes.apple.com/lookup?id=${encodeURIComponent(
    appStoreId
  )}&country=${encodeURIComponent(country)}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Apple lookup failed with status ${res.status}`);
  }
  const json = await res.json();
  const result = json?.results?.[0];
  if (!result) {
    throw new Error(`No app found for App Store ID ${appStoreId}`);
  }

  return {
    appStoreId: String(result.trackId),
    bundleId: result.bundleId ?? "",
    name: result.trackName ?? "",
    developerName: result.artistName ?? "",
    category: result.primaryGenreName ?? "",
    iconUrl: result.artworkUrl512 ?? result.artworkUrl100 ?? "",
    description: result.description ?? "",
    ratingAverage: result.averageUserRating ?? null,
    ratingCount: result.userRatingCount ?? null,
    currentVersion: result.version ?? "",
    releaseNotes: result.releaseNotes ?? "",
    price: result.price ?? 0,
    storeUrl: result.trackViewUrl ?? "",
    supportedLangs: result.languageCodesISO2A ?? [],
    screenshotUrls: result.screenshotUrls ?? [],
  };
}
