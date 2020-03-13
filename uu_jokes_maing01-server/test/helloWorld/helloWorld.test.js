const { TestHelper } = require("uu_appg01_workspace-test");

beforeAll(async () => {
  await TestHelper.setup();
});

afterAll(async () => {
  await TestHelper.teardown();
});

describe("Testing the hello world", () => {
  test("HDS", async () => {

    let result = await TestHelper.executeGetCommand("helloWorld");

    expect(result.status).toEqual(200);
    expect(result.data.text).toEqual("Hello world!");
    expect(result.data.uuAppErrorMap).toBeDefined();
  });
});
