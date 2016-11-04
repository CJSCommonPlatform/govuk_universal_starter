describe('angularjs homepage todo list', function() { 
  it('should navigate to your case page', function() {
    browser.get('http://localhost:3000/');

    element(by.className('button-start')).click();

    expect(browser.getCurrentUrl()).toBe('http://localhost:3000/your-case');
  });
  
  it('should submit a case number and postcode', function() {
    
    element(by.id('case-unique-reference-number')).sendKeys('abcde');
    element(by.id('case-postcode')).sendKeys('CR01XG');

    element(by.id('test')).click();
    expect(element(by.id('success')).isPresent()).toBe(true);
  });
});