async function validate_checkboxes(checkbox_selector, boxes_to_check) {
  const checkboxes = await page.$$(checkbox_selector);
  for (let i = 0; i < checkboxes.length; i++) {
    let checked = await (await checkboxes[i].getProperty('checked')).jsonValue();
    expect(checked).toBe(boxes_to_check.includes(i));  // if it should be checked
  }
}

async function toggle_checkboxes(checkbox_selector, boxes_to_check) {
  const checkboxes = await page.$$(checkbox_selector);
  for (let box_to_check of boxes_to_check) await checkboxes[box_to_check].click();
}

describe('preference-setting test', () => {
  const boxes_to_check = [0, 2, 5, 7];  // preference boxes to check

  beforeAll(async () => {
    await page.goto('http://cse110-group30-affd4.web.app/preference-setting.html');
    const begin_button = await page.$('.save');
    if (begin_button) {
      let button_text = await page.$('.save p');
      let text = await button_text.getProperty('innerText');
      if (text['_remoteObject'].value == "Let's begin!") {
        await begin_button.click();
        await page.waitForNavigation();
        await page.goto('http://cse110-group30-affd4.web.app/preference-setting.html');
      }
    }
  });

  it('responds to checkbox clicks "save" button press', async () => {
    // button initially says save
    let button_text = await page.$('.save p');
    let text = await button_text.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("SAVE");

    // toggle them
    await toggle_checkboxes('label', boxes_to_check);
    let done = await page.$('.save');
    await done.click();  // save

    // bottons should say saved
    button_text = await page.$('.save p');
    text = await button_text.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("SAVED");

    // toggle again
    await toggle_checkboxes('label', boxes_to_check);

    // bottons should say save since retoggled
    button_text = await page.$('.save p');
    text = await button_text.getProperty('innerText');
    expect(text['_remoteObject'].value).toBe("SAVE");
    // don't hit done, preference shoudn't be saved
  });

  it('applies preference in recipe add page', async () => {
    await page.goto('https://cse110-group30-affd4.web.app/recipe-add.html');
    await validate_checkboxes(".diet-restrictionBox input", boxes_to_check);
  });

  it('applies preference in recipe search page', async () => {
    await page.goto('https://cse110-group30-affd4.web.app/recipe-search.html');
    await validate_checkboxes(".diet-restrictionBox input", boxes_to_check);
  });

  it('applies preference in settings', async () => {
    await page.goto('https://cse110-group30-affd4.web.app/preference-setting.html');
    await validate_checkboxes(".diet-restrictionBox input", boxes_to_check);
  });

  afterAll(async () => {
    await toggle_checkboxes('label', boxes_to_check);
    let done = await page.$('.save');
    await done.click();
  })
});

