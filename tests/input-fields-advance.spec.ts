import { test, expect } from '@playwright/test';
import { InputFieldsPage } from '../pages/InputFieldsPage';

test.beforeEach(async ({ page }) => {
    const inputFieldsPage = new InputFieldsPage(page);
    await inputFieldsPage.open();
});

test('Verify successful movie name input', async({page}) => {
    const inputFieldsPage = new InputFieldsPage(page);
    
    await inputFieldsPage.fillMovieName('Die Hard');
    
    await expect(inputFieldsPage.movieNameInput).toHaveValue('Die Hard');
});

test('Verify input placeholder disappears on typing', async({page}) => {
    const inputFieldsPage = new InputFieldsPage(page);
    
    await expect(inputFieldsPage.movieNameInput).toHaveAttribute('placeholder', 'Enter hollywood movie name');
    await expect(inputFieldsPage.movieNamePlaceholderShown).toBeVisible();

    await inputFieldsPage.fillMovieName('Die Hard');

    await expect(inputFieldsPage.movieNamePlaceholderShown).toBeHidden();
});

test('Verify keyboard tab triggers focus change after append', async({page}) => {
    const inputFieldsPage = new InputFieldsPage(page);
    
    await inputFieldsPage.focusAppendText();

    await expect(inputFieldsPage.appendTextInput).toBeFocused();
    await expect(inputFieldsPage.appendTextInput).toHaveValue('I am good');
    
    await inputFieldsPage.tabToNextField();
    
    expect(inputFieldsPage.verifyTextInput).toBeFocused();
});

test('Verify appended text value is retained in the field', async({page}) => {
    const inputFieldsPage = new InputFieldsPage(page);
    
    await expect(inputFieldsPage.appendTextInput).toHaveValue('I am good');
    
    await inputFieldsPage.appendText(' appended text');

    await expect(inputFieldsPage.appendTextInput).toHaveValue('I am good appended text');
});

test('Verify text present inside field matches expected value', async({page}) => {
    expect(page.getByTestId('input-verify-text')).toHaveValue('QA PlayGround');
});

test('Verify getAttribute return the correct input value', async({page}) => {
    expect(page.getByTestId('input-verify-text')).toHaveAttribute('value', 'QA PlayGround');

});

test('Verify input field text can be cleared successfully', async({page}) => {
    expect(page.getByTestId('input-clear-text')).toHaveValue('QA PlayGround Clear Me');
    await (page.getByTestId('input-clear-text')).fill('');
    expect(page.getByTestId('input-clear-text')).toBeEmpty();
});

test('Verify field is empty after executing clear action', async({page}) => {
    expect(page.getByTestId('input-clear-text')).toHaveValue('QA PlayGround Clear Me');
    await (page.getByTestId('input-clear-text')).fill('');
    expect(page.getByTestId('input-clear-text')).toHaveValue('');
});

test('Verify disabled input field cannot be edited by user', async({page}) => {
    expect(page.getByTestId('input-disabled')).toHaveAttribute('disabled');
    await expect(page.getByTestId('input-disabled').fill('Trying to type', { timeout: 1000 }))
    .rejects.toThrow();
});

test('Verify isEnabled() return false for disabled input', async({page}) => {
    expect(page.getByTestId('input-disabled')).toBeDisabled();
});

test('Verify readonly input field does not accept user typing', async({page}) => {
    await page.getByTestId('input-readonly').fill('Trying to type', { force: true });
    expect(page.getByTestId('input-readonly')).toHaveValue('This text is readonly');
});

test('Verify getAttribute returns correct readonly attribute value', async({page}) => {
    expect(page.getByTestId('input-readonly')).toHaveAttribute('readonly');
});
