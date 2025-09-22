# ExcelJS

[![Build status](https://github.com/exceljs/exceljs/workflows/ExcelJS/badge.svg)](https://github.com/exceljs/exceljs/actions?query=workflow%3AExcelJS)

Based on [exceljs](https://github.com/exceljs/exceljs) v4.3.0.

Read, manipulate and write spreadsheet data and styles to XLSX and JSON.

Reverse engineered from Excel spreadsheet files as a project.

# Installation

```shell
npm install @nfdi4plants/exceljs
```


## Changes since fork

### 0.0.4

- Fix reader assuming existence of `appProperties` section which is not existant in files written by ClosedXML and let it ignore unknown `lastModifiedBy` field.
    - In `lib/xlsx/xlsx.js`
    - In `lib/xlsx/xform/core/core-xform.js`
    - [Commit](https://github.com/nfdi4plants/exceljs/commit/b4dd10a12178d5796ac75256780f5a4bbb06cf49)
    - See https://github.com/fslaborg/FsSpreadsheet/issues/77

### 0.0.3

- Fix wrong default for `headerRow`. Excel itself does ignore this attribute if true, so read in should be set to `true` if `headerRow === undefined`.
    - In `lib/xlsx/xform/table/table-xform.js`
    - [Commit](https://github.com/nfdi4plants/exceljs/commit/a26b318d89f90e29b1240336fcd9ab2573bd44d2)
- Fix file read in, when file was written with ClosedXml/OpenXml
    - In `lib/xlsx/xform/base-xform.js`
    - [Commit](https://github.com/nfdi4plants/exceljs/commit/a4eeea2d30e629dc0fe4868cc73133e144c21b50)
- Fix table read in, when file was not written with excel.js
    - In `lib/xlsx/xform/core/relationship-xform.js`
    - [Commit](https://github.com/nfdi4plants/exceljs/commit/8712c24c1e65ef2e5a482f14d36ecfac55e310f0)
