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
- Custom Playwright fixtures
- API testing with Playwright
- Multi-project configuration (UI + API + environments)
- CI integration
- Preparation for API + UI integration testing

---

## Test Targets

### QA Playground (UI)
Used for UI automation practice:
- Input field interactions
- Form filling
- Validation scenarios
- Disabled and readonly behavior
- Keyboard interactions
- Console error monitoring
Base URL:
```
https://www.qaplayground.com
```

### JSONPlaceholder (API)
Used for API testing practice:
- Get all posts
- Get a single post
- Validate 404 responses
- Create a post
Base URL:
```
https://jsonplaceholder.typicode.com
```

### Conduit / RealWorld (Planned)
The project is prepared for integration with Conduit (RealWorld) to support:
- UI login
- API login
- Article creation
- API-driven test setup
- UI validation of backend data
- Cleanup via API

---

## Project Structure

```text
playwright-training/
├── api/
│   └── PostsApi.ts
├── fixtures/
│   └── test.fixture.ts
├── pages/
│   ├── FormsPage.ts
│   └── InputFieldsPage.ts
├── tests/
│   ├── api/
│   │   └── jsonplaceholder-posts.spec.ts
│   ├── forms.spec.ts
│   ├── input-fields-advance.spec.ts
│   └── input-fields-beginner.spec.ts
├── playwright.config.ts
├── package.json
└── README.md
```

---

## Playwright Projects Configuration

The project uses multi-project configuration to separate environments:
- QA Playground (UI tests, multi-browser)
- JSONPlaceholder (API tests, no browser needed)
- Conduit (prepared for UI + API)
This avoids conflicts between different base URLs and enables scalable test execution.

---

## Getting Started

```bash
git clone https://github.com/gabrielsarriavillada/playwright-training.git
cd playwright-training
npm ci
npm run install:browsers
```
> Requires Node.js 18+

---

## Running Tests

```bash
npm test                                # run all tests
npm run test:headed                     # run with browser UI
npm run test:ui                         # Playwright UI mode
npm run test:api                        # run API tests
npm run test:debug                      # run on debug mode
npm run test:qa-playground-chromium     # run UI tests for qa-playground on chromium
npm run test:qa-playground-firefox      # run UI tests for qa-playground on firefox
npm run test:qa-playground-webkit       # run UI tests for qa-playground on webkit
npm run test:smoke                      # run smoke test suite
```

---

## Test Report

After running tests:

```bash
npm run test:report
```

---

## CI Integration

GitHub Actions workflow runs tests on push and pull requests.

---

## Design Principles

- Tests focus on behavior, not implementation details
- No hardcoded URLs in tests or page objects
- Use fixtures for dependency injection (POM)
- Keep page objects simple and readable
- Use API clients for reusable request logic
- Separate UI and API concerns
- Keep configuration environment-driven
- Ensure tests are CI-ready

---

## Next Steps

- Add Conduit UI tests
- Add Conduit API client
- Implement API + UI integration tests
- Add authentication/session handling
- Improve test data management
- Add AI-assisted QA examples

---

## Tech Stack

- Playwright
- TypeScript
- Page Object Model (POM)
- Custom fixtures
- API testing (`request`)
- Multi-project Playwright configuration
- GitHub Actions
- ESLint + Prettier
- dotenv