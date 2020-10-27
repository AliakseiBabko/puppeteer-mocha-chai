const puppeteer = require('puppeteer');
const { dragAndDrop, dragAndDropHTML5 } = require('../../utils/dragAndDrop');

describe("User can drag and drop image into the proper div on the sandbox web page", function() {    

    let browser;
    let page;

    beforeEach(async function(){
        browser = await puppeteer.launch({headless: false, args: ['--start-maximized']});
        page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.setViewport({ width: 1920, height: 1080 });
    });

    afterEach(async function(){
        await browser.close();
    });

    it('It is possible to implement drag and drop in a HTML5 webpage (with dragging events)', async function() {
        this.timeout(60000);
        await page.goto('https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_draganddrop', {waitUntil: 'networkidle2'});
        const elementHandle = await page.$('#iframeResult');
        const frame = await elementHandle.contentFrame();

        await dragAndDropHTML5(frame, '#drag1', '#div1');
    });

    it('It is possible to implement drag and drop in a regular webpage (with no dragging events)', async function() {
        this.timeout(30000);
        await page.goto('https://marcojakob.github.io/dart-dnd/basic/', {waitUntil: 'networkidle0'});

        await dragAndDrop(page, 'img:nth-of-type(1)', '.trash');
    });

});