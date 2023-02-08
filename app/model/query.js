const database = require('../database/db');

class Query {
  db;
  table;
  sql;
  params;
  constructor(table) {
    this.db = database;
    this.table = table;
  }

  changeSelect(select) {
    this.sql = this.sql.replace('*', select);
  }

  orderBy(col, down) {
    this.sql += ` ORDER BY ${col} ${down ? 'DESC' : 'ASC'}`;
    return this;
  }

  where(col, op, val) {
    this.sql += ` WHERE ${col} ${op} ${val}`;
    return this;
  }

  select(columns) {
    this.changeSelect(columns);
    return this;
  }

  async get() {
    return new Promise((resolve, reject) => {
      if (this.params) {
        this.db.all(this.sql, this.params,
          (error, rows) => {
            if (error) {
              reject(error)
            } else {
              resolve(rows);
            }
          })
      } else {
        this.db.all(this.sql,
          (error, rows) => {
            if (error) {
              reject(error)
            } else {
              resolve(rows);
            }
          })
      }
    })
  }
}

module.exports = { Query };