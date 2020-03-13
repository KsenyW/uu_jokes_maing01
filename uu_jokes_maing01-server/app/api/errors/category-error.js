"use strict";

const JokesMainUseCaseError = require("./jokes-main-use-case-error.js");
const CATEGORY_ERROR_PREFIX = `${JokesMainUseCaseError.ERROR_PREFIX}category/`;

const Create = {
  UC_CODE: `${CATEGORY_ERROR_PREFIX}create/`,
  
};

module.exports = {
  Create
};
