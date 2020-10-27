
const fs = require('fs');
const resemble = require('resemblejs');
const screenshotsFolder = './screenshots/';
const diffFolder = screenshotsFolder + 'diff/';
let misMatchPercentage;

// Create screenshots folder if it does not exist
exports.checkFolders = async function() {
    if (!fs.existsSync(screenshotsFolder)) {
        fs.mkdir(diffFolder, { recursive: true }, (err) => { if (err) throw err; });
    }
}

// Take screenshots
async function takeScreenshot(page, filename) {
    await page.screenshot({
        path: filename,     
        type: 'jpeg',
        quality: 80,
        fullPage: true
    });
};

// Perform visual comparison of screenshots
async function compareScreenshots(filename, orgScreenshotPath, testScreenshotPath, bounding) {
    console.log('Visual Regression: ' +  filename);    

    const raw = resemble(orgScreenshotPath).compareTo(testScreenshotPath).outputSettings({ boundingBox: bounding }).onComplete(data => {
        if (data.misMatchPercentage) {
            console.log('Mismatch of ' + data.misMatchPercentage + '%');
            // Set filename and folder for Diff file
            const diffScreenshotPath = diffFolder + filename + '_' + data.misMatchPercentage + '_diff.png';
            fs.writeFile(diffScreenshotPath, data.getBuffer(), (err) => {
                if (err) { throw err; }
            });
            misMatchPercentage = data.misMatchPercentage;
        }
    })
};

exports.visualTest = async function(page, sample) {
    const orgScreenshotPath = screenshotsFolder + sample.filename + '.jpg';
    const testScreenshotPath = screenshotsFolder + sample.filename + '_test.jpg';
    if (fs.existsSync(orgScreenshotPath)) {
        // Original exists, create test screenshot and compare it with the original
        await takeScreenshot(page, testScreenshotPath);
        await compareScreenshots(sample.filename, orgScreenshotPath, testScreenshotPath, sample.boundingBox);
        return misMatchPercentage;
    } else {
        // No original exists, create one
        await takeScreenshot(page, orgScreenshotPath);
        await console.log('Created original: ' + sample.filename);
        return 101;
    };
}