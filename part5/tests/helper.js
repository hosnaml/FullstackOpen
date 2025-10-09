const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'Log in' }).click()
  await page.getByLabel('username').waitFor({ state: 'visible' })
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
  // Increased delay to allow login to process and UI to update
  await page.waitForTimeout(500)
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'Click to create a new blog' }).click();
    await page.locator('input[name="Title"]').fill(title);
    await page.locator('input[name="Author"]').fill(author);
    await page.locator('input[name="URL"]').fill(url);
    await page.getByRole('button', { name: 'create' }).click();
    // Small delay to allow form to close and state to update
    await page.waitForTimeout(300)
    // Wait for the blog to appear
    await page.locator('.blog').filter({ hasText: title }).waitFor({ state: 'visible' });
}

export { loginWith, createBlog }
