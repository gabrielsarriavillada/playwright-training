import { test as base, expect } from '@playwright/test';
import { InputFieldsPage } from '../pages/InputFieldsPage';
import { FormsPage } from '../pages/FormsPage';

type Pages = {
    inputFieldsPage: InputFieldsPage;
    formsPage: FormsPage
};

export const test = base.extend<Pages>({
    inputFieldsPage: async ({ page }, use) => {
        await use(new InputFieldsPage(page));
    },
    formsPage: async ({ page }, use) => {
        await use(new FormsPage(page));
    },
});

export { expect };
