import { test, expect } from '@playwright/test';
import { FormsPage } from '../pages/FormsPage';

test.beforeEach(async ({ page }) => {
    const formsPage = new FormsPage(page);
    await formsPage.open();
});

test('Fill all fields with valid data and submit successfully', async({page}) => {
    const formsPage = new FormsPage(page);

    await formsPage.fillPersonalDetails({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '9876543210',
        dob: '1990-05-21',
        gender: 'male',
    });

    await formsPage.fillAddress({
        country: 'India',
        city: 'Mumbai',
    });

    await formsPage.fillAccountDetails('pass123');

    await formsPage.acceptTerms();

    await formsPage.submitForm();

    await expect(formsPage.formSuccessMessage).toBeVisible();
});

test('Verify required field errors appear on empty submit', async({page}) => {
    const formsPage = new FormsPage(page);

    await formsPage.submitForm();

    await expect(formsPage.firstNameError).toHaveText('First name is required.');
    await expect(formsPage.lastNameError).toHaveText('Last name is required.');
    await expect(formsPage.emailError).toHaveText('Email is required.');
    await expect(formsPage.phoneError).toHaveText('Phone number is required.');
    await expect(formsPage.dobError).toHaveText('Date of birth is required.');
    await expect(formsPage.genderError).toHaveText('Please select a gender.');
    await expect(formsPage.countryError).toHaveText('Please select a country.');
    await expect(formsPage.cityError).toHaveText('City is required.');
    await expect(formsPage.passwordError).toHaveText('Password is required.');
    await expect(formsPage.confirmPasswordError).toHaveText('Please confirm your password.');
    await expect(formsPage.termsError).toHaveText('You must accept the terms.');
});
