import type {MDXContent} from 'mdx/types';

import {JOURNAL_MDX_COMPONENTS} from '~/components/mdx/mdx-components';

export function MdxRenderer({Content}: {Content: MDXContent}) {
  return (
    <article className="[&>p:first-of-type]:mt-0 [&>p:first-of-type]:text-xl [&>p:first-of-type]:leading-relaxed [&>p:first-of-type]:text-foreground [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:mr-2 [&>p:first-of-type]:first-letter:font-display [&>p:first-of-type]:first-letter:text-7xl [&>p:first-of-type]:first-letter:leading-[0.8] [&>p:first-of-type]:first-letter:text-orange-600">
      <Content components={JOURNAL_MDX_COMPONENTS} />
    </article>
  );
}
