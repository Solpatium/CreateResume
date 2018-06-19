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
describe('Fields changing PDF content', function() {
    this.timeout(15000);

    it('should display basic info changes in pdf', async () => {
      let browser = await puppeteer.launch({
        headless: true
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

      for( const name in toFill ) {
        const val = toFill[name];
        await page.type(`input[name="${name}"]`, val);
      }

      // Give it time to add changes
      await sleep(100);

      const html = await page.$eval('.cv-document', e => e.innerHTML);
      for( const name in toFill ) {
        const val = toFill[name];
        expect(html).to.include(val);
      }  
      browser.close();
    }, 16000);

    it('should remove additional fields', async () => {
        // TODO: Check if clicking on the "delete field" button works
    })

    it('should display image', async () => {
        // TODO: Check if <img> with given src is rendered after it is filled
    })
});