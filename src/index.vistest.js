describe('primary button', () => {
  const { loadPage, matchBodyScreenshot } = global.utils;

  let buttonElement;

  beforeEach(async () => {
    await loadPage('');
    buttonElement = await page.$('.btn');
  });

  const viewports = [
    {
      width: 375,
      height: 667,
    },
    {
      width: 1024,
      height: 768,
    },
  ];

  viewports.forEach((viewport) => {

    describe(`${viewport.width}x${viewport.height}`, () => {

      beforeEach(async () => {
        await page.setViewport(viewport);
      });

      test('should render correctly', async () => {
        await matchBodyScreenshot();
      });

      test('should render correctly on focus', async () => {
        await buttonElement.focus();
        await matchBodyScreenshot();
      });

      test('should render correctly on hover', async () => {
        await buttonElement.hover();
        await matchBodyScreenshot();
      });

    });

  });

});
