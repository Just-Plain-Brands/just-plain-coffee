import {useEffect, useMemo, useState} from 'react';

import {Text} from '~/components/ui/text';
import type {JournalHeading} from '~/lib/journal/types';
import {cn} from '~/lib/utils';

export function ArticleTableOfContents({
  headings,
}: {
  headings: readonly JournalHeading[];
}) {
  const items = useMemo(() => condenseTrailingQuestions(headings), [headings]);
  const firstTopLevelHeading = items.find((heading) => heading.level === 2);
  const activeHeadingId = useActiveHeadingId(
    items,
    firstTopLevelHeading?.id ?? items[0]?.id,
  );

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className="lg:sticky lg:top-32">
      <Text as="p" className="text-xs text-green-700" variant="package-sm">
        On this page
      </Text>
      <ol className="mt-4 border-l border-green-700/45">
        {items.map((heading) => (
          <li className={cn(heading.level === 3 && 'pl-3')} key={heading.id}>
            <a
              aria-current={
                activeHeadingId === heading.id ? 'location' : undefined
              }
              className={cn(
                'relative block py-2.5 pl-4 text-xs leading-tight text-neutral-700 before:absolute before:top-1/2 before:left-[-4px] before:size-[7px] before:-translate-y-1/2 before:rounded-full before:border before:border-green-700 hover:text-primary',
                activeHeadingId === heading.id
                  ? 'font-bold before:bg-green-700'
                  : 'before:bg-background',
              )}
              href={`#${heading.id}`}
            >
              {heading.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function useActiveHeadingId(
  headings: readonly JournalHeading[],
  fallbackHeadingId: string | undefined,
): string | undefined {
  const [activeHeadingId, setActiveHeadingId] = useState(fallbackHeadingId);

  useEffect(() => {
    let animationFrameId: number | undefined;

    const updateActiveHeading = () => {
      animationFrameId = undefined;
      let nextActiveHeadingId = fallbackHeadingId;

      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (!element) continue;

        const scrollMarginTop = Number.parseFloat(
          window.getComputedStyle(element).scrollMarginTop,
        );
        const activationOffset = Number.isFinite(scrollMarginTop)
          ? scrollMarginTop
          : 0;
        const headingTop = element.getBoundingClientRect().top;

        if (headingTop > activationOffset) break;
        nextActiveHeadingId = heading.id;
      }

      setActiveHeadingId(nextActiveHeadingId);
    };

    const scheduleUpdate = () => {
      if (animationFrameId !== undefined) return;
      animationFrameId = window.requestAnimationFrame(updateActiveHeading);
    };

    updateActiveHeading();
    window.addEventListener('scroll', scheduleUpdate, {passive: true});
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      if (animationFrameId !== undefined) {
        window.cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [fallbackHeadingId, headings]);

  return activeHeadingId;
}

function condenseTrailingQuestions(
  headings: readonly JournalHeading[],
): readonly JournalHeading[] {
  let trailingStart = headings.length;

  while (trailingStart > 0 && headings[trailingStart - 1]?.level === 3) {
    trailingStart -= 1;
  }

  const trailingHeadings = headings.slice(trailingStart);
  const hasQuestionGroup =
    trailingHeadings.length > 0 &&
    trailingHeadings.every((heading) => heading.title.trim().endsWith('?'));

  if (!hasQuestionGroup) return headings;

  const firstQuestion = trailingHeadings[0];
  if (!firstQuestion) return headings;

  const faqHeading: JournalHeading = {
    id: firstQuestion.id,
    title: 'FAQs',
    level: 2,
  };

  return [...headings.slice(0, trailingStart), faqHeading];
}
