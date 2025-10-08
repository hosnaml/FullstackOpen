const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'Log in' }).click()
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
    // Click the correct button text
    await page.getByRole('button', { name: 'Click to create a new blog' }).click();
    
    // Use proper accessible labels
    await page.locator('input[name="Title"]').fill(title);
    await page.locator('input[name="Author"]').fill(author);
    await page.locator('input[name="URL"]').fill(url);

    await page.getByRole('button', { name: 'create' }).click();

  
}


export { loginWith, createBlog }