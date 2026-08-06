import {Text} from '~/components/ui/text';
import type {JournalHeading} from '~/lib/journal/types';
import {cn} from '~/lib/utils';

export function ArticleTableOfContents({
  headings,
}: {
  headings: readonly JournalHeading[];
}) {
  if (headings.length === 0) return null;

  const items = condenseTrailingQuestions(headings);
  const firstTopLevelIndex = items.findIndex((heading) => heading.level === 2);

  return (
    <nav aria-label="On this page" className="lg:sticky lg:top-32">
      <Text as="p" className="text-xs text-green-700" variant="package-sm">
        On this page
      </Text>
      <ol className="mt-4 border-l border-green-700/45">
        {items.map((heading, index) => (
          <li className={cn(heading.level === 3 && 'pl-3')} key={heading.id}>
            <a
              className={cn(
                'relative block py-2.5 pl-4 text-xs leading-tight text-neutral-700 before:absolute before:top-1/2 before:left-[-4px] before:size-[7px] before:-translate-y-1/2 before:rounded-full before:border before:border-green-700 hover:text-primary',
                index === firstTopLevelIndex
                  ? 'before:bg-green-700'
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
