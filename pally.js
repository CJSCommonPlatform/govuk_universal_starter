var pa11y = require('pa11y');
var pa11yOptions = require('./config/pa11y.json');
var htmlReporter = require('pa11y/reporter/html');
var test = pa11y(pa11yOptions);

test.run('file://' + __dirname + '/pages/MyPage.html', function(error, result) {
    if (error) {
        console.log('error: ', error);
    } else {
        console.log('result: ', result);
        htmlReporter.process(result, './pages/result.html');
    }
});