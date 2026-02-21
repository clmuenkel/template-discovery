export interface LinkedInData {
  profileUrl?: string;
  university?: string;
  degree?: string;
  previousCompanies?: string[];
  yearsInBusiness?: number;
  interests?: string[];
  funFact?: string;
}

export interface ThemeConfig {
  /** Primary accent color hex (default: "#0A7AFF" EVIOS blue) */
  accent: string;
  /** Lighter variant of accent (default: "#3D9AFF") */
  accentLight: string;
  /** Darker variant of accent (default: "#0860CC") */
  accentDark: string;
  /** Optional watermark image URL shown faintly in the Hero background */
  watermarkUrl?: string;
  /** Easter egg text shown in the DiscoveryIntro section */
  easterEggIntro?: string;
  /** Easter egg text shown in the Closing section */
  easterEggClosing?: string;
  /** Short theme label for internal reference (e.g. "star-wars", "ut-austin") */
  themeLabel?: string;
}

export interface ProspectConfig {
  slug: string;
  companyName: string;
  contactFirstName: string;
  contactLastName: string;
  contactTitle: string;
  logoUrl: string;
  industry: string;
  linkedin: LinkedInData;
  callNotes?: string;
  painPoints?: string[];
  suggestedSolutions?: string[];
  /** Theme customization — colors, watermarks, easter eggs */
  theme?: Partial<ThemeConfig>;
}

export const DEFAULT_THEME: ThemeConfig = {
  accent: "#0A7AFF",
  accentLight: "#3D9AFF",
  accentDark: "#0860CC",
};

/** Convert hex "#0A7AFF" to "10, 122, 255" for use in rgba() */
export function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}
