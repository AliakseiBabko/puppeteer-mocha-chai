const puppeteer = require('puppeteer');
const { expect }  = require('chai');
const dragAndDropFrame = require('../../utils/dragAndDropFrame');

describe("User can drag and drop image into the proper div on the sandbox web page", function() {    

    let browser;
    let page;

    it('It is possible to drag and drop an image into the dedicated div', async function() {
        this.timeout(80000);
        browser = await puppeteer.launch({headless: false, args: ['--start-maximized', '--disable-features=site-per-process']});
        page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto('https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_draganddrop', {waitUntil: 'networkidle2'});
        const elementHandle = await page.$('iframe#iframeResult');
        const frame = await elementHandle.contentFrame();

        await dragAndDropFrame(page, frame, 'img#drag1', 'div#div1');
 
        await browser.close();
    });
});