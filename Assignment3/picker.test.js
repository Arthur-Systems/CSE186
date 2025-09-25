/*
#######################################################################
#
# Copyright (C) 2020-2024 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

/*
#######################################################################
# DO NOT MODIFY THIS SECTION
#######################################################################
*/

const puppeteer = require('puppeteer');
const pti = require('puppeteer-to-istanbul');
const fs = require('fs');

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
    ],
  });
  page = await browser.newPage();
  await Promise.all([
    page.coverage.startJSCoverage({resetOnNavigation: false}),
    page.coverage.startCSSCoverage(),
  ]);
});

afterAll(async () => {
  const [jsCoverage] = await Promise.all([
    page.coverage.stopJSCoverage(),
  ]);
  const coverage = [];
  for (const result of jsCoverage) {
    if (result.url.endsWith('.js')) {
      coverage.push(result);
    }
  }
  pti.write([...coverage],
      {includeHostname: true, storagePath: './.nyc_output'});
  fs.renameSync('./.nyc_output/out.json', './.nyc_output/picker.json');
  await browser.close();
});

beforeEach(async () => {
  await page.goto(`file://${__dirname}/picker.html`);
});

/**
 * @param {number} relative months ahead or behind the current date
 * @return {date} first day of the relative month
 */
function firstDay(relative) {
  const date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth()+relative);
  return date.getDay();
}

// Clicks the next button on picker1 a random number of times then checks
// the first day of the displayed month is correct.
// For example, July 1, 2021 falls on a Thursday, the 5th day of the week
// when weeks start on Sundays.
test('Next Months', async () => {
  const relative = Math.max(1, Math.floor(Math.random()*28));
  for (let i = 0; i < relative; i++) {
    await page.click('#picker1_next');
  }
  const elem = await page.$('#picker1_d'+(firstDay(relative)));
  const cont = await (await elem.getProperty('textContent')).jsonValue();
  expect(cont).toBe('1');
});

/*
#######################################################################
# END DO NOT MODIFY SECTION
#######################################################################
*/

/*
#######################################################################
# Add your tests for the Advanced requirement below here.
# Do not create new page instances, use the one defined at line 21.
#######################################################################
*/
