const BaseXform = require('../base-xform');

class TableColumnXform extends BaseXform {
  get tag() {
    return 'tableColumn';
  }

  prepare(model, options) {
    model.id = options.index + 1;
  }

  render(xmlStream, model) {
    const attributes = {
      id: model.id.toString(),
      name: model.name,
      totalsRowLabel: model.totalsRowLabel,
      totalsRowFunction: model.totalsRowFunction,
      dxfId: model.dxfId,
    };
    if (model.totalsRowFunction === 'custom' && model.totalsRowFormula) {
      xmlStream.openNode(this.tag, attributes);
      xmlStream.leafNode('totalsRowFormula', undefined, model.totalsRowFormula);
      xmlStream.closeNode();
    } else {
      xmlStream.leafNode(this.tag, attributes);
    }
    return true;
  }

  parseOpen(node) {
    switch (node.name) {
      case this.tag: {
        const {attributes} = node;
        this.model = {
          name: attributes.name,
          totalsRowLabel: attributes.totalsRowLabel,
          totalsRowFunction: attributes.totalsRowFunction,
          dxfId: attributes.dxfId,
        };
        this.text = undefined;
        return true;
      }
      case 'totalsRowFormula':
        this.text = [];
        return true;
      default:
        return false;
    }
  }

  parseText(text) {
    if (this.text) {
      this.text.push(text);
    }
  }

  parseClose(name) {
    switch (name) {
      case 'totalsRowFormula':
        this.model.totalsRowFormula = this.text.join('');
        this.text = undefined;
        return true;
      case this.tag:
        return false;
      default:
        // child elements such as calculatedColumnFormula or xmlColumnPr are ignored
        return true;
    }
  }
}

module.exports = TableColumnXform;
