import { test, expect } from "@playwright/test";
import { ConduitApi } from "../../../api/ConduitApi";

test.describe("Conduit Auth API", () => {
  test("should register a new user and ger current user", async ({
    request,
  }) => {
    console.log("BASE URL:", test.info().project.use.baseURL);
    const conduitApi = new ConduitApi(request, process.env.CONDUIT_API_BASE_URL || "https://api.realworld.show/api");

    const timestamp = Date.now();
    const user = {
      username: `gsv_${timestamp}`,
      email: `gsv_${timestamp}@test.com`,
      password: `Testing1234!`,
    };

    const registerResponse = await conduitApi.registerUser(user);
    await expect(registerResponse).toBeOK();

    const registerBody = await registerResponse.json();

    expect(registerBody.user.username).toBe(user.username);
    expect(registerBody.user.email).toBe(user.email);
    expect(registerBody.user.token).toBeTruthy();

    const currentUserResponse = await conduitApi.getCurrentUser(
      registerBody.user.token,
    );

    await expect(currentUserResponse).toBeOK();

    const currentUserBody = await currentUserResponse.json();

    expect(currentUserBody.user.email).toBe(user.email);
    expect(currentUserBody.user.username).toBe(user.username);
  });
});
