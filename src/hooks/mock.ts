import nock from 'nock';
import { Category, Food, Foods } from './useData';

export const MOCK_CATEGORIES_RESPONSE: Category[] = [
  {
    id: '6288a89f1f0152b8c2cd512b',
    name: 'Sushi',
  },
  {
    id: '6288a89f7338764f2071a8a8',
    name: 'Pizza',
  },
  {
    id: '6288a89f70dc8cf93b71609b',
    name: 'Hot Meals',
  },
  {
    id: '6288a89fe6c2fe0b758360fe',
    name: 'Desserts',
  },
  {
    id: '6288a89fac9e970731bfaa7b',
    name: 'Drinks',
  },
];

export const MOCK_FOOD_FIRST_PAGE: Food[] = [
  {
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
  },
  {
    id: '628b5decf39bcc4e982fc88a',
    index: 1,
    rating: 4.9874,
    promotion: '1+1',
    isNew: false,
    categoryId: '6288a89f1f0152b8c2cd512b',
    minCookTime: 120,
    maxCookTime: 140,
    restaurant: 'Boilicon',
    name: 'Boilicon Shushi',
    imageUrl:
      'https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/sushi.jpg',
  },
  {
    id: '628b5dec6678e96d75f2f7de',
    index: 2,
    rating: 3.4518,
    promotion: null,
    isNew: true,
    categoryId: '6288a89f1f0152b8c2cd512b',
    minCookTime: 100,
    maxCookTime: 120,
    restaurant: 'Quinex',
    name: 'Quinex Shushi',
    imageUrl:
      'https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/sushi.jpg',
  },
  {
    id: '628b5dec97eacf5e8a604bd7',
    index: 3,
    rating: 1.5975,
    promotion: 'gift',
    isNew: false,
    categoryId: '6288a89f7338764f2071a8a8',
    minCookTime: 120,
    maxCookTime: 140,
    restaurant: 'Perkle',
    name: 'Perkle Pizza',
    imageUrl:
      'https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/pizza.jpg',
  },
  {
    id: '628b5decf99b6a8dc80af3b6',
    index: 4,
    rating: 0.8644,
    promotion: null,
    isNew: true,
    categoryId: '6288a89fac9e970731bfaa7b',
    minCookTime: 70,
    maxCookTime: 90,
    restaurant: 'Zanymax',
    name: 'Zanymax Drinks',
    imageUrl:
      'https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/drink.jpg',
  },
  {
    id: '628b5dec0690be0f73109de7',
    index: 5,
    rating: 4.7915,
    promotion: '1+1',
    isNew: true,
    categoryId: '6288a89fe6c2fe0b758360fe',
    minCookTime: 90,
    maxCookTime: 110,
    restaurant: 'Sunclipse',
    name: 'Sunclipse Deserts',
    imageUrl:
      'https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/dessert.jpg',
  },
  {
    id: '628b5dec146488677e4f035d',
    index: 6,
    rating: 2.607,
    promotion: 'gift',
    isNew: false,
    categoryId: '6288a89f1f0152b8c2cd512b',
    minCookTime: 70,
    maxCookTime: 90,
    restaurant: 'Quizmo',
    name: 'Quizmo Shushi',
    imageUrl:
      'https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/sushi.jpg',
  },
  {
    id: '628b5decf5ff6283fb4fef73',
    index: 7,
    rating: 0.1815,
    promotion: '1+1',
    isNew: false,
    categoryId: '6288a89f70dc8cf93b71609b',
    minCookTime: 70,
    maxCookTime: 90,
    restaurant: 'Puria',
    name: 'Puria Hot Meals',
    imageUrl:
      'https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/hot-meal.jpg',
  },
  {
    id: '628b5dec03f30dceb9d78f5a',
    index: 8,
    rating: 0.2835,
    promotion: null,
    isNew: false,
    categoryId: '6288a89fe6c2fe0b758360fe',
    minCookTime: 100,
    maxCookTime: 120,
    restaurant: 'Eventage',
    name: 'Eventage Deserts',
    imageUrl:
      'https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/dessert.jpg',
  },
];

export const MOCK_SECOND_PAGE: Food[] = [
  {
    id: '628b5dec5f76520c3a124f56',
    index: 9,
    rating: 1.6596,
    promotion: 'gift',
    isNew: true,
    categoryId: '6288a89fac9e970731bfaa7b',
    minCookTime: 70,
    maxCookTime: 90,
    restaurant: 'Zentia',
    name: 'Zentia Drinks',
    imageUrl:
      'https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/drink.jpg',
  },
  {
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
  },
  {
    id: '628b5dec3bec513bdafa73b9',
    index: 11,
    rating: 2.4158,
    promotion: 'discount',
    isNew: true,
    categoryId: '6288a89fe6c2fe0b758360fe',
    minCookTime: 70,
    maxCookTime: 90,
    restaurant: 'Waab',
    name: 'Waab Deserts',
    imageUrl:
      'https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/dessert.jpg',
  },
  {
    id: '628b5decee12c4e4254f389c',
    index: 12,
    rating: 2.6854,
    promotion: 'gift',
    isNew: true,
    categoryId: '6288a89f7338764f2071a8a8',
    minCookTime: 120,
    maxCookTime: 140,
    restaurant: 'Bizmatic',
    name: 'Bizmatic Pizza',
    imageUrl:
      'https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/pizza.jpg',
  },
  {
    id: '628b5decbff03304b7f264f7',
    index: 13,
    rating: 4.4988,
    promotion: 'discount',
    isNew: true,
    categoryId: '6288a89f1f0152b8c2cd512b',
    minCookTime: 70,
    maxCookTime: 90,
    restaurant: 'Comtext',
    name: 'Comtext Shushi',
    imageUrl:
      'https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/sushi.jpg',
  },
  {
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
  },
  {
    id: '628b5dec5d47f27d969b7a6f',
    index: 15,
    rating: 0.2656,
    promotion: '1+1',
    isNew: true,
    categoryId: '6288a89fe6c2fe0b758360fe',
    minCookTime: 100,
    maxCookTime: 120,
    restaurant: 'Danja',
    name: 'Danja Deserts',
    imageUrl:
      'https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/dessert.jpg',
  },
  {
    id: '628b5dec1ed4731557f6be8e',
    index: 16,
    rating: 4.6886,
    promotion: '1+1',
    isNew: false,
    categoryId: '6288a89fe6c2fe0b758360fe',
    minCookTime: 100,
    maxCookTime: 120,
    restaurant: 'Kog',
    name: 'Kog Deserts',
    imageUrl:
      'https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/dessert.jpg',
  },
  {
    id: '628b5deccbf13d8659d846ab',
    index: 17,
    rating: 3.4905,
    promotion: 'discount',
    isNew: true,
    categoryId: '6288a89f7338764f2071a8a8',
    minCookTime: 80,
    maxCookTime: 100,
    restaurant: 'Maineland',
    name: 'Maineland Pizza',
    imageUrl:
      'https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/pizza.jpg',
  },
];

export const MOCK_FOOD_RESPONSE: Foods = {
  foods: [
    ...MOCK_FOOD_FIRST_PAGE,
    ...MOCK_SECOND_PAGE,
    {
      id: '628b5dec146deae4b46cebf4',
      index: 18,
      rating: 4.8641,
      promotion: '1+1',
      isNew: false,
      categoryId: '6288a89f1f0152b8c2cd512b',
      minCookTime: 50,
      maxCookTime: 70,
      restaurant: 'Interodeo',
      name: 'Interodeo Shushi',
      imageUrl:
        'https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/sushi.jpg',
    },
  ],
};

export function mockErrorResponse() {
  nock(
    'https://gist.githubusercontent.com/wilson-wego/f7381fcead7a47a7df257a97a033456a/raw/33cd31ce75ba72a809d48944463b53b74b9ccae8'
  )
    .get('/categories.json')
    .replyWithError('something awful happened');

  nock(
    'https://gist.githubusercontent.com/wilson-wego/8311b463cd331099e34a1f251dad4cbf/raw/f1b04f9afe0fcc0c9270cb486b927641b7d27436'
  )
    .get('/food.json')
    .replyWithError('something awful happened');
}

export function mockSuccessResponse() {
  nock(
    'https://gist.githubusercontent.com/wilson-wego/f7381fcead7a47a7df257a97a033456a/raw/33cd31ce75ba72a809d48944463b53b74b9ccae8'
  )
    .get('/categories.json')
    .reply(200, MOCK_CATEGORIES_RESPONSE);

  nock(
    'https://gist.githubusercontent.com/wilson-wego/8311b463cd331099e34a1f251dad4cbf/raw/f1b04f9afe0fcc0c9270cb486b927641b7d27436'
  )
    .get('/food.json')
    .reply(200, MOCK_FOOD_RESPONSE);
}
