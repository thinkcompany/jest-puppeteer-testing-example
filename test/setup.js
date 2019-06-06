const CI_MODE = process.env.TEST_ENV === 'ci';

// we access localhost from inside a Docker container through host.docker.internal
const baseUrl = CI_MODE ? 'http://localhost:8080' : 'http://host.docker.internal:8080';

global.config = {
  baseUrl
};

// extend `expect` with `toMatchImageSnapshot` and set global configuration
const { configureToMatchImageSnapshot } = require('jest-image-snapshot');
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customDiffConfig: { threshold: 0 },
  noColors: true,
});
expect.extend({ toMatchImageSnapshot });
