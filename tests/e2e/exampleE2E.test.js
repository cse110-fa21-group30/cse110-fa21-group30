describe('Basic user flow for Website', () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/source/index.html');
  });

  // check page loads
  it('initializes heading', async () => {
    let saved_recipe = await page.$('h2');
    let text = await saved_recipe.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("Saved Recipes");
  });
});

