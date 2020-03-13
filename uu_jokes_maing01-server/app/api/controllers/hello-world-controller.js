"use strict"

class HelloWorldController {
  helloWorld(ucEnv) {
    const uri = ucEnv.getUri();
    const dtoIn = ucEnv.getDtoIn();

    const dtoOut = {
      text: "Hello world!",
      uuAppErrorMap: {},
      awid: uri.getAwid(),
      echo: dtoIn.text
    };

    return dtoOut;
  }
}

module.exports = new HelloWorldController();
