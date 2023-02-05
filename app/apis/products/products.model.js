const { Model } = require("../../model/model");

class Product extends Model {
  static table = "products";
  static fields = ["title", "image", "text"];
  
  static async comments(id) {
    return this.hasMany({ rel: "comments", column: "product_id", id });
  }
}

module.exports = { Product };