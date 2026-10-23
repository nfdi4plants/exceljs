const ExcelJS = verquire('exceljs');

const fileName = './spec/integration/data/test-arctrl-issue-508.xlsx';

function getColumnCounts(wb) {
  return wb.worksheets
    .flatMap(ws => ws.getTables())
    .reduce((counts, table) => {
      counts[table.model.name] = table.model.columns.length;
      return counts;
    }, {});
}

describe('github issues', () => {
  describe('ARCtrl issue 508 - table columns with totalsRowFormula', () => {
    it('reads all table columns', async () => {
      const wb = new ExcelJS.Workbook();
      await wb.xlsx.readFile(fileName);

      expect(getColumnCounts(wb)).to.deep.equal({
        annotationTable0: 23,
        annotationTable1: 36,
      });

      const table = wb.getWorksheet('rna_extraction').getTable('annotationTable0');
      const [first, second] = table.model.columns;
      expect(first.name).to.equal('Input [Sample Name]');
      expect(first.filterButton).to.equal(false);
      expect(second.name).to.equal('Protocol Type');
      expect(second.totalsRowFunction).to.equal('custom');
      expect(second.totalsRowFormula).to.equal('none');
      expect(second.filterButton).to.equal(false);
    }).timeout(6000);

    it('keeps totalsRowFormula when written and read again', async () => {
      const wb = new ExcelJS.Workbook();
      await wb.xlsx.readFile(fileName);
      const buffer = await wb.xlsx.writeBuffer();

      const wb2 = new ExcelJS.Workbook();
      await wb2.xlsx.load(buffer);

      expect(getColumnCounts(wb2)).to.deep.equal({
        annotationTable0: 23,
        annotationTable1: 36,
      });
      const table = wb2.getWorksheet('rna_extraction').getTable('annotationTable0');
      const [, second] = table.model.columns;
      expect(second.totalsRowFunction).to.equal('custom');
      expect(second.totalsRowFormula).to.equal('none');
    }).timeout(6000);
  });
});
