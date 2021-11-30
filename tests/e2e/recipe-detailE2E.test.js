describe('Basic user flow for Recipe detail page', () => {
	beforeAll(async () => {
		await page.goto('http://127.0.0.1:5500/source/recipe-detail.html');
	});

	/**
	 * Check initial recipe card
	 */
	it('Initial Recipe detail Page', async () => {
		console.log('Checking if page loads');
		let ingredients = await page.$('h1');
		let text = await ingredients.getProperty('innerText');
		expect(text['_remoteObject'].value).toBe("INGREDIENTS");
	});
	
	/**
	 * Check click save the button change to saved
	 */
	it('Check save or saved - 1', async () => {
		console.log('Checking the "save" button...');
		let buttons = await page.$$('button');
		await buttons[1].click();
		let buttonP = await page.$('#save-or-not');
		let innerText = await buttonP.getProperty('innerText');
		let text = innerText['_remoteObject'].value;
		expect(text).toBe("SAVED");
	});
	
	/**
	 * Check click saved the button change to save
	 */
	it('Check save or saved - 2', async () => {
		console.log('Checking the "saved" button...');
		let buttons = await page.$$('button');
		await buttons[1].click();
		let buttonP = await page.$('#save-or-not');
		let innerText = await buttonP.getProperty('innerText');
		let text = innerText['_remoteObject'].value;
		expect(text).toBe("SAVE");
	});

	/**
	 * Check click back to dashboard
	 */
	it('Check go dashboard', async () => {
		console.log('Checking go dashboard');
		let sections = await page.$$('section');
		let divs = await sections[2].$$('div');
		await Promise.all([
			divs[0].click(),
			page.waitForNavigation(),
		]);
		let saved_recipe = await page.$('h2');
    let text = await saved_recipe.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("Saved Recipes");
		await page.goto('http://127.0.0.1:5500/source/recipe-detail.html');
  });

	
	/**
	 * Check click go search
	 */
	it('Check go search', async () => {
		console.log('Checking go search');
		let sections = await page.$$('section');
		let divs = await sections[2].$$('div');
		await Promise.all([
			divs[1].click(),
			page.waitForNavigation(),
		]);
		let applyFilters = await page.$('#apply-filters');
		let innerText = await applyFilters.getProperty('innerText');
		let text = innerText['_remoteObject'].value;
		expect(text).toBe("APPLY FILTERS");
		await page.goto('http://127.0.0.1:5500/source/recipe-detail.html');
	});

	/**
	 * Check click go add
	 */
	it('Check go add', async () => {
		console.log('Checking go add');
		let sections = await page.$$('section');
		let divs = await sections[2].$$('div');
		await Promise.all([
			divs[2].click(),
			page.waitForNavigation(),
		]);
    	let label = await page.$('label');
    	let text = await label.getProperty('innerText');
    	expect(text['_remoteObject'].value).toBe("NAME: ");
		await page.goto('http://127.0.0.1:5500/source/recipe-detail.html');
	});

	/**
	 * Check click go setting
	 */
	it('Check go setting', async () => {
		console.log('Checking go setting');
		let sections = await page.$$('section');
		let divs = await sections[2].$$('div');
		await Promise.all([
			divs[3].click(),
			page.waitForNavigation(),
		]);
		let font = await page.$('setting-text');
		let text = await font.getProperty('innerText')
		expect(text['_remoteObject'].value).toBe("FONTSIZE");
		await page.goto('http://127.0.0.1:5500/source/recipe-detail.html');
	});
});
