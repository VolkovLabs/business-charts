import { test, expect } from '@grafana/plugin-e2e';
import { TEST_IDS } from '../src/constants/tests';

test.describe('Business Charts Panel', () => {
  test('Check grafana version', async ({ grafanaVersion }) => {
    console.log('Grafana version: ', grafanaVersion);
    expect(grafanaVersion).toEqual(grafanaVersion);
  });

  test('should display empty chart without data and Bar Chart', async ({ gotoDashboardPage, dashboardPage }) => {
    /**
     * Go To E2E dashboard
     * return dashboardPage
     */
    await gotoDashboardPage({ uid: 'fdd5dbe3-794c-4441-9d1c-024a537bbe99' });

    /**
     * Find panel by title with chart
     * Should be visible
     */
    await expect(dashboardPage.getPanelByTitle('Bar Chart').locator).toBeVisible();

    /**
     * Check and compare image
     */
    await expect(dashboardPage.getPanelByTitle('Bar Chart').locator.getByTestId(TEST_IDS.panel.chart)).toHaveScreenshot(
      'actual-screenshot.png'
    );
  });
});
