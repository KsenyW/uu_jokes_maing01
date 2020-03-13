// const { TestHelper } = require("uu_appg01_workspace-test");
const {TestHelper} = require("uu_appg01_server-test");

beforeAll(async () => {
  await TestHelper.setup();
  await TestHelper.initApp();
});

afterAll(async () => {
  await TestHelper.teardown();
});

describe("Testing how jokes creates", () => {
  test("HDS", async () => {
    let dtoIn = {
      name: 'This is me joke',
      text: 'You must to laugh here',
    };

    let result = await TestHelper.executePostCommand("jokes/create", dtoIn);

    console.log(result);

    expect(result.data.name).toEqual(dtoIn.name);
    expect(result.data.text).toEqual(dtoIn.text);
    expect(result.data.uuAppErrorMap).toEqual({});
  });
});
