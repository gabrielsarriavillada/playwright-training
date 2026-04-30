import { test, expect } from "../../../fixtures/test.fixture";

test.describe("Conduit login flow", () => {
  test("should login through UI an API-created user", async ({
    conduitApi,
    conduitLoginPage,
    page,
  }) => {
    const { user } = await conduitApi.createUserAndGetToken();

    await conduitLoginPage.open();

    await conduitLoginPage.login(user.email, user.password);

    await expect(page.getByText(user.username)).toBeVisible();
  });
});
