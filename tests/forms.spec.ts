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

test('Verify invalid email format shows validation error', async({page}) => {
    const formsPage = new FormsPage(page);

    await formsPage.fillEmail('notanemail');
    await formsPage.submitForm();

    await expect(formsPage.emailError).toHaveText('Enter a valid email address.');
});

test('Verify invalid phone number format shows error', async({page}) => {
    const formsPage = new FormsPage(page);

    await formsPage.fillPhone('12345');
    await formsPage.submitForm();

    await expect(formsPage.phoneError).toHaveText('Enter a valid 10-digit phone number.');
});

test('Verify password minimum length validation', async({page}) => {
    const formsPage = new FormsPage(page);

    await formsPage.fillPassword('abc');
    await formsPage.submitForm();

    await expect(formsPage.passwordError).toHaveText('Password must be at least 6 characters.');
});

test('Verify password mismatch shows confirm password error', async({page}) => {
    const formsPage = new FormsPage(page);

    await formsPage.fillAccountDetails('pass123', 'pass456');
    await formsPage.submitForm();

    await expect(formsPage.confirmPasswordError).toHaveText('Passwords do not match.');
});

test('Verify T&C checkbox required error appears', async({page}) => {
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

    await formsPage.submitForm();

    await expect(formsPage.termsError).toHaveText('You must accept the terms.');
});

test('Verify success message displays submitted name', async({page}) => {
    const formsPage = new FormsPage(page);
    const firstName = 'Jane';
    const lastName = 'Smith';

    await formsPage.fillPersonalDetails({
        firstName,
        lastName,
        email: 'jame@example.com',
        phone: '9876543210',
        dob: '1990-05-21',
        gender: 'female',
    });

    await formsPage.fillAddress({
        country: 'India',
        city: 'Mumbai',
    });

    await formsPage.fillAccountDetails('pass123');

    await formsPage.acceptTerms();

    await formsPage.submitForm();

    await expect(formsPage.formSuccessMessage).toBeVisible();
    await expect(formsPage.formSubmittedName).toContainText(`${firstName} ${lastName}`);
});

test('Verify reset button clears all fields', async({page}) => {
    const formsPage = new FormsPage(page);

    await formsPage.fillFirstName('John');

    await formsPage.fillEmail('john@example.com');

    await formsPage.resetForm();

    await expect(formsPage.firstNameInput).toHaveValue('');
    await expect(formsPage.emailInput).toHaveValue('');
    await expect(formsPage.firstNameError).toBeHidden();
    await expect(formsPage.emailError).toBeHidden();
});

test('Verify gender radio button selection', async({page}) => {
    const formsPage = new FormsPage(page);

    await formsPage.selectGender('female');

    await expect (await formsPage.genderFemaleRadio.isChecked()).toBeTruthy();
    await expect (await formsPage.genderMaleRadio.isChecked()).toBeFalsy();
    await expect (await formsPage.genderOtherRadio.isChecked()).toBeFalsy()
});

test('Verify country dropdown selection', async({page}) => {
    const formsPage = new FormsPage(page);
    const country = 'USA';

    await formsPage.selectCountry(country);

    await expect(formsPage.countryDropdown).toHaveText(country);
});
