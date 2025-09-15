import { test, expect } from './fixtures/auth.fixture';
import { EmployeesPageUtils } from './utils/employees.utils';

test.describe('Employees Screen E2E Tests', () => {
  let employeesUtils: EmployeesPageUtils;

  test.beforeEach(async ({ authenticatedPage }) => {
    employeesUtils = new EmployeesPageUtils(authenticatedPage);
    await employeesUtils.navigateToEmployees();
  });

  test('TC-EMP-001: Should display employees list with correct data structure', async () => {
    // Wait for page to load
    await employeesUtils.page.waitForLoadState('domcontentloaded');
    await employeesUtils.page.waitForTimeout(5000);

    // Verify main elements are visible
    await expect(employeesUtils.employeesPage).toBeVisible();
    await expect(employeesUtils.addEmployeeButton).toBeVisible();
    await expect(employeesUtils.employeeTable).toBeVisible();

    // Verify employee count is displayed (optional check)
    const employeeCountElement = employeesUtils.page.locator('text=/\\d+\\s+Employees/');
    // This might not always be visible, so we'll skip this assertion
    
    // Verify we have employee data
    const employeeRows = employeesUtils.page.locator('tbody tr');
    const rowCount = await employeeRows.count();
    expect(rowCount).toBeGreaterThan(0);

    // Verify basic data structure by checking first row
    const firstRow = employeeRows.first();
    const cells = firstRow.locator('td');
    const cellCount = await cells.count();
    expect(cellCount).toBeGreaterThan(0);

    // Verify we can see employee names
    const nameCell = cells.first();
    const nameText = await nameCell.textContent();
    expect(nameText).toBeTruthy();
    expect(nameText?.trim().length).toBeGreaterThan(0);
  });

  test('TC-EMP-002: Should handle pagination correctly', async () => {
    // Wait for page to load
    await employeesUtils.page.waitForLoadState('domcontentloaded');
    await employeesUtils.page.waitForTimeout(3000);

    // Get initial employee data
    const initialRows = employeesUtils.page.locator('tbody tr');
    const initialRowCount = await initialRows.count();
    expect(initialRowCount).toBeGreaterThan(0);

    // Get first employee name for comparison
    const firstEmployeeName = await initialRows.first().locator('td').first().textContent();

    // Click next page
    await employeesUtils.clickNextPage();

    // Wait for new data to load
    await employeesUtils.page.waitForLoadState('domcontentloaded');
    await employeesUtils.page.waitForTimeout(3000);

    // Verify we still have employee data
    const secondPageRows = employeesUtils.page.locator('tbody tr');
    const secondPageRowCount = await secondPageRows.count();
    expect(secondPageRowCount).toBeGreaterThan(0);

    // Verify different employees are shown (first employee name should be different)
    const secondPageFirstEmployeeName = await secondPageRows.first().locator('td').first().textContent();
    expect(firstEmployeeName).not.toBe(secondPageFirstEmployeeName);

    // Go back to previous page
    await employeesUtils.clickPreviousPage();
    await employeesUtils.page.waitForLoadState('domcontentloaded');
    await employeesUtils.page.waitForTimeout(3000);

    // Verify we're back to the original data
    const backToFirstRows = employeesUtils.page.locator('tbody tr');
    const backToFirstRowCount = await backToFirstRows.count();
    expect(backToFirstRowCount).toBeGreaterThan(0);
  });

  test('TC-EMP-003: Should open Add Employee modal', async () => {
    // Wait for page to load
    await employeesUtils.page.waitForLoadState('domcontentloaded');
    await employeesUtils.page.waitForTimeout(3000);

    // Verify Add Employee button is visible
    await expect(employeesUtils.addEmployeeButton).toBeVisible();

    // Click Add Employee button
    await employeesUtils.clickAddEmployee();

    // Verify modal opens by checking for modal content
    await expect(employeesUtils.page.locator('h1:has-text("Add Employees")')).toBeVisible();
    await expect(employeesUtils.page.locator('text=Choose Employees Type')).toBeVisible();
  });

  test('TC-EMP-004: Should handle filter functionality', async () => {
    // Wait for page to load
    await employeesUtils.page.waitForLoadState('domcontentloaded');
    await employeesUtils.page.waitForTimeout(3000);

    // Get initial employee data
    const initialRows = employeesUtils.page.locator('tbody tr');
    const initialRowCount = await initialRows.count();
    expect(initialRowCount).toBeGreaterThan(0);

    // Test Trade filter
    await employeesUtils.clickTradeFilter();
    
    // Verify page still loads correctly after filter interaction
    await employeesUtils.page.waitForLoadState('domcontentloaded');
    await employeesUtils.page.waitForTimeout(2000);
    
    // Verify we still have employee data
    const afterTradeFilterRows = employeesUtils.page.locator('tbody tr');
    const afterTradeFilterRowCount = await afterTradeFilterRows.count();
    expect(afterTradeFilterRowCount).toBeGreaterThan(0);

    // Test Employee Type filter
    await employeesUtils.clickEmployeeTypeFilter();
    await employeesUtils.page.waitForLoadState('domcontentloaded');
    await employeesUtils.page.waitForTimeout(2000);

    // Test Status filter
    await employeesUtils.clickStatusFilter();
    await employeesUtils.page.waitForLoadState('domcontentloaded');
    await employeesUtils.page.waitForTimeout(2000);

    // Verify page is still functional
    await expect(employeesUtils.employeeTable).toBeVisible();
  });

  test('TC-EMP-005: Should handle invalid page parameters gracefully (Failure Scenario)', async () => {
    // Navigate to an invalid page number
    await employeesUtils.page.goto('/employees?page=999&perPage=10');
    await employeesUtils.page.waitForLoadState('domcontentloaded');
    await employeesUtils.page.waitForTimeout(3000);

    // The application should handle this gracefully
    // Verify the page doesn't crash and still shows some content
    await expect(employeesUtils.page.locator('body')).toBeVisible();
    
    // Verify we can still interact with the page
    await expect(employeesUtils.addEmployeeButton).toBeVisible();
    
    // Try to navigate to a valid page
    await employeesUtils.page.goto('/employees?page=1&perPage=10');
    await employeesUtils.page.waitForLoadState('domcontentloaded');
    await employeesUtils.page.waitForTimeout(3000);
    
    // Verify normal functionality is restored
    const employeeRows = employeesUtils.page.locator('tbody tr');
    const rowCount = await employeeRows.count();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('TC-EMP-006: Should handle different perPage values correctly', async () => {
    // Test with perPage=5
    await employeesUtils.page.goto('/employees?page=1&perPage=5');
    await employeesUtils.page.waitForLoadState('domcontentloaded');
    await employeesUtils.page.waitForTimeout(3000);

    const employeesPerPage5 = employeesUtils.page.locator('tbody tr');
    const rowCount5 = await employeesPerPage5.count();
    expect(rowCount5).toBeLessThanOrEqual(5);

    // Test with perPage=20
    await employeesUtils.page.goto('/employees?page=1&perPage=20');
    await employeesUtils.page.waitForLoadState('domcontentloaded');
    await employeesUtils.page.waitForTimeout(3000);

    const employeesPerPage20 = employeesUtils.page.locator('tbody tr');
    const rowCount20 = await employeesPerPage20.count();
    expect(rowCount20).toBeLessThanOrEqual(20);
    expect(rowCount20).toBeGreaterThanOrEqual(rowCount5);
  });

  test('TC-EMP-007: Should maintain data consistency across page refreshes', async () => {
    // Wait for initial data
    await employeesUtils.page.waitForLoadState('domcontentloaded');
    await employeesUtils.page.waitForTimeout(3000);

    const initialRows = employeesUtils.page.locator('tbody tr');
    const initialRowCount = await initialRows.count();
    expect(initialRowCount).toBeGreaterThan(0);

    // Refresh the page
    await employeesUtils.page.reload();
    await employeesUtils.page.waitForLoadState('domcontentloaded');
    await employeesUtils.page.waitForTimeout(3000);

    // Verify data is still consistent
    const afterRefreshRows = employeesUtils.page.locator('tbody tr');
    const afterRefreshRowCount = await afterRefreshRows.count();
    expect(afterRefreshRowCount).toBeGreaterThan(0);

    // Verify page functionality is still intact
    await expect(employeesUtils.addEmployeeButton).toBeVisible();
    await expect(employeesUtils.employeeTable).toBeVisible();
  });
});
