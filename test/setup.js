global.config = {
  baseUrl: 'http://localhost:8080'
};

// extend `expect` with `toMatchImageSnapshot` and set global configuration
const { configureToMatchImageSnapshot } = require('jest-image-snapshot');
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customDiffConfig: { threshold: 0 },
  noColors: true,
});
expect.extend({ toMatchImageSnapshot });
