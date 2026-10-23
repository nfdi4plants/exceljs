const testXformHelper = require('../test-xform-helper');

const TableColumnXform = verquire('xlsx/xform/table/table-column-xform');

const expectations = [
  {
    title: 'label',
    create() {
      return new TableColumnXform();
    },
    preparedModel: {id: 1, name: 'Foo', totalsRowLabel: 'Bar'},
    xml: '<tableColumn id="1" name="Foo" totalsRowLabel="Bar" />',
    parsedModel: {name: 'Foo', totalsRowLabel: 'Bar'},
    tests: ['render', 'renderIn', 'parse'],
  },
  {
    title: 'function',
    create() {
      return new TableColumnXform();
    },
    preparedModel: {id: 1, name: 'Foo', totalsRowFunction: 'Baz'},
    xml: '<tableColumn id="1" name="Foo" totalsRowFunction="Baz" />',
    parsedModel: {name: 'Foo', totalsRowFunction: 'Baz'},
    tests: ['render', 'renderIn', 'parse'],
  },
  {
    title: 'custom formula',
    create() {
      return new TableColumnXform();
    },
    preparedModel: {
      id: 1,
      name: 'Foo',
      totalsRowFunction: 'custom',
      totalsRowFormula: 'SUBTOTAL(109,Table1[Foo])',
    },
    xml:
      '<tableColumn id="1" name="Foo" totalsRowFunction="custom"><totalsRowFormula>SUBTOTAL(109,Table1[Foo])</totalsRowFormula></tableColumn>',
    parsedModel: {
      name: 'Foo',
      totalsRowFunction: 'custom',
      totalsRowFormula: 'SUBTOTAL(109,Table1[Foo])',
    },
    tests: ['render', 'renderIn', 'parse', 'parseIn'],
  },
];

describe('TableColumnXform', () => {
  testXformHelper(expectations);
});
