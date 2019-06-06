// const DEBUG_MODE = process.argv.includes('--debug');
// const debugLaunchOptions = DEBUG_MODE ? {
//   headless: false,
//   slowMo: 100,
// } : {};

module.exports = {
  launch: {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
  },
  server: {
    // jest-puppeteer will start up the dev server
    command: 'npm start',
    launchTimeout: 10000,
    port: 8080
  }
};
