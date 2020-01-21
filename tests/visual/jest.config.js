// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {

  preset: 'jest-puppeteer',

  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: './reports',
      outputName: './jest-junit.xml'
    }]
	],

	roots: [
		'../../src'
	],

	setupFilesAfterEnv: ['./test-setup.js'],

	testMatch: [
		'**/*.vistest.js'
	],

	testPathIgnorePatterns: [
		'/node_modules/',
		'/dist/'
	]

};
