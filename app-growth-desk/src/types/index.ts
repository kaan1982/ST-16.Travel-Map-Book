export type KeywordIntent = "HIGH_INTENT" | "BROAD" | "COMPETITOR" | "BRANDED" | "PROBLEM";
export type KeywordStatus = "WINNING" | "FALLING" | "OPPORTUNITY" | "NOT_RANKING";

export interface CountryOption {
  code: string;
  name: string;
  flag: string;
}

export interface LocaleOption {
  code: string;
  name: string;
}

export interface AppSummary {
  id: string;
  appStoreId: string;
  bundleId: string;
  name: string;
  developerName: string;
  category: string;
  iconUrl: string;
  ratingAverage: number | null;
  ratingCount: number | null;
  currentVersion: string;
  price: number;
  storeUrl: string;
  isOwned: boolean;
  trackedKeywords: number;
  top10Keywords: number;
  metadataNeedsUpdate: boolean;
}

export interface AppLocaleMetadata {
  localeCode: string;
  title: string | null;
  subtitle: string | null;
  promotionalText: string | null;
  keywordsField: string | null;
  description: string | null;
  releaseNotes: string | null;
  supportUrl: string | null;
  marketingUrl: string | null;
  privacyUrl: string | null;
  screenshotUrls: string[];
}

export interface KeywordRow {
  id: string;
  appId: string;
  term: string;
  countryCode: string;
  localeCode: string;
  currentRank: number | null;
  previousRank: number | null;
  bestRank: number | null;
  difficultyScore: number;
  volumeScore: number;
  intent: KeywordIntent;
  cluster: string | null;
  status: KeywordStatus;
  lastCheckedAt: string;
  history: { date: string; rank: number | null }[];
}

export interface CompetitorApp {
  id: string;
  appStoreId: string;
  name: string;
  subtitle: string;
  iconUrl: string;
  category: string;
  ratingAverage: number;
  ratingCount: number;
  sharedKeywords: number;
  betterRankCount: number;
  missedKeywords: number;
}

export interface AIAuditResult {
  asoScore: number;
  metadataScore: number;
  keywordOpportunityScore: number;
  conversionRiskScore: number;
  screenshotScore: number;
  localizationScore: number;
  competitorPressureScore: number;
  diagnosis: string;
  keywordOpportunity: string[];
  metadataRewrite: {
    title: string;
    subtitle: string;
  };
  keywordField: string;
  countryNotes: string;
  competitorInsight: string;
  appleAdsExactMatchList: string[];
  whatNotToDo: string[];
  sevenDayPlan: string[];
  thirtyDayPlan: string[];
}

export interface AlertItem {
  id: string;
  type: "RANK_DROP" | "RANK_GAIN" | "COMPETITOR_CHANGE" | "KEYWORD_OPPORTUNITY" | "METADATA_WARNING";
  message: string;
  appId: string;
  createdAt: string;
}
