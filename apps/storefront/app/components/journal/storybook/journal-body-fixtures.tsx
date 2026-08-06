import type {MDXContent} from 'mdx/types';

import {Callout, MascotTip} from '~/components/mdx/callout';
import {
  MdxHeading2,
  MdxListItem,
  MdxParagraph,
  MdxUnorderedList,
} from '~/components/mdx/mdx-components';
import {
  IngredientList,
  PullQuote,
  RecipeStep,
  RecipeSteps,
} from '~/components/mdx/recipe-blocks';

export const RecipeBodyFixture: MDXContent = () => {
  return (
    <>
      <MdxParagraph>
        Cold brew is easier than it sounds and a lot harder to mess up. No heat,
        no rush—just time doing the heavy lifting.
      </MdxParagraph>
      <MdxHeading2 id="start-with-the-ratio">Start with the ratio.</MdxHeading2>
      <IngredientList>
        <MdxUnorderedList>
          <MdxListItem>1 cup coarsely ground coffee</MdxListItem>
          <MdxListItem>4 cups cold filtered water</MdxListItem>
        </MdxUnorderedList>
      </IngredientList>
      <MdxHeading2 id="how-to-make-it">How to make it.</MdxHeading2>
      <RecipeSteps>
        <RecipeStep number={1} title="Combine.">
          Add the coffee and water to a large jar and stir until the grounds are
          wet.
        </RecipeStep>
        <RecipeStep number={2} title="Leave it alone.">
          Cover and steep in the fridge for 8 to 12 hours.
        </RecipeStep>
        <RecipeStep number={3} title="Strain and pour.">
          Strain through a fine mesh sieve or coffee filter.
        </RecipeStep>
      </RecipeSteps>
      <PullQuote>
        Cold brew should taste like coffee. Colder. That’s the whole pitch.
      </PullQuote>
      <MdxHeading2 id="a-note-on-serving">A note on serving.</MdxHeading2>
      <MdxParagraph>
        Start with equal parts concentrate and water or milk, then adjust to
        taste.
      </MdxParagraph>
      <MascotTip>Start over ice, then add water or milk to taste.</MascotTip>
    </>
  );
};

export const StoryBodyFixture: MDXContent = () => {
  return (
    <>
      <MdxParagraph>
        Light, medium, and dark describe how far a roaster takes the same green
        coffee seed through heat.
      </MdxParagraph>
      <MdxHeading2 id="what-heat-changes">What heat changes.</MdxHeading2>
      <MdxParagraph>
        Sugars brown, acids shift, aromatic compounds form, and the bean trades
        some origin character for flavors created by roasting.
      </MdxParagraph>
      <PullQuote>
        Roast level is a stopping point, not a quality score.
      </PullQuote>
      <MdxHeading2 id="light-roast-keeps-the-origin-loud">
        Light roast keeps the origin loud.
      </MdxHeading2>
      <MdxParagraph>
        Light coffee tends to preserve fruit, florals, and a clearer sense of
        where the coffee came from.
      </MdxParagraph>
      <Callout title="Choose by flavor.">
        Pick the flavor family you enjoy first. The roast name is only the
        shortcut.
      </Callout>
    </>
  );
};
