import { test, expect } from "../../../fixtures/test.fixture";
import { ConduitApi } from "../../../api/ConduitApi";

test.describe("Conduit login flow", () => {
  test("should login through UI an API-created user", async ({
    request,
    conduitLoginPage,
    page,
  }) => {
    const conduitApi = new ConduitApi(
      request,
      process.env.CONDUIT_API_BASE_URL || "https://api.realworld.show/api",
    );

    const { user } = await conduitApi.createUserAndGetToken();

    await conduitLoginPage.open();

    expect(page.url()).toBe("https://demo.realworld.show/login");

    await conduitLoginPage.login(user.email, user.password);

    await expect(page.getByText(user.username)).toBeVisible();
  });
});
