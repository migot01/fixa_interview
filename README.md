# Fixa HR Employees Screen E2E Tests

This repository contains end-to-end tests for the Fixa HR employees screen using Playwright and TypeScript.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository and navigate to the project directory:
```bash
cd fixa_interview
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

4. Set up environment variables:
```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your test credentials
# FIXA_EMAIL=your-email@example.com
# FIXA_PASSWORD=your-password
```

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Headed Mode (with browser UI)
```bash
npm run test:headed
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```

### Run Tests with UI Mode (Interactive)
```bash
npm run test:ui
```

### Run Specific Test File
```bash
npx playwright test tests/employees.spec.ts
```

### Run Tests for Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## 📊 Test Reports

After running tests, view the HTML report:
```bash
npm run test:report
```

## 🏗️ Project Structure

```
fixa_interview/
├── tests/
│   ├── fixtures/
│   │   ├── auth.fixture.ts      # Authentication fixture
│   │   └── test-data.ts         # Test data and selectors
│   ├── utils/
│   │   └── employees.utils.ts   # Page object utilities
│   └── employees.spec.ts        # Main test file
├── playwright.config.ts         # Playwright configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## 🧪 Test Cases

### TC-EMP-001: Employee Data Display
- **Purpose**: Verify employees list displays with correct data structure
- **Coverage**: Data validation, UI elements visibility, employee count
- **Assertions**: 7+ assertions covering data integrity

### TC-EMP-002: Pagination Functionality
- **Purpose**: Test pagination controls and data consistency
- **Coverage**: Next/Previous navigation, page number validation
- **Assertions**: Page navigation, data changes between pages

### TC-EMP-003: Add Employee Modal
- **Purpose**: Test Add Employee modal open/close functionality
- **Coverage**: Modal interactions, UI state management
- **Assertions**: Modal visibility, content validation

### TC-EMP-004: Filter Functionality
- **Purpose**: Test filter controls (Trade, Employee Type, Status)
- **Coverage**: Filter interactions, page stability
- **Assertions**: Filter button functionality, page stability

### TC-EMP-005: Error Handling (Failure Scenario)
- **Purpose**: Test application behavior with invalid parameters
- **Coverage**: Error handling, graceful degradation
- **Assertions**: Application stability, recovery functionality

### TC-EMP-006: Per-Page Functionality
- **Purpose**: Test different perPage parameter values
- **Coverage**: Data pagination with different page sizes
- **Assertions**: Page size validation, pagination updates

### TC-EMP-007: Data Consistency
- **Purpose**: Test data consistency across page refreshes
- **Coverage**: State persistence, data integrity
- **Assertions**: Data consistency, functionality restoration

## 🔧 Configuration

### Playwright Configuration
- **Base URL**: `https://app.staging.fixahr.com`
- **Browsers**: Chromium, Firefox, WebKit
- **Retries**: 2 on CI, 0 locally
- **Screenshots**: On failure only
- **Videos**: Retained on failure
- **Traces**: On first retry

### Environment Variables

The test suite uses environment variables for configuration. Create a `.env` file based on `.env.example`:

```bash
# Fixa HR Test Credentials
FIXA_EMAIL=your-email
FIXA_PASSWORD=your-password

# Test Configuration
FIXA_BASE_URL=https://app.staging.fixahr.com
FIXA_LOGIN_URL=/login
FIXA_EMPLOYEES_URL=/employees
```

**Security Note**: Never commit the `.env` file to version control. The `.env.example` file shows the required variables without sensitive data.

## 🏛️ Architecture

### Page Object Model
The tests use a Page Object Model pattern with:
- **Auth Fixture**: Handles authentication setup
- **Employees Utils**: Encapsulates page interactions
- **Test Data**: Centralized test data and selectors

### Best Practices Implemented
- ✅ **Stable Selectors**: Using data attributes and semantic selectors
- ✅ **Wait Conditions**: Proper waiting for network and DOM states
- ✅ **Error Handling**: Graceful handling of failures
- ✅ **Data Validation**: Comprehensive data structure validation
- ✅ **Reusable Components**: Modular and maintainable code
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Parallel Execution**: Tests run in parallel for efficiency

## 🐛 Debugging

### Debug Mode
Run tests in debug mode to step through execution:
```bash
npm run test:debug
```

### Trace Viewer
View detailed execution traces:
```bash
npx playwright show-trace test-results/trace.zip
```

### Screenshots and Videos
- Screenshots are saved on test failures
- Videos are recorded for failed tests
- All artifacts are stored in `test-results/`

## 📈 CI/CD Integration

### GitHub Actions Example
```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

## 🔍 Troubleshooting

### Common Issues

1. **Browser Installation Issues**
   ```bash
   npx playwright install --force
   ```

2. **Authentication Failures**
   - Verify credentials in `test-data.ts`
   - Check if the staging environment is accessible

3. **Flaky Tests**
   - Increase wait timeouts
   - Add more specific wait conditions
   - Check for race conditions

4. **Selector Issues**
   - Use Playwright Inspector: `npx playwright codegen`
   - Update selectors in `employees.utils.ts`

## 📝 Contributing

1. Follow the existing code structure
2. Add new tests to `employees.spec.ts`
3. Update utilities in `employees.utils.ts`
4. Add new test data to `test-data.ts`
5. Update this README if needed

## 📄 License

This project is for testing purposes only.
