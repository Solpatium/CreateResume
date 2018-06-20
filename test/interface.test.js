require('dotenv').config();
var app = require('../app');
var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;
var puppeteer = require('puppeteer');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const url = `http://localhost:${process.env.PORT}`;
const noLoginApp = url + '/?no-login';
describe('Fields changing PDF content', function () {
    this.timeout(15000);

    it('should display basic info changes in pdf', async () => {
        let browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        });
        let page = await browser.newPage();

        await page.goto(noLoginApp);
        await page.waitForSelector('.cv-inside');

        const toFill = {
            'name': 'Brajan',
            'surname': 'Cebula',
            'occupation': 'Coach',
            'email': 'twoj@sukces.pl'
        }

        for (const name in toFill) {
            const val = toFill[name];
            await page.type(`input[name="${name}"]`, val);
        }

        // Give it time to add changes
        await sleep(100);

        const html = await page.$eval('.cv-document', e => e.innerHTML);
        for (const name in toFill) {
            const val = toFill[name];
            expect(html).to.include(val);
        }
        browser.close();
    }, 16000);

    it('should remove dynamic fields', async () => {
        let browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        });
        let page = await browser.newPage();

        await page.goto(noLoginApp);
        await page.waitForSelector('.cv-inside');

        // Remove all dynamic fields, one by one
        while(true){
            try {
                await page.click('.card-actions .ant-btn-danger');
            } catch(_) {
                break;
            }
        }

        // Give it time to change
        await sleep(100);

        const html = await page.$eval('.cv-document', e => e.innerHTML);
        const shouldNotContain = [
            'title-field',
            'education-field',
            'work-field',
            'skill-field',
            'text-field',
        ];
        for( const className of shouldNotContain) {
            expect(html).to.not.include(className);
        }
        browser.close();
    })

    it('should display image', async () => {
        let browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        });
        let page = await browser.newPage();

        await page.goto(noLoginApp);
        await page.waitForSelector('.cv-inside');

        const htmlWithoutImage = await page.$eval('.cv-document', e => e.innerHTML);

        expect(htmlWithoutImage).to.not.include('<img');
        

        const url = "http://www.testsetestesgegesge.com/img.jpg"
        await page.type('input[name="picture"]', url);

        await sleep(100);

        const html = await page.$eval('.cv-document', e => e.innerHTML);
        expect(html).to.include('<img');
        expect(html).to.include(`src="${url}"`);
    })
});
