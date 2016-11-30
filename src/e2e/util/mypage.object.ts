let fs = require('fs');

import { BasePage } from './base-page.object';

export class MyPage extends BasePage {
  navigateTo() {
    let b = browser.get('http://localhost:3000/');
    this.writePage('MyPage');
    return b;
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
