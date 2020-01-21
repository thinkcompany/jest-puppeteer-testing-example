global.config = {
  // Change the port number to what your application uses for local development!
  baseUrl: process.env.CI_ENV ? 'http://localhost:8080' : 'http://host.docker.internal:8080'
};

global.utils = {
  loadPage: async (urlPath) => {
    await page.goto(`${global.config.baseUrl}/${urlPath}`);
  },
  matchBodyScreenshot: async (options) => {
    const body = await page.$('body');
		const screenshot = await body.screenshot({ ...options });
		expect(screenshot).toMatchImageSnapshot();
  },
  matchElementScreenshot: async (element, options) => {
    const screenshot = await element.screenshot({ ...options });
    expect(screenshot).toMatchImageSnapshot();
  },
  matchPageScreenshot: async(options) => {
    const screenshot = await page.screenshot({ ...options });
    expect(screenshot).toMatchImageSnapshot();
  }
};

// jest-image-snapshot setup
// extend `expect` with `toMatchImageSnapshot` and set global configuration options
const { configureToMatchImageSnapshot } = require('jest-image-snapshot');
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customDiffConfig: {
    // pixelmatch options: https://github.com/mapbox/pixelmatch#api
    threshold: 0.1
  },
  failureThreshold: 0.001,
  failureThresholdType: 'percent'
});
expect.extend({ toMatchImageSnapshot });
