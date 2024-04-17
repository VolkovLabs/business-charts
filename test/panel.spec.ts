import { test, expect } from '@grafana/plugin-e2e';

test.describe('Business Charts Panel', () => {
  test('should display empty chart without data and Bar Chart', async ({
    readProvisionedDashboard,
    gotoDashboardPage,
    page,
  }) => {
    /**
     * Use e2e.json dashboard
     */
    const dashboard = await readProvisionedDashboard({ fileName: 'e2e.json' });

    /**
     * Go to e2e dashboard
     */
    await gotoDashboardPage(dashboard);

    /**
     * Wait canvas is visible and animation is finished
     */
    await page.waitForTimeout(3000);

    await expect(page.getByTestId('data-testid Panel header Bar Chart').locator('canvas')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bar Chart' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Empty Chart' })).toBeVisible();

    /**
     * Check screenshot
     */
    // await expect(page).toHaveScreenshot('actual-screenshot.png');

    /**
     * Compare screenshot actual
     */
    // await expect(await page.screenshot()).toMatchSnapshot('actual-screenshot.png', { threshold: 0.3 });
  });
});
