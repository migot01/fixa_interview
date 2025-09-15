// Load environment variables
require('dotenv').config();

export const TEST_DATA = {
  credentials: {
    email: process.env.FIXA_EMAIL || 'tafara@fixarwanda.com',
    password: process.env.FIXA_PASSWORD || '0784526338Mit2@'
  },
  urls: {
    login: process.env.FIXA_LOGIN_URL || '/login',
    employees: process.env.FIXA_EMPLOYEES_URL || '/employees',
    employeesWithPagination: '/employees?page=1&perPage=10'
  },
  expectedData: {
    employeeTypes: ['special', 'casual(gross)', 'permanent(net)', 'permanent(gross)', 'casual(contract-test)', 'casual(net)'],
    trades: ['Plumber'],
    statuses: ['active', 'inactive'],
    expectedEmployeeCount: 474
  },
  testPages: {
    validPages: [1, 2, 3],
    invalidPages: [999, -1, 0],
    perPageValues: [5, 10, 20, 50]
  }
};

export const SELECTORS = {
  login: {
    usernameInput: 'input[type="text"], input[name="username"], input[placeholder*="Username"], input[placeholder*="username"]',
    passwordInput: 'input[type="password"], input[name="password"], input[placeholder*="Password"], input[placeholder*="password"]',
    submitButton: 'button[type="submit"]'
  },
  employees: {
    addEmployeeButton: 'button:has-text("Add Employee")',
    employeeTable: 'table, [role="table"], .table',
    employeeRows: 'tbody tr, [role="row"]',
    paginationNext: 'a[aria-label="Go to next page"]',
    paginationPrevious: 'a[aria-label="Go to previous page"]',
    tradeFilter: 'button:has-text("Trade")',
    employeeTypeFilter: 'button:has-text("Employee Type")',
    statusFilter: 'button:has-text("Status")',
    employeeCount: 'text=/\\d+\\s+Employees/',
    addEmployeeModal: '[role="dialog"], .modal, .dialog',
    addEmployeeBackButton: 'button:has-text("Back")'
  }
};
