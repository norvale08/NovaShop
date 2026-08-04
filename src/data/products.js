export const products = [
  {
    id: 1,
    name: '«Рождение Венеры»',
    author: 'Сандро Боттичелли',
    price: 1000000,
    oldPrice: 2000000,
    description: 'Одна из самых известных картин эпохи Возрождения. Изображает богиню Венеру, появляющуюся из моря на раковине.',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/800px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg'
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
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/%C3%9Altima_Cena_-_Da_Vinci_5.jpg/800px-%C3%9Altima_Cena_-_Da_Vinci_5.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/4/4b/%C3%9Altima_Cena_-_Da_Vinci_5.jpg'
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
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/800px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/2/24/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg'
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
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Rembrandt_-_The_Anatomy_Lesson_of_Dr_Nicolaes_Tulp.jpg/800px-Rembrandt_-_The_Anatomy_Lesson_of_Dr_Nicolaes_Tulp.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/2/2c/Rembrandt_-_The_Anatomy_Lesson_of_Dr_Nicolaes_Tulp.jpg'
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
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg'
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
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/0/0f/1665_Girl_with_a_Pearl_Earring.jpg'
    ],
    inCart: false,
    buttonState: 'buy'
  }
];
