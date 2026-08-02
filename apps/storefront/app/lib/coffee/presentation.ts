export const ROAST_IDS = ['light', 'medium', 'dark', 'decaf'] as const;

export type RoastId = (typeof ROAST_IDS)[number];

export interface RoastPresentation {
  id: RoastId;
  shortName: string;
  tagline: string;
  origin: string;
  capColor: string;
  inkColor: string;
  sideLabel: string;
  subline: string;
  tintColor: string;
  primaryColor: string;
}

export interface ProductPresentation extends RoastPresentation {
  accentName: string;
  displayName: string;
  eyebrow: string;
}

export const ROAST_PRESENTATIONS = {
  light: {
    id: 'light',
    shortName: 'Light',
    tagline: 'Light roast. Bright, not aggressive.',
    origin: 'Huila, Colombia',
    capColor: '#d9a35f',
    inkColor: '#402310',
    sideLabel: 'morning',
    subline: 'ORGANIC COFFEE — LIGHT ROAST',
    tintColor: '#fff2eb',
    primaryColor: '#ffc6a5',
  },
  medium: {
    id: 'medium',
    shortName: 'Medium',
    tagline: 'Medium roast. The one most people want.',
    origin: 'Nariño, Colombia',
    capColor: '#c67139',
    inkColor: '#f9f4ed',
    sideLabel: 'hello',
    subline: 'ORGANIC COFFEE — MEDIUM ROAST',
    tintColor: '#ffe1d0',
    primaryColor: '#f6a06b',
  },
  dark: {
    id: 'dark',
    shortName: 'Dark',
    tagline: 'Dark roast. Strong. Not burnt.',
    origin: 'Sul de Minas, Brazil',
    capColor: '#2e2b25',
    inkColor: '#f9f4ed',
    sideLabel: 'strong.',
    subline: 'ORGANIC COFFEE — DARK ROAST',
    tintColor: '#eee7db',
    primaryColor: '#c0b6a5',
  },
  decaf: {
    id: 'decaf',
    shortName: 'Decaf',
    tagline: 'Decaf. Same coffee, later in the day.',
    origin: 'Chiapas, Mexico',
    capColor: '#8fa073',
    inkColor: '#272e1b',
    sideLabel: 'later',
    subline: 'ORGANIC COFFEE — DECAF',
    tintColor: '#e1eecc',
    primaryColor: '#aebf92',
  },
} satisfies Record<RoastId, RoastPresentation>;

export function getRoastPresentation({
  title,
  tags = [],
  fallback = 'medium',
}: {
  title: string;
  tags?: string[];
  fallback?: RoastId;
}): RoastPresentation {
  const searchable = `${title} ${tags.join(' ')}`.toLowerCase();
  const roastId = ROAST_IDS.find((candidate) => searchable.includes(candidate));

  return ROAST_PRESENTATIONS[roastId ?? fallback];
}

export function isBundleProduct(tags: string[]): boolean {
  return tags.some((tag) => tag.toLowerCase() === 'bundle');
}

export function getProductPresentation({
  title,
  tags = [],
  fallback = 'medium',
  tagline,
  tintColor,
  primaryColor,
}: {
  title: string;
  tags?: string[];
  fallback?: RoastId;
  tagline?: string | null;
  tintColor?: string | null;
  primaryColor?: string | null;
}): ProductPresentation {
  const fallbackPresentation = getRoastPresentation({title, tags, fallback});
  const isBundle = isBundleProduct(tags);

  return {
    ...fallbackPresentation,
    accentName: isBundle ? 'Bundle' : fallbackPresentation.shortName,
    displayName: isBundle ? title : fallbackPresentation.shortName,
    eyebrow: isBundle
      ? 'Organic coffee · Bundle'
      : `Organic coffee · ${fallbackPresentation.shortName} roast`,
    tagline: tagline ?? fallbackPresentation.tagline,
    tintColor: tintColor ?? fallbackPresentation.tintColor,
    primaryColor: primaryColor ?? fallbackPresentation.primaryColor,
  };
}
