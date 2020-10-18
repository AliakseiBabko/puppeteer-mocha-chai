const puppeteer = require('puppeteer');
const { expect }  = require('chai');
const dragAndDrop = require('../../utils/dragAndDrop');
let MemoryObject = require('../../utils/memory');

describe("User can copy item's url by drag and drop its image to text fields", function() {

    let browser;
    let page;

    before(async function() {
        this.timeout(80000);
        browser = await puppeteer.launch({headless: false, args: ['--start-maximized']});
        page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto('https://catalog.onliner.by/tv', {waitUntil: 'networkidle2'});    
    });

    after(async function() {
        await browser.close();
    });

    it('It is possible to drag and drop image of the first item in the grid into the max Price field', async function() {
        this.timeout(40000);     
        const originalUrl = await page.$eval('div#schema-products > div:nth-of-type(1) > .schema-product > .schema-product__part_1 > .schema-product__image > a', element => element.getAttribute('href'));
        MemoryObject.setter('result', originalUrl.match(/\d+/g).join(''));
        
        await dragAndDrop(page, 'div#schema-products > div:nth-of-type(1) > .schema-product > .schema-product__part_1 > .schema-product__image > a > img', 'div:nth-of-type(2) > .schema-filter-control__item.schema-filter__number-input.schema-filter__number-input_price');
        
        const copiedText = await page.$eval('div:nth-of-type(2) > .schema-filter-control__item.schema-filter__number-input.schema-filter__number-input_price', element => element.getAttribute('value'));
        expect(copiedText).to.eql(MemoryObject.getter('result'));
    });

    it.skip("After drag and drop in the iframe search field item's url should be copied", async function() {
        const elementHandle = await page.$('.modal-iframe');
        const frame = await elementHandle.contentFrame();
        await page.waitForSelector('.search__input');
        const copiedUrl = await frame.$eval('.search__input', element => element.getAttribute('value'));
        expect(copiedUrl).to.eql(MemoryObject.getter('originalUrl'));
    });

    it.skip("Text entered into the search field appears in the iframe search field", async function() {
        this.timeout(10000);
        await page.waitForSelector('input[name="query"]');
        await page.$eval('input[name="query"]', el => el.value = 'sample text');
        await page.$eval('.fast-search__submit', btn => btn.click());
        const elementHandle = await page.$('.modal-iframe');
        const frame = await elementHandle.contentFrame();
        await page.waitForSelector('.search__input');
        const copiedUrl = await frame.$eval('.search__input', element => element.getAttribute('value'));    
        expect(copiedUrl).to.eql('samle text');
    });
});
