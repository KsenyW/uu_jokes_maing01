"use strict";
const JokesMainUseCaseError = require("./jokes-main-use-case-error.js");

const Create = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  JokeDaoCreateFailed: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}jokeDaoCreateFailed`;
      this.message = "Joke create failed";
    }
  }
};

const Get = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}get/`,

  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  JokeDaoGetFailed: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}jokeDaoGetFailed`;
      this.message = "Joke get failed";
    }
  }
};

const List = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}list/`,

  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  JokeDaoListFailed: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}jokeDaoListFailed`;
      this.message = "Get joke list failed";
    }
  }
};

const SetActive = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}setActive/`,

  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetActive.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  JokeDaoSetActiveFailed: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetActive.UC_CODE}jokeDaoSetActiveFailed`;
      this.message = "Ste joke active failed";
    }
  }
};

const ListRemote = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}listRemote/`,

};

const Update = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}update/`,

  JokeDaoUpdateFailed: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}jokeDaoUpdateFailed`;
      this.message = "Joke update failed";
    }
  }

};

module.exports = {
  Update,
  ListRemote,
  SetActive,
  Create,
  Get,
  List
};
