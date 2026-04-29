import { APIRequestContext } from "@playwright/test";

type RegisterUserData = {
  username: string;
  email: string;
  password: string;
};

type LoginUserData = {
  email: string;
  password: string;
};

export class ConduitApi {
  constructor(private request: APIRequestContext) {}

  async registerUser(data: RegisterUserData) {
    return this.request.post("users", {
      data: {
        user: data,
      },
    });
  }

  async loginUser(data: LoginUserData) {
    return this.request.post("users/login", {
      data: {
        user: data,
      },
    });
  }

  async getCurrentUser(token: string) {
    return this.request.get("user", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  }

  async createUserAndGetToken() {
    const timestamp = Date.now();
    const user = {
        username: `gsv_${timestamp}`,
        email: `gsv_${timestamp}@test.com`,
        password: `Testing1234!`,
    };

    const response = await this.registerUser(user);
    const body = await response.json();

    return {
        user,
        token: body.user.token,
    };
  }
}
