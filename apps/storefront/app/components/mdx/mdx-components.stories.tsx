import type {Meta, StoryObj} from '@storybook/react-vite';

import {
  RecipeBodyFixture,
  StoryBodyFixture,
} from '../journal/storybook/journal-body-fixtures';
import {Callout, MascotTip} from './callout';
import {MdxHeading2, MdxParagraph} from './mdx-components';
import {MdxRenderer} from './mdx-renderer';
import {
  Figure,
  IngredientList,
  PullQuote,
  RecipeStep,
  RecipeSteps,
} from './recipe-blocks';

const meta = {
  title: 'Journal/MDX Components',
  component: Callout,
  args: {
    children: 'Same specialty-grade beans. Same roasted-to-order schedule.',
    title: 'Plain facts.',
  },
  decorators: [
    (Story) => (
      <div className="w-[min(720px,calc(100vw-2rem))]">
        <Story />
      </div>
    ),
  ],
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CalloutBlock = {} satisfies Story;

export const MascotAdvice = {
  render: () => (
    <MascotTip>
      <MdxParagraph>
        Start over ice, then add water or milk to taste.
      </MdxParagraph>
    </MascotTip>
  ),
} satisfies Story;

export const Quote = {
  render: () => (
    <PullQuote>
      <MdxParagraph>
        Cold brew should taste like coffee. Colder. That’s the whole pitch.
      </MdxParagraph>
    </PullQuote>
  ),
} satisfies Story;

export const Ingredients = {
  render: () => (
    <div>
      <MdxHeading2>Start with the ratio.</MdxHeading2>
      <IngredientList>
        <ul>
          <li>1 cup coarsely ground coffee</li>
          <li>4 cups cold filtered water</li>
        </ul>
      </IngredientList>
    </div>
  ),
} satisfies Story;

export const Steps = {
  render: () => (
    <RecipeSteps>
      <RecipeStep number={1} title="Combine.">
        Add coffee and water to a large jar.
      </RecipeStep>
      <RecipeStep number={2} title="Leave it alone.">
        Cover and steep in the fridge for 8 to 12 hours.
      </RecipeStep>
    </RecipeSteps>
  ),
} satisfies Story;

export const ImageWithCaption = {
  render: () => (
    <Figure
      alt="Just Plain Coffee carton"
      caption="A carton. Full of coffee. It is less complicated than it sounds."
      src="/Carton%201.png"
    />
  ),
} satisfies Story;

export const RecipeContent = {
  render: () => <MdxRenderer Content={RecipeBodyFixture} />,
} satisfies Story;

export const StoryContent = {
  render: () => <MdxRenderer Content={StoryBodyFixture} />,
} satisfies Story;
