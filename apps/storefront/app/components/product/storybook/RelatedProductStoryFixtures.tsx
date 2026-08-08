import type {RelatedProduct} from '../RelatedProductCard';
import {ProductStoryArtwork} from './ProductStoryArtwork';

export const RELATED_PRODUCT_STORY_FIXTURES = [
  {
    id: 'plain-cap',
    category: 'Headwear',
    title: 'The Plain Cap',
    backgroundColor: '#ffc6a5',
    image: (
      <ProductStoryArtwork
        color="#2e2b25"
        kind="cap"
        label="The Plain Cap in ink"
      />
    ),
    price: {kind: 'standard', price: '$28'},
    availability: {kind: 'available', to: '/products/plain-cap'},
  },
  {
    id: 'daily-tote',
    category: 'Carry things',
    title: 'The Daily Tote',
    backgroundColor: '#ccdbb2',
    image: (
      <ProductStoryArtwork
        accentColor="#2e2b25"
        color="#e9ddc7"
        kind="tote"
        label="The Daily Tote in oat"
      />
    ),
    price: {kind: 'standard', price: '$24'},
    availability: {kind: 'available', to: '/products/daily-tote'},
  },
  {
    id: 'good-mug',
    category: 'Drinkware',
    title: 'The Good Mug',
    backgroundColor: '#eee7db',
    image: (
      <ProductStoryArtwork
        color="#b2622d"
        kind="mug"
        label="The Good Mug in clay"
      />
    ),
    price: {kind: 'sale', price: '$18', compareAtPrice: '$22'},
    availability: {kind: 'available', to: '/products/good-mug'},
  },
  {
    id: 'good-coffee',
    category: 'Coffee',
    title: 'Good Coffee',
    backgroundColor: '#e1eecc',
    image: (
      <ProductStoryArtwork
        accentColor="#ffc6a5"
        color="#f5ead8"
        kind="bag"
        label="Bag of Good Coffee"
      />
    ),
    price: {kind: 'standard', price: '$18'},
    availability: {kind: 'available', to: '/products/good-coffee'},
  },
] satisfies readonly RelatedProduct[];
