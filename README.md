# Playwright Training Framework (TypeScript + POM)

A structured end-to-end testing project built with Playwright and TypeScript, designed to evolve from basic test automation into a scalable, maintainable framework using the Page Object Model (POM).

---

## Purpose

This project demonstrates:

- Transition from beginner to structured Playwright tests
- Implementation of Page Object Model (POM)
- Clean test design and separation of concerns
- Real-world input field validations and UI behaviors
- Foundations for scalable test automation frameworks

---

## Testing Approach

This project includes two levels of test maturity:

### Beginner Tests
- Direct use of `page`
- Locators inside test files
- Repeated setup per test

### Advanced Tests
- Page Object Model (POM)
- Centralized locators
- Reusable actions
- `beforeEach` setup

This demonstrates the evolution from basic Playwright usage to a more scalable and maintainable test structure.

---

## Project Structure

```text
.
├── pages/                     # Page Object Models
│   └── InputFieldsPage.ts
│
├── tests/                     # Test specs
│   ├── input-fields-beginner.spec.ts
│   └── input-fields-advance.spec.ts
│
├── .github/workflows/         # CI pipeline (GitHub Actions)
│   └── playwright.yml
│
├── playwright.config.ts       # Playwright configuration
├── package.json
└── README.md
```

---

## Getting Started

```bash
git clone https://github.com/gabrielsarriavillada/playwright-training.git
cd playwright-training
npm ci
npx playwright install --with-deps
```
> Requires Node.js 18+

---

## Running Tests

```bash
npm test                # run all tests
npm run test:headed     # run with browser UI
npm run test:ui         # Playwright UI mode
npm run report          # open HTML report
```

---

## Test Report

After running tests:

```bash
npm run report
```

---

## CI Integration

GitHub Actions workflow runs tests on push and pull requests.

---

## Covered Scenarios

- Input validation
- Placeholder behavior
- Keyboard navigation
- Disabled and readonly fields

---

## Design Principles

- Separation of concerns
- Reusable page objects
- Clean and readable tests

---

## Improvements

- Add fixtures
- Introduce test data layer
- Configure baseURL

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions