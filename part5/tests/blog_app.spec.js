import { test, expect } from '@playwright/test';
import { loginWith, createBlog } from './helper';

test.describe('Blog app', () => {

    test.beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset');
        
        // Create a user for testing
        await request.post('/api/users', {
            data: {
                name: 'Hosna Molavi',
                username: 'hosnaml',
                password: '12345'
            }
        });

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
        await expect(page.getByText('Hosnaml logged in')).toBeVisible();
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
        await request.post('/api/testing/reset');
        
        // Create a user for testing
        await request.post('/api/users', {
            data: {
                name: 'Hosna Molavi',
                username: 'hosnaml',
                password: '12345'
            }
        });

        await page.goto('/');
        // First click "Log in" to open the login form
        await loginWith(page, 'hosnaml', '12345');
        await expect(page.getByText('Hosnaml logged in')).toBeVisible();

        await createBlog(page, 'first blog', 'Hosna Molavi', 'www.firstblog.com');
    
    })

    test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'a blog created by playwright', 'Hosna Molavi', 'www.playwright.com');
        await expect(page.getByText('A new blog "a blog created by playwright" by Hosna Molavi added ', { exact: false })).toBeVisible();
    })
});