import { e2e } from '@grafana/e2e';
import { testIds } from '../../src/components/testIds';
const json = require('../../echarts.volkovlabs.io/home.json');

const uid = json.uid;
const testedPanel = json.panels[0];

const getTestIdSelector = (testId: string) => `[data-testid="${testId}"]`;

describe('viewing a panel with time series data', () => {
  beforeEach(() => {
    e2e.flows.openDashboard({
      uid,
    });
  });

  it('should display a good looking graph', () => {
    const currentPanel = e2e.components.Panels.Panel.title(testedPanel.title);
    currentPanel.should('be.visible');
    const chart = currentPanel.find(getTestIdSelector(testIds.panel.chart));
    chart.should('be.visible');
    chart.screenshot(testedPanel.title);
    e2e().compareScreenshots(testedPanel.title);
  });
});
