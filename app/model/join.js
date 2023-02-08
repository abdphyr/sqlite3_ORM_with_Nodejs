const { Query } = require('./query');

class Join extends Query {
  fields;
  joinTable;
  joinCol;
  col;
  sql;
  params;
  constructor(table, fields, joinTable, joinCol, col) {
    super(table);
    this.fields = fields;
    this.joinTable = joinTable;
    this.joinCol = joinCol;
    this.col = col;
    this.sql = `SELECT * FROM ${this.table} JOIN ${this.joinTable} ON ${this.table}.${this.col} = ${this.joinTable}.${this.joinCol}`;
  }

  selectFromRight(rightTableColumns) {
    let lsel = this.fields.map(item => `${this.table}.${item}`).join(",");
    let rsel = rightTableColumns.split(",").map(item => `${this.joinTable}.${item}`).join(",");
    this.changeSelect(`${this.table}.id,${lsel},${rsel}`);
    return this;
  }
}

module.exports = { Join };