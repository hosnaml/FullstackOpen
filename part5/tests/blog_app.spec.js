import { test, expect } from '@playwright/test';
import { loginWith, createBlog, deleteBlog, likeBlog } from './helper';

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
        await createBlog(page, 'second blog', 'Hosna Molavi', 'www.playwright.com');
        // Wait for success notification to appear first
        await page.locator('.success').waitFor({ state: 'visible' });
        // Check in the blog list specifically, not the success message
        await expect(page.locator('.blog').filter({ hasText: 'second blog' })).toBeVisible();
    })

    test('user can delete a blog they created', async ({ page }) => {
        // Set up dialog handler BEFORE triggering the delete action
        page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('confirm')
            expect(dialog.message()).toContain('Remove blog')
            await dialog.accept()
        })

        await deleteBlog(page, 'first blog');

        // Wait for success notification to appear first
        await page.locator('.success').waitFor({ state: 'visible' });
        // Check that the blog is no longer in the list
        await expect(page.locator('.blog').filter({ hasText: 'first blog' })).toHaveCount(0);
    })

    test('Ensures blogs are ordered by likes in descending order', async ({ page }) => {
        // Create additional blogs - all start with 0 likes
        await createBlog(page, 'second blog', 'Author Two', 'www.secondblog.com');
        await createBlog(page, 'third blog', 'Author Three', 'www.thirdblog.com');
        
        // Like blogs different amounts to test ordering
        // third blog - 5 likes (should be first)
        await likeBlog(page, 'third blog', 5);
        
        // second blog - 3 likes (should be second)  
        await likeBlog(page, 'second blog', 3);
        
        // first blog - 1 like (should be third)
        await likeBlog(page, 'first blog', 1);

        // Get all blog elements and check their order
        const blogs = await page.locator('.blog').all();
        
        // Extract titles in the order they appear
        const firstBlogText = await blogs[0].textContent();
        const secondBlogText = await blogs[1].textContent();
        const thirdBlogText = await blogs[2].textContent();

        // Verify the order - most likes first
        expect(firstBlogText).toContain('third blog');   // 5 likes
        expect(secondBlogText).toContain('second blog');  // 3 likes  
        expect(thirdBlogText).toContain('first blog');    // 1 like
    })
});