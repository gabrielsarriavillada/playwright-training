import { test as base, expect } from "@playwright/test";
import { InputFieldsPage } from "../pages/InputFieldsPage";
import { FormsPage } from "../pages/FormsPage";
import { ConduitLoginPage } from "../pages/conduit/ConduitLoginPage";

type Pages = {
  inputFieldsPage: InputFieldsPage;
  formsPage: FormsPage;
  conduitLoginPage: ConduitLoginPage;
};

export const test = base.extend<Pages>({
  inputFieldsPage: async ({ page }, use) => {
    await use(new InputFieldsPage(page));
  },
  formsPage: async ({ page }, use) => {
    await use(new FormsPage(page));
  },
  conduitLoginPage: async ({ page }, use) => {
    await use(new ConduitLoginPage(page));
  },
});

export { expect };
