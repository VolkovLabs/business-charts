import { e2e } from '@grafana/e2e';
import { TEST_IDS } from '../../src/constants';

/**
 * Dashboard
 */

const testedPanelTitle = 'Bar Chart';
const uid = 'fdd5dbe3-794c-4441-9d1c-024a537bbe99';
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
      uid: uid,
    });
  });

  it('Should display a Bar Chart', () => {
    const currentPanel = e2e.components.Panels.Panel.title(testedPanelTitle);
    currentPanel.should('be.visible');

    /**
     * Chart
     */
    const chart = currentPanel.find(getTestIdSelector(TEST_IDS.panel.chart));
    chart.should('be.visible');

    /**
     * Wait canvas is visible and animation is finished
     */
    chart.find('canvas').should('be.visible').wait(1000);

    /**
     * Screenshot
     */
    chart.screenshot(testedPanelTitle);
    e2e().compareScreenshots({ name: testedPanelTitle, threshold: 0.05 });
  });
});
