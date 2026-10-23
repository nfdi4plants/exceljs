const fs = require('fs');

const testXformHelper = require('../test-xform-helper');

const TableXform = verquire('xlsx/xform/table/table-xform');

const expectations = [
  {
    title: 'showing filter',
    create() {
      return new TableXform();
    },
    initialModel: null,
    preparedModel: require('./data/table.1.1.json'),
    xml: fs.readFileSync(`${__dirname}/data/table.1.2.xml`).toString(),
    parsedModel: require('./data/table.1.3.json'),
    tests: ['render', 'renderIn', 'parse'],
  },
  {
    title: 'custom totals row formulas and hidden filter buttons',
    create() {
      return new TableXform();
    },
    initialModel: null,
    preparedModel: require('./data/table.2.1.json'),
    xml: fs.readFileSync(`${__dirname}/data/table.2.2.xml`).toString(),
    parsedModel: require('./data/table.2.3.json'),
    tests: ['render', 'renderIn', 'parse'],
  },
];

describe('TableXform', () => {
  testXformHelper(expectations);
});
