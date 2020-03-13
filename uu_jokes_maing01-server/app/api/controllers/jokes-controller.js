"use strict"

const JokesAbl = require("./../../abl/jokes-abl");

class JokesController {

  update(ucEnv) {
    return JokesAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  listRemote(ucEnv) {
    return JokesAbl.listRemote(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
  create(ucEnv) {
    return JokesAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  setActive(ucEnv) {
    return JokesAbl.setActive(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  get(ucEnv) {
    return JokesAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return JokesAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new JokesController();
