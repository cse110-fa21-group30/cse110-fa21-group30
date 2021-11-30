
describe('preference-setting test', () => {

    beforeAll(async () => {
      await page.goto('http://127.0.0.1:5500/source/preference-setting.html');
    });
  
    // check preference-setting
    it('check saved or not ', async () => {
      console.log('Checking if preference saved or not');
      let saved_check = await page.$('#save-or-not');
      let text = await saved_check.getProperty('innerText');
      expect(text['_remoteObject'].value).toBe("SAVE");
  
      let button = await page.$('button');
      await button.click();
      let text2 = await saved_check.getProperty('innerText');
      expect(text2['_remoteObject'].value).toBe("SAVED");
    });
  });
  
  describe('recipe-searchPage test', () => {
  
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:5500/source/recipe-searchPage.html');
    });
  
    // check preference-setting
    it('check saved or not ', async () => {
      console.log('Checking if recipe-searchPage successfully load');
      let text_check = await page.$('#apply-filters');
      let text = await text_check.getProperty('innerText');
      expect(text['_remoteObject'].value).toBe("APPLY FILTERS");
    });
  });
  
  describe('navBar test', () => {
  
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:5500/source/recipe-searchPage.html');
    });
  
    // check preference-setting
    it('check saved or not ', async () => {
      console.log('Checking if recipe-searchPage successfully load');
      let text_check = await page.$('.nav-search #nav-dashboard-text');
      let text = await text_check.getProperty('innerText');
      expect(text['_remoteObject'].value).toBe("SEARCH");
    });
  });