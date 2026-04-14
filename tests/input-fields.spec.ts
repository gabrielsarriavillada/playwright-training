import { test, expect } from '@playwright/test';

test('Verify successful movie name input', async({page}) => {
    await page.goto('https://www.qaplayground.com/practice/input-fields');
    await page.getByTestId('input-movie-name').fill('Die hard');
    expect(page.getByTestId('input-movie-name')).toHaveValue('Die hard');
});

test('Verify input placeholder disappears on typing', async({page}) => {
    await page.goto('https://www.qaplayground.com/practice/input-fields');
    expect(page.getByTestId('input-movie-name')).toHaveAttribute('placeholder', 'Enter hollywood movie name');
    expect(page.locator('[data-testid=input-movie-name]:placeholder-shown')).toBeVisible();
    await page.getByTestId('input-movie-name').fill('Die hard');
    expect(page.locator('[data-testid=input-movie-name]:placeholder-shown')).toBeHidden();
});

test('Verify keyboard tab triggers focus change after append', async({page}) => {
    await page.goto('https://www.qaplayground.com/practice/input-fields');
    await(page.getByTestId('input-append-text')).focus();
    expect(page.getByTestId('input-append-text')).toBeFocused();
    expect(page.getByTestId('input-append-text')).toHaveValue('I am good');
    await page.keyboard.press('Tab');
    expect(page.getByTestId('input-verify-text')).toBeFocused();
});

test('Verify appended text value is retained in the field', async({page}) => {
    await page.goto('https://www.qaplayground.com/practice/input-fields');
    expect(page.getByTestId('input-append-text')).toHaveValue('I am good');
    await(page.getByTestId('input-append-text')).click();
    await (page.getByTestId('input-append-text')).press('End');
    await(page.getByTestId('input-append-text')).pressSequentially(' appended text');
    expect(page.getByTestId('input-append-text')).toHaveValue('I am good appended text');
});

test('Verify text present inside field matches expected value', async({page}) => {
    await page.goto('https://www.qaplayground.com/practice/input-fields');
    expect(page.getByTestId('input-verify-text')).toHaveValue('QA PlayGround');
});

// test('Verify getAttribute return the correct input value', async({page}) => {

// });

// test('Verify input field text can be cleared successfully', async({page}) => {

// });

// test('Verify field is empty after executing clear action', async({page}) => {

// });

// test('Verify disabled input field cannot be edited by user', async({page}) => {

// });

// test('Verify isEnabled() return false for disabled input', async({page}) => {

// });

// test('Verify readonly input field does not accept user typing', async({page}) => {

// });

// test('Verify getAttribute returns correct readonly attribute value', async({page}) => {

// });
