# Visual regression testing with Jest, Puppeteer and jest-image-snapshot

## What is visual regression testing?

Visual regression tests help catch unintentional changes to the visual rendering of a web page or component. As engineers and testers, we already do this manually, but it takes a lot of time, and as humans, are prone to overlooking breaking changes. Automating this process gives us back time to focus on more important things, and gives us added confidence when updating code.

## How it works

These tests are run in headless Chrome using [Puppeteer](https://pptr.dev/). They are written using the [Jest](https://jestjs.io/docs/en/getting-started) testing framework. [jest-puppeteer](https://github.com/smooth-code/jest-puppeteer) is added to facilitate writing and running the tests, and [jest-image-snapshot](https://github.com/americanexpress/jest-image-snapshot) does the actual image comparison and lets us know when something has changed.

Each test will load a page in the browser, perform necessary UI interactions, and then take a screenshot of the entire page or a specific element on the page. The screenshot file is saved alongside the test file and committed to source control. The next time the tests run, this image is used as a reference and compared against a current screenshot. If any differences between the two images are detected, the test will fail, and an image containing the diff is created and saved alongside the original reference screenshot.

These tests are setup to run automatically in Bitbucket Pipelines CI when a pull request is created (see `bitbucket-pipelines.yml`), but can also be run on a manual basic on a developer's local machine.

We run the tests in a Docker container to ensure there are no differences between local and CI environments. These tests should not be run on a developer's native OS because minor rendering differences between operating systems in the browser **will** cause test failures.

## System requirements

- [NodeJS](https://nodejs.org/en/)
- [Docker CE](https://docs.docker.com/v17.12/install/)

## Setup

Install NodeJS dependencies by running `npm install`.

## Running the tests

To run the tests manually, first start the development server by running `npm start`. Next, in a separate console, run `npm run vistest`. This will start a Docker container on your machine and then run the tests.

For any given test, if no reference screenshot exists, one will be taken and saved alongside the test file in the `__image_snapshots__` directory. Afterwards, be sure to commit these new reference files to version control so that they may be used for future tests.

If there are any failures due to differences between current and existing screenshots, a `.png` file containing the image diff will be saved in `__diff_output__` directory alongside the existing reference screenshot for the test. These diff files are ignored by version control.

## Updating reference screenshots

If you have made _intentional_ changes to the way a component is rendered, you can update the existing reference screenshots in one of two ways. First, you can simply delete the reference files that you wish to update. Alternatively, when running `npm run vistest:watch`, you will have to option to update screenshots for any failed tests, one at a time. Afterwards, commit the new and/or updated files to version control so that your changes are respected during future test runs.

## Writing tests

Test files must follow the naming pattern `*.vistest.js` and reside in the `src` directory, preferably alongside their component's source file. Tests are written using Jest and Puppeteer. A number of globals (e.g. `browser` and `page`) are made available by [jest-puppeteer](https://github.com/smooth-code/jest-puppeteer#api) to reduce the amount of setup and teardown code required for each test. In addition, common utility methods are also defined in `test-setup.js` that can be imported and used within tests.

As a basic example, here is how you would write a test that takes a screenshot of a specific page and expects that it matches an existing reference screenshot.

```js
// landing.test.js
describe('landing page', () => {
  const { loadPage, matchBodyScreenshot } = global.utils;

  test('should render correctly', async () => {
    await loadPage(url);
    await matchPageScreenshot();
  });
});
```

As a general rule, a test should only take one screenshot. Screenshot files are named after the test description. If you need to take multiple screenshots to test different states of a component, create a separate test for testing each state.

## Gotchas

- Because the reference screenshots are named using the test description, the file names can become quite long. On Windows OS, this can lead to issues where there may be a maximum limit to the character limit in a file name.

