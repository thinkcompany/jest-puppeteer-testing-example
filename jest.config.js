// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {

  preset: 'jest-puppeteer',

  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: './test-reports',
      outputName: './jest-junit.xml'
    }]
  ],

  setupFilesAfterEnv: ['./test/setup.js'],

};
