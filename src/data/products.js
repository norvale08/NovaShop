export const products = [
  {
    id: 1,
    name: '«Рождение Венеры»',
    author: 'Сандро Боттичелли',
    price: 1000000,
    oldPrice: 2000000,
    description: 'Одна из самых известных картин эпохи Возрождения. Изображает богиню Венеру, появляющуюся из моря на раковине.',
    images: [
      require('../../public/imgs/1-1.jpg'),
      require('../../public/imgs/1-2.jpg'),
      require('../../public/imgs/1-3.jpg')
    ],
    inCart: false,
    buttonState: 'buy'
  },
  {
    id: 2,
    name: '«Тайная вечеря»',
    author: 'Леонардо да Винчи',
    price: 3000000,
    oldPrice: null,
    description: 'Фреска, изображающая сцену последней трапезы Иисуса Христа с апостолами перед арестом и распятием.',
    images: [
      require('../../public/imgs/2-1.jpg'),
      require('../../public/imgs/2-2.jpg'),
      require('../../public/imgs/2-3.jpg')
    ],
    inCart: false,
    buttonState: 'buy'
  },
  {
    id: 3,
    name: '«Сотворение Адама»',
    author: 'Микеланджело',
    price: 5000000,
    oldPrice: 6000000,
    description: 'Фрагмент фрески потолка Сикстинской капеллы, изображающий момент сотворения первого человека Богом.',
    images: [
      require('../../public/imgs/3-1.jpg'),
      require('../../public/imgs/3-2.jpg'),
      require('../../public/imgs/3-3.jpg')
    ],
    inCart: true,
    buttonState: 'in-cart'
  },
  {
    id: 4,
    name: '«Урок анатомии»',
    author: 'Рембрандт',
    price: 4200000,
    oldPrice: null,
    description: 'Картина изображает публичное анатомирование, проводимое доктором Николасом Тульпом в присутствии членов гильдии хирургов.',
    images: [
      require('../../public/imgs/4-1.jpg'),
      require('../../public/imgs/4-2.jpg'),
      require('../../public/imgs/4-3.jpg')
    ],
    inCart: false,
    buttonState: 'sold'
  },
  {
    id: 5,
    name: '«Звёздная ночь»',
    author: 'Винсент Ван Гог',
    price: 3500000,
    oldPrice: null,
    description: 'Одна из самых узнаваемых картин в истории западной живописи, изображающая вид из окна психиатрической лечебницы перед восходом солнца.',
    images: [
      require('../../public/imgs/5-1.jpg'),
      require('../../public/imgs/5-2.jpg'),
      require('../../public/imgs/5-3.jpg')
    ],
    inCart: false,
    buttonState: 'buy'
  },
  {
    id: 6,
    name: '«Девушка с жемчужной серёжкой»',
    author: 'Ян Вермеер',
    price: 2800000,
    oldPrice: null,
    description: 'Портрет девушки в экзотическом одеянии и с крупной жемчужной серьгой в ухе, часто называемый «голландской Моной Лизой».',
    images: [
      require('../../public/imgs/6-1.jpg'),
      require('../../public/imgs/6-2.jpg'),
      require('../../public/imgs/6-3.jpg'),
    ],
    inCart: false,
    buttonState: 'buy'
  }
];
