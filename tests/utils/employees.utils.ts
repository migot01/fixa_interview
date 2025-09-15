import { Page, Locator } from '@playwright/test';
import { TEST_DATA } from '../fixtures/test-data';

export class EmployeesPageUtils {
  constructor(private page: Page) {}

  // Selectors
  get employeesPage() {
    return this.page.locator('h1:has-text("Employees")');
  }

  get addEmployeeButton() {
    return this.page.locator('button:has-text("Add Employee")');
  }

  get employeeTable() {
    return this.page.locator('table').first();
  }

  get employeeRows() {
    return this.page.locator('tbody tr');
  }

  get paginationContainer() {
    return this.page.locator('[data-slot="pagination-link"], .pagination, .pager');
  }

  get nextPageButton() {
    return this.page.locator('a[aria-label="Go to next page"]');
  }

  get previousPageButton() {
    return this.page.locator('a[aria-label="Go to previous page"]');
  }

  get tradeFilterButton() {
    return this.page.locator('button:has-text("Trade")');
  }

  get employeeTypeFilterButton() {
    return this.page.locator('button:has-text("Employee Type")');
  }

  get statusFilterButton() {
    return this.page.locator('button:has-text("Status")');
  }

  get employeeCount() {
    return this.page.locator('text=/\\d+\\s+Employees/');
  }

  get addEmployeeModal() {
    return this.page.locator('[role="dialog"], .modal, .dialog');
  }

  get addEmployeeBackButton() {
    return this.page.locator('button:has-text("Back")');
  }

  // Actions
  async navigateToEmployees() {
    await this.page.goto(`${TEST_DATA.urls.employees}?page=1&perPage=10`);
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(3000); // Additional wait for data to load
  }

  async clickAddEmployee() {
    await this.addEmployeeButton.click();
    await this.page.waitForTimeout(1000); // Wait for modal to open
  }

  async closeAddEmployeeModal() {
    await this.addEmployeeBackButton.click();
    await this.page.waitForTimeout(1000); // Wait for modal to close
  }

  async clickNextPage() {
    await this.nextPageButton.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }

  async clickPreviousPage() {
    await this.previousPageButton.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }

  async clickTradeFilter() {
    await this.tradeFilterButton.click();
    await this.page.waitForTimeout(500);
  }

  async clickEmployeeTypeFilter() {
    await this.employeeTypeFilterButton.click();
    await this.page.waitForTimeout(500);
  }

  async clickStatusFilter() {
    await this.statusFilterButton.click();
    await this.page.waitForTimeout(500);
  }

  async getCurrentPageNumber(): Promise<number> {
    const pageNumberText = await this.page.locator('text=/Showing/').textContent();
    const match = pageNumberText?.match(/(\d+)/);
    return match ? parseInt(match[1]) : 1;
  }

  async getTotalPages(): Promise<number> {
    const paginationText = await this.page.locator('text=/\\d+\\s*Previous/').textContent();
    const match = paginationText?.match(/(\d+)/);
    return match ? parseInt(match[1]) : 1;
  }

  async getEmployeeCount(): Promise<number> {
    const countText = await this.employeeCount.textContent();
    const match = countText?.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  async getEmployeeData() {
    const rows = await this.employeeRows.all();
    const employees = [];
    
    for (const row of rows) {
      const cells = await row.locator('td, [role="gridcell"]').all();
      if (cells.length > 0) {
        const name = await cells[0]?.textContent() || '';
        const systemId = await cells[1]?.textContent() || '';
        const employeeId = await cells[2]?.textContent() || '';
        const employeeType = await cells[3]?.textContent() || '';
        const phoneNumber = await cells[4]?.textContent() || '';
        const trade = await cells[5]?.textContent() || '';
        const status = await cells[6]?.textContent() || '';
        
        employees.push({
          name: name.trim(),
          systemId: systemId.trim(),
          employeeId: employeeId.trim(),
          employeeType: employeeType.trim(),
          phoneNumber: phoneNumber.trim(),
          trade: trade.trim(),
          status: status.trim()
        });
      }
    }
    
    return employees;
  }

  async waitForEmployeeData() {
    try {
      await this.page.waitForSelector('tbody tr', { timeout: 15000 });
    } catch (error) {
      // If table rows not found, wait for any employee data to appear
      await this.page.waitForSelector('text=/\\d+\\s+Employees/', { timeout: 10000 });
    }
  }
}
