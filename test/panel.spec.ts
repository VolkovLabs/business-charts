import { test, expect } from '@grafana/plugin-e2e';
import { PanelHelper } from './utils';

test.describe('Business Charts Panel', () => {
  test('Check grafana version', async ({ grafanaVersion }) => {
    console.log('Grafana version: ', grafanaVersion);
    expect(grafanaVersion).toEqual(grafanaVersion);
  });

  test('Should add empty default chart', async ({ readProvisionedDashboard, gotoDashboardPage }) => {
    /**
     * Go To Panels dashboard e2e.json
     * return dashboardPage
     */
    const dashboard = await readProvisionedDashboard({ fileName: 'e2e.json' });
    const dashboardPage = await gotoDashboardPage({ uid: dashboard.uid });

    /**
     * Add new visualization
     */
    const editPage = await dashboardPage.addPanel();
    await editPage.setVisualization('Business Charts');
    await editPage.setPanelTitle('Business Chart Test');
    await editPage.backToDashboard();

    /**
     * Should add empty visualization without errors
     */
    const panel = new PanelHelper(dashboardPage, 'Business Chart Test');
    await panel.checkIfNoErrors();
    await panel.checkPresence();

    await panel.compareScreenshot('empty.png');
  });

  test('Should display error message', async ({ readProvisionedDashboard, gotoDashboardPage }) => {
    /**
     * Go To Panels dashboard e2e.json
     * return dashboardPage
     */
    const dashboard = await readProvisionedDashboard({ fileName: 'e2e.json' });
    const dashboardPage = await gotoDashboardPage({ uid: dashboard.uid });

    /**
     * Check Presence
     */
    const panel = new PanelHelper(dashboardPage, 'Error panel');

    await panel.checkIfNoErrors();
    await panel.checkPresence();
    await panel.checkAlert();
  });

  test.describe('Chart types', () => {
    test('Should display Line Chart', async ({ gotoDashboardPage, readProvisionedDashboard }) => {
      /**
       * Go To Panels dashboard e2e.json
       * return dashboardPage
       */
      const dashboard = await readProvisionedDashboard({ fileName: 'e2e.json' });
      const dashboardPage = await gotoDashboardPage({ uid: dashboard.uid });

      /**
       * Check Presence
       */
      const panel = new PanelHelper(dashboardPage, 'Line Chart (code editor)');

      await panel.checkIfNoErrors();
      await panel.checkPresence();
      await panel.compareScreenshot('line-screenshot.png');
    });

    test('Should display Radar Chart', async ({ gotoDashboardPage, readProvisionedDashboard }) => {
      /**
       * Go To Panels dashboard e2e.json
       * return dashboardPage
       */
      const dashboard = await readProvisionedDashboard({ fileName: 'e2e.json' });
      const dashboardPage = await gotoDashboardPage({ uid: dashboard.uid });

      /**
       * Check Presence
       */
      const panel = new PanelHelper(dashboardPage, 'Radar Chart (visual editor)');

      await panel.checkIfNoErrors();
      await panel.checkPresence();
      await panel.compareScreenshot('radar-screenshot.png');
    });

    test('Should display Bar Chart', async ({ gotoDashboardPage, readProvisionedDashboard }) => {
      /**
       * Go To Panels dashboard e2e.json
       * return dashboardPage
       */
      const dashboard = await readProvisionedDashboard({ fileName: 'e2e.json' });
      const dashboardPage = await gotoDashboardPage({ uid: dashboard.uid });

      /**
       * Check Presence
       */
      const panel = new PanelHelper(dashboardPage, 'Bar Chart (code editor)');

      await panel.checkIfNoErrors();
      await panel.checkPresence();
      await panel.compareScreenshot('bar-screenshot.png');
    });

    test('Should display Boxplot Chart', async ({ gotoDashboardPage, readProvisionedDashboard }) => {
      /**
       * Go To Panels dashboard e2e.json
       * return dashboardPage
       */
      const dashboard = await readProvisionedDashboard({ fileName: 'e2e.json' });
      const dashboardPage = await gotoDashboardPage({ uid: dashboard.uid });

      /**
       * Check Presence
       */
      const panel = new PanelHelper(dashboardPage, 'Boxplot (visual editor)');

      await panel.checkIfNoErrors();
      await panel.checkPresence();
      await panel.compareScreenshot('boxplot-screenshot.png');
    });

    test('Should display Boxplot Chart code editor', async ({ gotoDashboardPage, readProvisionedDashboard }) => {
      /**
       * Go To Panels dashboard e2e.json
       * return dashboardPage
       */
      const dashboard = await readProvisionedDashboard({ fileName: 'e2e.json' });
      const dashboardPage = await gotoDashboardPage({ uid: dashboard.uid });

      /**
       * Check Presence
       */
      const panel = new PanelHelper(dashboardPage, 'Boxplot (code editor)');

      await panel.checkIfNoErrors();
      await panel.checkPresence();
      await panel.compareScreenshot('boxplot-code-screenshot.png');
    });

    test('Should display Scatter Chart ', async ({ gotoDashboardPage, readProvisionedDashboard, page }) => {
      /**
       * Go To Panels dashboard e2e.json
       * return dashboardPage
       */
      const dashboard = await readProvisionedDashboard({ fileName: 'e2e.json' });
      const dashboardPage = await gotoDashboardPage({ uid: dashboard.uid });

      /**
       * Check Presence
       */
      const panel = new PanelHelper(dashboardPage, 'Scatter');

      await page.waitForTimeout(500);

      await panel.checkIfNoErrors();
      await panel.checkPresence();
      await panel.compareScreenshot('scatter-screenshot.png');
    });
  });
});
