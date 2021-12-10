/**
 * Check search filter
 */
 describe('recipe-searchPage load test', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:5500/source/recipe-search.html');
    const begin_button = await page.$('.save');
    if (begin_button) {
      await begin_button.click();
      await page.waitForNavigation();
      await page.goto('http://localhost:5500/source/recipe-search.html');
    }
  });

  it('loads filter button', async () => {
    let text_check = await page.$('#apply-filters');
    let text = await text_check.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("APPLY FILTERS");
  });

  it('loads search button', async () => {
    let text_check = await page.$('.nav-search #nav-dashboard-text');
    let text = await text_check.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("SEARCH");
  });

  it('returns search results', async () => {
    await page.type('#search-field', 'pizza');
    const search_button = await page.$('#search-button');
    await search_button.click();
    await page.waitForTimeout(1500);  // wait for spoonacular to return results
    const cards = await page.$$('recipe-card');
    expect(cards.length).toBeGreaterThan(0);
  });
});