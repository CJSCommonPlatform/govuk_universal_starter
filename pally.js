var pa11y = require('pa11y');
var htmlReporter = require('pa11y/reporter/html');

var options = {

};

var test = pa11y();

test.run('./pages/MyPage.html', function(error, result) {
    if (error) {
        console.log('error: ', error);
    } else {
        console.log('result: ', result);
        htmlReporter.process(result, './pages/result.html');
    }
});