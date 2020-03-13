const {UuObjectDao} = require("uu_appg01_server").ObjectStore;

class JokesMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({awid: 1, _id: 1}, {unique: true});
  }

  async create(joke) {
    return await super.insertOne(joke);
  }

  async get(awid, id) {
    return await super.findOne({ awid, id });
  }

  async list(awid, pageInfo) {
    return await super.find({ awid }, pageInfo);
  }

  async listByVisibility(awid, visibility, pageInfo = {}) {
    return await super.find({awid, visibility}, pageInfo);
  }

  async update(dtoIn) {
    const { awid, id } = dtoIn;
    console.log(dtoIn);
    return await super.findOneAndUpdate({ awid, id }, dtoIn, "NULL");
  }

}

module.exports = JokesMongo;
