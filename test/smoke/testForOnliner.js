const puppeteer = require('puppeteer');
const { expect }  = require('chai');
const { dragAndDrop, dragAndDropHTML5 } = require('../../utils/dragAndDrop');
let MemoryObject = require('../../utils/memory');
const world = require("../../po/world");
const textSample = '~!@#$%^&*()_+1234567890хzxcvbnmйцукенгшщз';

describe("Catalog page for TV", function() {

    let browser;
    let page;

    before(async function() {
        this.timeout(120000);
        browser = await puppeteer.launch({headless: false, args: ['--start-maximized']});
        page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto('https://catalog.onliner.by/tv', {waitUntil: 'networkidle2'});
    });

    after(async function() {
        await browser.close();
    });

    it.skip('It is possible to drag and drop image of the first item in the grid into the Max Price field', async function() {
        const originalUrl = await page.$eval(world.CatalogPageTV.Main_ItemsGrid_FirstElement_A, el => el.href);
        MemoryObject.setter('result', Number(originalUrl.match(/\d+/g).join('')));
        
        await dragAndDropHTML5(page, world.CatalogPageTV.Main_ItemsGrid_FirstElement_IMG, world.CatalogPageTV.Main_LeftPanel_MaxPrice);
        await page.$eval(world.CatalogPageTV.Main_LeftPanel_MinPrice, el => el.click());

        const copiedText = await page.$eval(world.CatalogPageTV.Main_LeftPanel_MaxPrice, el => el.value);
        expect(copiedText).to.eql(MemoryObject.getter('result'));
    });

    it("Text entered into the search field appears in the iframe search field", async function() {
        this.timeout(15000);
        await page.waitForSelector(world.CatalogPageTV.Header.searchField);         
        await page.type(world.CatalogPageTV.Header.searchField, textSample, {delay: 100});
        
        const elementHandle = await page.$(world.CatalogPageTV.Iframe);
        const frame = await elementHandle.contentFrame();
        await frame.waitForSelector(world.CatalogPageTV.Iframe_SearchField);
        const copiedUrl = await frame.$eval(world.CatalogPageTV.Iframe_SearchField, el => el.value);
        await page.keyboard.press('Escape');
        expect(copiedUrl).to.eql(textSample);
    });

    it("Price text fields of the left panel filter shoud allow entering numbers only", async function() {
        this.timeout(15000);
        await page.waitForSelector(world.CatalogPageTV.Main_LeftPanel_MaxPrice);
        await page.type(world.CatalogPageTV.Main_LeftPanel_MaxPrice, textSample, {delay: 100});
        const receivedText = await page.$eval(world.CatalogPageTV.Main_LeftPanel_MaxPrice, el => el.value);
        const raw = textSample.match(/\d+/g).join('');
        const processedValue = raw.slice(0,3) + ' ' + raw.slice(3,6) + ' ' + raw.slice(6,9);
        return expect(receivedText).to.eql(processedValue);
    });    
});

