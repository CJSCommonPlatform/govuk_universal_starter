'use strict';

const gulp = require('gulp'),
  pa11y = require('pa11y'),
  pa11yReporterHtml = require('pa11y/reporter/html'),
  pa11yOptions = require('./config/pa11y.json'),
  fs = require('fs'),
  path = require('path'),
  mkdir = require('mkdirp'),
  Q = require('q'),
  $ = require('gulp-load-plugins')({ lazy: true });

const harness = pa11y(pa11yOptions);

const config = {
    pa11y_dir: 'pages/',
    report_dir: 'report/'
}

const FAILURE_LEVELS = resolveFailureLevels();

gulp.task('default', ['pa11y']);

gulp.task('pa11y', function (done) {

    var processingCount = 0,
        bodyContents = '',
        taskShouldFail = false,
        outstandingTasks = [];

    gulp.src(config.pa11y_dir + '*.html', { read: false }).on('data', processFile);

    function processFile(data) {

      const PAGE_PATH_ABS = data.history[0];
      const PAGE_PATH_REL = path.relative(data.base, PAGE_PATH_ABS);
      const PAGE_URL = `file://${PAGE_PATH_ABS}`;

      if (processingCount >= 5) {
        outstandingTasks.push(data);
        setTimeout(() => { processFile(outstandingTasks.pop()); }, 5000);
        return;
      }

      ++processingCount;

      $.util.log(`Pa11y opened ${PAGE_PATH_REL}`);

      harness.run(PAGE_URL, function (error, results) {
        if (error) {
          console.log(error);
          throw error;
        }

        const REPORT_CONTENT = pa11yReporterHtml.process(results, PAGE_PATH_REL);
        prepareForCombinedReport();
        const levels = computeLevels();
        checkFailureLevels();
        --processingCount;

        $.util.log(`Pa11y processed ${PAGE_PATH_REL}`);
        $.util.log(`Pally result levels: ${JSON.stringify(levels)}`);

        if (processingCount !== 0 || outstandingTasks.length > 0) {
          // There are still files being processed.
          return;
        }

        const REPORT_ALL_CONTENT = createCombinedReport();
        
        if (!fs.existsSync(config.report_dir)) {
            fs.mkdirSync(config.report_dir)
        }

        const REPORT_ALL_PATH = config.report_dir + 'pa11y.html';

        fs.writeFile(REPORT_ALL_PATH, REPORT_ALL_CONTENT, function (error) {
          if (error) {
            throw error;
          }

          if (taskShouldFail) {
            console.log('Pa11y ran successfully but there were errors found on processed page(s)');
          }

          console.log(`Pa11y report written to ${REPORT_ALL_PATH}`);

          done();
        });

        function computeLevels() {
          const levels = {};
          results.map(res => res.type).forEach(type => levels[type] = 1 + (levels[type] || 0));
          return levels;
        }

        function checkFailureLevels() {
          taskShouldFail = taskShouldFail || FAILURE_LEVELS.map(level => !!levels[level]).reduce((a, b) => a || b, false);
        }

        function prepareForCombinedReport() {
          bodyContents += REPORT_CONTENT.match(/<body>(.*)<\/body>/)[1];
        }

        function createCombinedReport() {
          return REPORT_CONTENT
            .replace(/<title>.*<\/title>/, '<title>Common Platform Pa11y Report</title>')
            .replace(/<body>.*<\/body>/, `<body>${bodyContents}</body>`);
        }
      });
    }
  });

  function resolveFailureLevels() {
    switch (config.pa11yFailureLevel) {
      case 'notice': return ['notice', 'warning', 'error'];
      case 'warning': return ['warning', 'error'];
      case 'error': return ['error'];
      default: return [];
    }
  }