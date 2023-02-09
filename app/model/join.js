const { Query } = require('./query');

class LeftJoin extends Query {
  fields;
  joinTable;
  joinCol;
  col;

  constructor(table, fields, joinTable, joinCol, col) {
    super(table);
    this.fields = fields;
    this.joinTable = joinTable;
    this.joinCol = joinCol;
    this.col = col;
    this.sql = `SELECT * FROM ${this.table} LEFT JOIN ${this.joinTable} ON ${this.table}.${this.col} = ${this.joinTable}.${this.joinCol}`;
  }

  selectFromRight(rightTableColumns) {
    let lsel = this.fields.map(item => `${this.table}.${item}`).join(",");
    let rsel = rightTableColumns.split(",").map(item => `${this.joinTable}.${item}`).join(",");
    this.slct = `${this.table}.id,${lsel},${rsel}`;
    this.changeSelect();
    return this;
  }
}

module.exports = { LeftJoin };