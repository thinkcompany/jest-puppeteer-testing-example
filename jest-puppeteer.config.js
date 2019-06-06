const CI_MODE = process.env.TEST_ENV === 'ci';

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
  server: CI_MODE ? {
    // in CI, allow jest-puppeteer to start up the dev server
    // (in development, we assume the dev server is already running)
    command: 'npm start',
    launchTimeout: 10000,
    port: 3333
  } : null,
};
