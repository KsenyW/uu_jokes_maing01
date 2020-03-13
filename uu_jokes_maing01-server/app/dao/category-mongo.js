"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class CategoryMongo extends UuObjectDao {

  async createSchema(){
  }

}

module.exports = CategoryMongo;
