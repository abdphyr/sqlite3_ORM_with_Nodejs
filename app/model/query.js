const database = require('../database/db');

class Query {
  db;
  table;
  sql;
  slct;
  params;
  constructor(table) {
    this.db = database;
    this.table = table;
  }

  changeSelect() {
    this.sql = this.sql.replace('*', this.slct);
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

  async avg(column, round) {
    const selectEnd = this.sql.indexOf("FROM");
    this.sql = `SELECT ROUND(AVG(${column}), ${round ? round : 0}) AS avg ` + this.sql.slice(selectEnd);
    const avg = await this.get();
    return avg[0]['avg'];
  }

  async count() {
    const selectEnd = this.sql.indexOf("FROM");
    this.sql = `SELECT COUNT(*) AS count ` + this.sql.slice(selectEnd);
    const count = await this.get();
    return count[0]['count'];
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