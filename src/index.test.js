describe('primary button', () => {
  const url = `${global.config.baseUrl}`;
  let bodyElement;
  let buttonElement;

  beforeEach(async () => {
    await page.goto(url);
    bodyElement = await page.$('body');
    buttonElement = await page.$('.btn');
  });

  global.config.viewports.forEach((viewport) => {

    describe(`${viewport.width}x${viewport.height}`, () => {

      beforeEach(async () => {
        await page.setViewport(viewport);
      });

      test('should render correctly', async () => {
        const screenshot = await bodyElement.screenshot();
        expect(screenshot).toMatchImageSnapshot();
      });

      test('should render correctly on focus', async () => {
        await buttonElement.focus();
        const screenshot = await bodyElement.screenshot();
        expect(screenshot).toMatchImageSnapshot();
      });

      test('should render correctly on hover', async () => {
        await buttonElement.hover();
        const screenshot = await bodyElement.screenshot();
        expect(screenshot).toMatchImageSnapshot();
      });

    });

  });

});
