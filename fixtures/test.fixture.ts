import { test as base } from '@playwright/test';
import { InputFieldsPage } from '../pages/InputFieldsPage';

type MyFixtures = {
    inputFieldsPage: InputFieldsPage;
};

export const test = base.extend<MyFixtures>({
    inputFieldsPage: async ({ page }, use) => {
        const inputPage = new InputFieldsPage(page);
        await use(inputPage);
    },
});

export { expect } from '@playwright/test';
