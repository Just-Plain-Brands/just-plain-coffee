import type {JournalSummary} from '~/lib/journal/types';

export const RECIPE_JOURNAL_ENTRY = {
  kind: 'recipe',
  slug: 'how-to-make-cold-brew',
  title: 'How to make cold brew that tastes like coffee.',
  description:
    'Low effort. Big payoff. Here’s the method we use—and why it works.',
  publishedAt: '2026-08-04',
  featured: true,
  draft: false,
  cardTone: 'olive',
  tags: ['cold brew', 'recipes', 'brewing'],
  listImage: {
    src: '/journal/how-to-make-cold-brew/list.png',
    alt: 'Iced coffee, a bowl of beans, and a Just Plain Coffee carton',
  },
  articleImage: {
    src: '/journal/how-to-make-cold-brew/article-still-life-v2.png',
    alt: 'A glass pitcher of iced coffee beside beans and a Just Plain Coffee carton',
  },
  recipe: {
    prepMinutes: 10,
    steepMinutes: {minimum: 480, maximum: 720},
    yield: '4 cups',
    ratio: '1:4',
  },
  readingMinutes: 8,
  headings: [
    {id: 'start-with-the-ratio', title: 'Start with the ratio.', level: 2},
    {id: 'how-to-make-it', title: 'How to make it.', level: 2},
    {id: 'a-note-on-serving', title: 'A note on serving.', level: 2},
    {id: 'why-it-works', title: 'Why it works.', level: 2},
    {
      id: 'can-i-use-pre-ground-coffee',
      title: 'Can I use pre-ground coffee?',
      level: 3,
    },
    {
      id: 'does-the-roast-matter',
      title: 'Does the roast matter?',
      level: 3,
    },
  ],
} satisfies JournalSummary;

export const STORY_JOURNAL_ENTRY = {
  kind: 'story',
  slug: 'what-roast-level-actually-means',
  title: 'What roast level actually means.',
  description:
    'Light, medium, dark—what’s the real difference, and how should you choose?',
  publishedAt: '2026-08-01',
  featured: false,
  draft: false,
  cardTone: 'olive',
  tags: ['roasting', 'guides', 'coffee basics'],
  listImage: {
    src: '/journal/what-roast-level-actually-means/list.png',
    alt: 'Three illustrated coffee beans progressing from light roast to dark roast',
  },
  articleImage: {
    src: '/journal/what-roast-level-actually-means/article.png',
    alt: 'Light-, medium-, and dark-roasted coffee beans arranged side by side',
    caption: 'Same seed. Three different stopping points.',
  },
  readingMinutes: 5,
  headings: [
    {
      id: 'what-heat-changes',
      title: 'What heat changes.',
      level: 2,
    },
    {
      id: 'light-roast-keeps-the-origin-loud',
      title: 'Light roast keeps the origin loud.',
      level: 2,
    },
    {
      id: 'medium-roast-aims-for-the-middle',
      title: 'Medium roast aims for the middle.',
      level: 2,
    },
    {
      id: 'dark-roast-makes-the-roast-loud',
      title: 'Dark roast makes the roast loud.',
      level: 2,
    },
    {
      id: 'pick-by-flavor-then-adjust-the-brew',
      title: 'Pick by flavor, then adjust the brew.',
      level: 2,
    },
  ],
} satisfies JournalSummary;

export const CREAM_STORY_ENTRY = {
  ...STORY_JOURNAL_ENTRY,
  slug: 'the-case-for-weighing-your-beans',
  title: 'The case for weighing your beans.',
  description:
    'Consistency doesn’t come from eyeballing it. Here’s how weight changes everything.',
  publishedAt: '2026-08-03',
  cardTone: 'cream',
  tags: ['brewing', 'guides', 'coffee scales'],
  listImage: {
    src: '/journal/the-case-for-weighing-your-beans/list.png',
    alt: 'Roasted coffee beans in a bowl on a vintage olive-green kitchen scale',
  },
  articleImage: {
    src: '/journal/the-case-for-weighing-your-beans/article.png',
    alt: 'A vintage olive-green kitchen scale holding a bowl of roasted coffee beans',
    caption: 'Beans first. Guessing never.',
  },
  readingMinutes: 6,
} satisfies JournalSummary;

export const COFFEE_CAKE_JOURNAL_ENTRY = {
  ...RECIPE_JOURNAL_ENTRY,
  slug: 'coffee-cake-obviously',
  title: 'Coffee cake. Obviously.',
  description:
    'Buttery, crumbly, and better with coffee. A classic for a reason.',
  publishedAt: '2026-08-02',
  featured: false,
  cardTone: 'orange',
  tags: ['recipes', 'baking', 'coffee cake'],
  listImage: {
    src: '/journal/coffee-cake-obviously/list.png',
    alt: 'A square slice of crumb-topped coffee cake on a plate beside a mug of coffee',
  },
  articleImage: {
    src: '/journal/coffee-cake-obviously/article.png',
    alt: 'Coffee cake with a cinnamon crumb topping served beside a cream coffee mug',
    caption: 'Cake for coffee. The name was already doing enough.',
  },
  recipe: {
    prepMinutes: 25,
    steepMinutes: {minimum: 35, maximum: 40},
    yield: '9 slices',
    ratio: '1 cake : 1 fresh pot',
  },
  readingMinutes: 7,
} satisfies JournalSummary;

export const LONG_TITLE_JOURNAL_ENTRY = {
  ...STORY_JOURNAL_ENTRY,
  slug: 'an-unnecessarily-long-title-about-coffee-packaging',
  title:
    'The unnecessarily complete story of how a very plain carton ended up holding very good coffee.',
  description:
    'A longer description that makes sure the card remains balanced when editorial copy stretches beyond the ideal length.',
} satisfies JournalSummary;

export const JOURNAL_STORY_FIXTURES = [
  RECIPE_JOURNAL_ENTRY,
  CREAM_STORY_ENTRY,
  COFFEE_CAKE_JOURNAL_ENTRY,
  STORY_JOURNAL_ENTRY,
] as const;
