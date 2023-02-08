const { Query } = require('./query');


class All extends Query {
  constructor(table) {
    super(table)
    this.sql = `SELECT * FROM ${this.table}`;
  }
}

module.exports = { All };