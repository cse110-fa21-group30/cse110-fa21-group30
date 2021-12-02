describe('preference-setting test', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/source/preference-setting.html');
  });

  /**
	 * Check save button
	 */
  it('responds to "save" button press', async () => {
    let saved_check = await page.$('#save-or-not');
    let text = await saved_check.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("SAVE");

    let button = await page.$('button');
    await button.click();
    let text2 = await saved_check.getProperty('innerText');
    expect(text2['_remoteObject'].value).toBe("SAVED");
  });
});
/**
 * Check search filter
 */
describe('recipe-searchPage load test', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/source/recipe-searchPage.html');
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
});

/**
 * check version page
 */
describe('check version page', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/source/version.html');
  });

  it('check version page', async () => {
    let version = await page.$("#v-test");
    let text = await version.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("Version beta 1.0");
  });
});


/**
 * go to setting page from dashboard
 */
describe('go to setting', () => { 
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/source/index.html');
  });

  it('go to setting page from dashboard', async () => {
    let settings = await page.$('.nav-settings');
    await Promise.all([
      settings.click(),
      page.waitForNavigation(),
    ]);
    let font = await page.$('#setting-text');
    let text = await font.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("FONTSIZE");
  });
});