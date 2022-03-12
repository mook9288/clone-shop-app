const continents = [
  {
    _id: 1,
    name: 'Africa',
  },
  {
    _id: 2,
    name: 'Europe',
  },
  {
    _id: 3,
    name: 'Asia',
  },
  {
    _id: 4,
    name: 'North America',
  },
  {
    _id: 5,
    name: 'South America',
  },
  {
    _id: 6,
    name: 'Australia',
  },
  {
    _id: 7,
    name: 'Antarctica',
  },
];

const price = [
  {
    _id: 0,
    name: 'Any',
    array: [],
  },
  {
    _id: 1,
    name: '$0 to $50',
    array: [0, 50],
  },
  {
    _id: 2,
    name: '$51 to $100',
    array: [51, 100],
  },
  {
    _id: 3,
    name: '$101 to $150',
    array: [101, 150],
  },
  {
    _id: 4,
    name: '$151 to $200',
    array: [151, 200],
  },
  {
    _id: 5,
    name: 'More than $201',
    array: [201, 1500000],
  },
];

export { continents, price };
