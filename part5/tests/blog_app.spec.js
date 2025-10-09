import { test, expect } from '@playwright/test';
import { loginWith, createBlog } from './helper';

test.describe('Blog app', () => {

    test.beforeEach(async ({ page, request }) => {
        // Reset database first
        await request.post('/api/testing/reset');
        
        // Longer delay to ensure database operations complete fully
        await page.waitForTimeout(300);
        
        // Create a user for testing
        await request.post('/api/users', {
            data: {
                name: 'Hosna Molavi',
                username: 'hosnaml',
                password: '12345'
            }
        });

        // Navigate to the page and clear storage
        await page.goto('/');
        await page.evaluate(() => window.localStorage.clear());
        
        // Reload to ensure clean state
        await page.goto('/');
    })

    test('front page can be opened', async ({ page }) => {

        const locator = page.getByText('blogs');
        await expect(locator).toBeVisible();
        await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
    })

    test('login form can be opened', async ({ page }) => {
        
        // Click the "Log in" button to open the login form
        await page.getByRole('button', { name: 'Log in' }).click();
        
        // Now the form should be visible
        await expect(page.getByText('username')).toBeVisible();
        await expect(page.getByText('password')).toBeVisible();
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
    })

    test('user can log in', async ({ page }) => {

        await loginWith(page, 'hosnaml', '12345');

        // Check that the user is logged in by looking for the permanent user display
        // The text includes a leading space: " Hosnaml logged in"
        await expect(page.getByText(/Hosnaml logged in/)).toBeVisible();
    })

    test('login fails with wrong password', async ({ page }) => {

        await loginWith(page, 'hosnaml', 'wrong');

        await expect(page.getByText('Wrong credentials')).toBeVisible()

        const errorDiv = page.locator('.error');
        await expect(errorDiv).toContainText('Wrong credentials');
        
    })


});

test.describe('When logged in and several notes exists', () => {
    test.beforeEach(async ({ page, request }) => {
        // Reset database first
        await request.post('/api/testing/reset');
        
        // Longer delay to ensure database operations complete fully
        await page.waitForTimeout(300);
        
        // Create a user for testing
        await request.post('/api/users', {
            data: {
                name: 'Hosna Molavi',
                username: 'hosnaml',
                password: '12345'
            }
        });

        // Navigate to the page and clear storage
        await page.goto('/');
        await page.evaluate(() => window.localStorage.clear());
        
        // Reload to ensure clean state
        await page.goto('/');
        
        // First click "Log in" to open the login form
        await loginWith(page, 'hosnaml', '12345');
        await expect(page.getByText(/Hosnaml logged in/)).toBeVisible();

        await createBlog(page, 'first blog', 'Hosna Molavi', 'www.firstblog.com');
    
    })

    test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'a blog created by playwright', 'Hosna Molavi', 'www.playwright.com');
        // Wait for success notification to appear first
        await page.locator('.success').waitFor({ state: 'visible' });
        // Check in the blog list specifically, not the success message
        await expect(page.locator('.blog').filter({ hasText: 'a blog created by playwright' })).toBeVisible();
    })
});