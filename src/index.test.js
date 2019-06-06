describe('index page', () => {
  const url = `${global.config.baseUrl}`;

  test('should render correctly', async () => {
    await page.goto(url);
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
