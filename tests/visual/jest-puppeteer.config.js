const config = {
  launch: {
    // In order to run the tests in non-headless mode (in a visible browser)
    //  1. Enable this property
    //  2. Change the `baseUrl` in `test-setup.js` to `http://localhost:8080`
    //  3. Run `npm test` from the host machine (not the Docker container)
    // Use this feature for debugging only! Due to rendering differences between operating systems,
    // do not commit reference screenshots!
    // headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ]
  }
};

if (process.env.CI_ENV) {
  Object.assign(config, {
    // jest-puppeteer will start up the dev server in CI mode
    // npm install should already have been performed by the CI setup
    // Update this to reflect your project's development server and CI configuration!
    server: {
      command: `cd ${process.env.BITBUCKET_CLONE_DIR} && npm start`,
      launchTimeout: 30000,
      port: 8080
    }
  });
}

module.exports = config;
