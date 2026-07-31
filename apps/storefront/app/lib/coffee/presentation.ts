export const ROAST_IDS = ['light', 'medium', 'dark', 'decaf'] as const;

export type RoastId = (typeof ROAST_IDS)[number];

export interface RoastPresentation {
  id: RoastId;
  shortName: string;
  description: string;
  origin: string;
  capColor: string;
  inkColor: string;
  sideLabel: string;
  subline: string;
  tintColor: string;
  wordColor: string;
}

export const ROAST_PRESENTATIONS = {
  light: {
    id: 'light',
    shortName: 'Light',
    description: 'Light roast. Bright, not aggressive.',
    origin: 'Huila, Colombia',
    capColor: '#d9a35f',
    inkColor: '#402310',
    sideLabel: 'morning',
    subline: 'ORGANIC COFFEE — LIGHT ROAST',
    tintColor: '#fff2eb',
    wordColor: '#ffc6a5',
  },
  medium: {
    id: 'medium',
    shortName: 'Medium',
    description: 'Medium roast. The one most people want.',
    origin: 'Nariño, Colombia',
    capColor: '#c67139',
    inkColor: '#f9f4ed',
    sideLabel: 'hello',
    subline: 'ORGANIC COFFEE — MEDIUM ROAST',
    tintColor: '#ffe1d0',
    wordColor: '#f6a06b',
  },
  dark: {
    id: 'dark',
    shortName: 'Dark',
    description: 'Dark roast. Strong. Not burnt.',
    origin: 'Sul de Minas, Brazil',
    capColor: '#2e2b25',
    inkColor: '#f9f4ed',
    sideLabel: 'strong.',
    subline: 'ORGANIC COFFEE — DARK ROAST',
    tintColor: '#eee7db',
    wordColor: '#c0b6a5',
  },
  decaf: {
    id: 'decaf',
    shortName: 'Decaf',
    description: 'Decaf. Same coffee, later in the day.',
    origin: 'Chiapas, Mexico',
    capColor: '#8fa073',
    inkColor: '#272e1b',
    sideLabel: 'later',
    subline: 'ORGANIC COFFEE — DECAF',
    tintColor: '#e1eecc',
    wordColor: '#aebf92',
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

export function getRoastPresentationByIndex(index: number): RoastPresentation {
  const roastId = ROAST_IDS[index % ROAST_IDS.length] ?? 'medium';
  return ROAST_PRESENTATIONS[roastId];
}
