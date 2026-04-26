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
    
    await expect(inputFieldsPage.verifyTextInput).toBeFocused();
});

test('Verify appended text value is retained in the field', async({page}) => {
    const inputFieldsPage = new InputFieldsPage(page);
    
    await expect(inputFieldsPage.appendTextInput).toHaveValue('I am good');
    
    await inputFieldsPage.appendText(' appended text');

    await expect(inputFieldsPage.appendTextInput).toHaveValue('I am good appended text');
});

test('Verify text present inside field matches expected value', async({page}) => {
    const inputFieldsPage = new InputFieldsPage(page);
    
    await expect(inputFieldsPage.verifyTextInput).toHaveValue('QA PlayGround');
});

test('Verify getAttribute return the correct input value', async({page}) => {
    const inputFieldsPage = new InputFieldsPage(page);
    
    await expect(inputFieldsPage.verifyTextInput).toHaveAttribute('value', 'QA PlayGround');
});

test('Verify input field text can be cleared successfully', async({page}) => {
    const inputFieldsPage = new InputFieldsPage(page);
    
    await expect(inputFieldsPage.clearTextInput).toHaveValue('QA PlayGround Clear Me');

    await inputFieldsPage.clearTextField();
    
    await expect(inputFieldsPage.clearTextInput).toBeEmpty();
});

test('Verify field is empty after executing clear action', async({page}) => {
    const inputFieldsPage = new InputFieldsPage(page);
    
    await expect(inputFieldsPage.clearTextInput).toHaveValue('QA PlayGround Clear Me');

    await inputFieldsPage.clearTextField();
    
    await expect(inputFieldsPage.clearTextInput).toHaveValue('');
});

test('Verify disabled input field cannot be edited by user', async({page}) => {
    const inputFieldsPage = new InputFieldsPage(page);
    
    await expect(inputFieldsPage.disabledInput).toHaveAttribute('disabled');

    await expect(inputFieldsPage.tryToFillDisabledInput('Trying to type')).rejects.toThrow();
});

test('Verify isEnabled() return false for disabled input', async({page}) => {
    const inputFieldsPage = new InputFieldsPage(page);
    
    await expect(inputFieldsPage.disabledInput).toBeDisabled();
});

test('Verify readonly input field does not accept user typing', async({page}) => {
    const inputFieldsPage = new InputFieldsPage(page);
    
    await inputFieldsPage.tryToFillReadonlyInput('Trying to type');

    await expect(inputFieldsPage.readonlyInput).toHaveValue('This text is readonly');
});

test('Verify getAttribute returns correct readonly attribute value', async({page}) => {
    const inputFieldsPage = new InputFieldsPage(page);
    
    await expect(inputFieldsPage.readonlyInput).toHaveAttribute('readonly');
});
