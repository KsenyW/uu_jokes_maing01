
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const {DaoFactory, ObjectStoreError} = require("uu_appg01_server").ObjectStore;
const { AppClient } = require("uu_appg01_server-client");
const Errors = require("../api/errors/jokes-error.js");

const WARNINGS = {
  jokeCreateUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  jokeGetUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  },
  jokeListUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  },
  jokeSetActiveUnsupportedKeys: {
    code: `${Errors.SetActive.UC_CODE}unsupportedKeys`
  },
  jokeUpdateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`
  }
};

const AUTHORITIES_PROFILE = "Authorities";

class JokesAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("jokes");
  }

  async update(awid, dtoIn) {
    let validationResult = this.validator.validate("jokeUpdateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.jokeUpdateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    let dtoOut;

    console.log(dtoIn);

    try {
      dtoOut = await this.dao.update({ ...dtoIn, awid });
    } catch(e) {
      if (e instanceof ObjectStoreError) { // A3
        throw new Errors.Update.JokeDaoUpdateFailed({uuAppErrorMap}, e);
      }
      throw e;
    }

    return {
      ...dtoOut,
      uuAppErrorMap
    };
  }

  async listRemote(awid, dtoIn, session) {
    const url = "https://uuappg01-eu-w-1.plus4u.net/uu-jokes-maing01/4ef6a7b01b5942ecbfb925b249af987f/";
    const result = await AppClient.get(`${url}joke/list`, null, { session });

    return result.data;
  }

  async create(awid, dtoIn, session, authorizationResult) {
    let validationResult = this.validator.validate("jokeCreateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.jokeCreateUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // hds 2
    dtoIn.visibility = authorizationResult.getAuthorizedProfiles().includes(AUTHORITIES_PROFILE);

    // hds 3
    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    dtoIn.uuIdentityName = session.getIdentity().getName();

    let dtoOut;
    try {
      dtoOut = await this.dao.create({...dtoIn, awid});
    } catch (e) {
      if (e instanceof ObjectStoreError) { // A3
        throw new Errors.Create.JokeDaoCreateFailed({uuAppErrorMap}, e);
      }
      throw e;
    }

    return {
      ...dtoOut,
      uuAppErrorMap
    };
  }

  async setActive(awid, dtoIn, session, authorizationResult) {
    let validationResult = this.validator.validate("jokeSetActiveDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.jokeSetActiveUnsupportedKeys.code,
      Errors.SetActive.InvalidDtoIn
    );

    // hds 2
    dtoIn.visibility = authorizationResult.getAuthorizedProfiles().includes(AUTHORITIES_PROFILE);

    // hds 3
    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    dtoIn.uuIdentityName = session.getIdentity().getName();

    let dtoOut;
    try {
      dtoOut = await this.dao.update({ ...dtoIn, awid });
    } catch (e) {
      if (e instanceof ObjectStoreError) { // A3
        throw new Errors.SetActive.JokeDaoSetActiveFailed({uuAppErrorMap}, e);
      }
      throw e;
    }

    return {
      ...dtoOut,
      uuAppErrorMap
    };
  }

  async get(awid, dtoIn) {
    let validationResult = this.validator.validate("jokeGetDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.jokeGetUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    let dtoOut;
    try {
      dtoOut = await this.dao.get(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) { // A3
        throw new Errors.Get.JokeDaoGetFailed({uuAppErrorMap}, e);
      }
      throw e;
    }

    return {
      ...dtoOut,
      uuAppErrorMap
    };
  }

  async list(awid, dtoIn) {
    let validationResult = this.validator.validate("jokeListDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.jokeListUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    let dtoOut;
    try {
      dtoOut = await this.dao.listByVisibility(awid, true, dtoIn.pageInfo);
    } catch (e) {
      if (e instanceof ObjectStoreError) { // A3
        throw new Errors.List.JokeDaoListFailed({uuAppErrorMap}, e);
      }
      throw e;
    }
    console.log('dtoOut', dtoOut);
    return {
      ...dtoOut,
      uuAppErrorMap
    };
  }

}

module.exports = new JokesAbl();

//semver
