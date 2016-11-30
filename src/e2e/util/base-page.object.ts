let fs = require('fs');

const pagesDir = './pages';

export class BasePage {
    syncDir() {
        if (!fs.existsSync(pagesDir)) {
            fs.mkdirSync(pagesDir)
        }
    }

    writePage(filename) {
        this.syncDir();

        if (filename && browser.params && browser.params.nojs) {
            browser.getPageSource().then(function(pageSource) {
                fs.writeFile(`${pagesDir}/${filename}.html`, pageSource)
            })  
        }
    }
}