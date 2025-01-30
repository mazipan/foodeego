import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FoodCard } from '../food-card';
import { Food } from '../../hooks/useData';

const MOCK_GIFT: Food = {
  id: '628b5decc94a27754f30e6f1',
  index: 0,
  rating: 3.9508,
  promotion: 'gift',
  isNew: false,
  categoryId: '6288a89fac9e970731bfaa7b',
  minCookTime: 80,
  maxCookTime: 100,
  restaurant: 'Niquent',
  name: 'Niquent Drinks',
  imageUrl:
    'https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/drink.jpg',
};

const MOCK_DISCOUNT: Food = {
  id: '628b5dec5690539b21937e33',
  index: 10,
  rating: 0.4329,
  promotion: 'discount',
  isNew: false,
  categoryId: '6288a89fe6c2fe0b758360fe',
  minCookTime: 60,
  maxCookTime: 80,
  restaurant: 'Nurali',
  name: 'Nurali Deserts',
  imageUrl:
    'https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/dessert.jpg',
};

const MOCK_1_1: Food = {
  id: '628b5decf9da95ad359ee2fa',
  index: 14,
  rating: 0.8948,
  promotion: '1+1',
  isNew: true,
  categoryId: '6288a89f1f0152b8c2cd512b',
  minCookTime: 50,
  maxCookTime: 70,
  restaurant: 'Datacator',
  name: 'Datacator Shushi',
  imageUrl:
    'https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/sushi.jpg',
};

test('FoodCard > render with gift promotion', async () => {
  render(<FoodCard food={MOCK_GIFT} />);

  expect(await screen.findByText(MOCK_GIFT.name)).toBeInTheDocument();
  expect(await screen.findByText('Gift')).toBeInTheDocument();
});

test('FoodCard > render with discount promotion', async () => {
  render(<FoodCard food={MOCK_DISCOUNT} />);

  expect(await screen.findByText(MOCK_DISCOUNT.name)).toBeInTheDocument();
  expect(await screen.findByText('%')).toBeInTheDocument();
});

test('FoodCard > render with 1+1 promotion', async () => {
  render(<FoodCard food={MOCK_1_1} />);

  expect(await screen.findByText(MOCK_1_1.name)).toBeInTheDocument();
  expect(await screen.findByText('1+1')).toBeInTheDocument();
});


test('FoodCard > render with New badge', async () => {
  render(<FoodCard food={MOCK_1_1} />);

  expect(await screen.findByText(MOCK_1_1.name)).toBeInTheDocument();
  expect(await screen.findByText('New')).toBeInTheDocument();
});