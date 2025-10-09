const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'Log in' }).click()
  await page.getByLabel('username').waitFor({ state: 'visible' })
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
  // Increased delay to allow login to process and UI to update
  await page.waitForTimeout(500)
}

const createBlog = async (page, title, author, url, likes) => {
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

const deleteBlog = async (page, title) => {
  // First, click view to show the remove button
  await page.locator('.blog')
      .filter({ hasText: title })
      .getByRole('button', { name: 'view' })
      .click()

  // Then click the remove button
  await page.locator('.blog')
      .filter({ hasText: title })
      .getByRole('button', { name: 'remove' })
      .click()
  await page.waitForTimeout(300)
  await page.locator('.blog').filter({ hasText: title }).waitFor({ state: 'detached' });
};

const getLikes = async (page, title) => {
  await page.locator('.blog')
      .filter({ hasText: title })
      .getByRole('button', { name: 'view' })
      .click()

  const likesText = await page.locator('.blog')
      .filter({ hasText: title })
      .locator('.likes')
      .textContent()

  return parseInt(likesText, 10)
}

const likeBlog = async (page, title, times = 1) => {
  // First, click view to show the like button if not already visible
  const viewButton = page.locator('.blog')
      .filter({ hasText: title })
      .getByRole('button', { name: 'view' })
  
  // Check if view button is visible (blog is collapsed)
  if (await viewButton.isVisible()) {
    await viewButton.click()
  }

  // Click the like button the specified number of times
  for (let i = 0; i < times; i++) {
    await page.locator('.blog')
        .filter({ hasText: title })
        .getByRole('button', { name: 'like' })
        .click()
    
    // Small delay to allow the like to register and UI to update
    await page.waitForTimeout(300)
  }
}


export { loginWith, createBlog, deleteBlog,likeBlog }