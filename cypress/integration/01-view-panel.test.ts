import { e2e } from '@grafana/e2e';
import { TestIds } from '../../src/constants';

/**
 * Dashboard
 */
const json = require('../../provisioning/dashboards/e2e.json');
const testedPanel = json.panels[0];

/**
 * Selector
 */
const getTestIdSelector = (testId: string) => `[data-testid="${testId}"]`;

/**
 * Panel
 */
describe('Viewing a panel with Apache ECharts', () => {
  beforeEach(() => {
    e2e.flows.openDashboard({
      uid: json.uid,
    });
  });

  it('Should display a Bar Chart', () => {
    const currentPanel = e2e.components.Panels.Panel.title(testedPanel.title);
    currentPanel.should('be.visible');

    /**
     * Chart
     */
    const chart = currentPanel.find(getTestIdSelector(TestIds.panel.chart));
    chart.should('be.visible');

    /**
     * Wait canvas is visible and animation is finished
     */
    chart.find('canvas').should('be.visible').wait(1000);

    /**
     * Screenshot
     */
    chart.screenshot(testedPanel.title);
    e2e().compareScreenshots({ name: testedPanel.title, threshold: 0.05 });
  });
});
