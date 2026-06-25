/**
 * RankingProvider abstraction so the rank source can be swapped without
 * touching application code: Apple public search/lookup -> third-party
 * ASO API -> internal compliant crawler.
 */

export interface RankLookupParams {
  appStoreId: string;
  term: string;
  countryCode: string;
}

export interface RankLookupResult {
  rank: number | null; // null = not found in scanned results (treat as "not ranking")
  provider: string;
  checkedAt: string;
}

export interface RankingProvider {
  id: string;
  lookupRank(params: RankLookupParams): Promise<RankLookupResult>;
}

/**
 * Provider 1: Apple's public search API (no auth required, rate-limited).
 * Stubbed here — wire up https://itunes.apple.com/search when ready.
 */
export class AppleSearchRankingProvider implements RankingProvider {
  id = "apple_lookup";

  async lookupRank(params: RankLookupParams): Promise<RankLookupResult> {
    throw new Error(
      `AppleSearchRankingProvider not yet implemented for "${params.term}" in ${params.countryCode}. ` +
        "Connect itunes.apple.com/search and parse result order to find appStoreId position."
    );
  }
}

/** Provider 2: pluggable third-party ASO API (e.g. AppFollow, AppTweak). */
export class ThirdPartyAsoRankingProvider implements RankingProvider {
  id = "third_party_aso_api";

  async lookupRank(params: RankLookupParams): Promise<RankLookupResult> {
    throw new Error(`ThirdPartyAsoRankingProvider not configured for "${params.term}".`);
  }
}

/** Provider 3: internal crawler respecting Apple's rate limits / ToS. */
export class InternalCrawlerRankingProvider implements RankingProvider {
  id = "internal_crawler";

  async lookupRank(params: RankLookupParams): Promise<RankLookupResult> {
    throw new Error(`InternalCrawlerRankingProvider not configured for "${params.term}".`);
  }
}

export function getActiveRankingProvider(): RankingProvider {
  const providerId = process.env.RANKING_PROVIDER ?? "apple_lookup";
  switch (providerId) {
    case "third_party_aso_api":
      return new ThirdPartyAsoRankingProvider();
    case "internal_crawler":
      return new InternalCrawlerRankingProvider();
    default:
      return new AppleSearchRankingProvider();
  }
}
