import { e2e } from '@grafana/e2e';
import { testIds } from '../../src/components/testIds';
const json = require('../../echarts.volkovlabs.io/home.json')

const { panel } = e2e.getSelectors(testIds);
const uid = json.uid;

describe('viewing a panel with time series data', () => {
    beforeEach(() => {
        e2e.flows.openDashboard({
            uid,
        });
    });

    it('should display a good looking graph', () => {
        e2e.components.Panels.Panel.title('Getting Started using Data Source').should('be.visible');
        panel.chart().should('be.visible')
    });
});