import { MyPage } from './util/mypage.object';

describe('angularjs homepage todo list', function() { 
  it('should navigate to your case page', function() {
    let myPage = new MyPage()
    myPage.navigateTo();

    expect(browser.getCurrentUrl()).toBe('http://localhost:3000/');
  });
  
  // it('should submit a case number and postcode', function() {
    
  //   element(by.id('case-unique-reference-number')).sendKeys('abcde');
  //   element(by.id('case-postcode')).sendKeys('CR01XG');

  //   element(by.id('test')).click();
  //   expect(element(by.id('success')).isPresent()).toBe(true);
  // });
});