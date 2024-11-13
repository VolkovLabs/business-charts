import { Locator } from '@playwright/test';
import { DashboardPage, expect, Panel } from '@grafana/plugin-e2e';
import { TEST_IDS } from '../../src/constants/tests';
import { getLocatorSelectors, LocatorSelectors } from './selectors';

/**
 * Panel Helper
 */
export class PanelHelper {
  private readonly locator: Locator;
  private readonly panel: Panel;
  private readonly title: string;
  private readonly selectors: LocatorSelectors<typeof TEST_IDS.panel>;

  constructor(dashboardPage: DashboardPage, panelTitle: string) {
    this.panel = dashboardPage.getPanelByTitle(panelTitle);
    this.title = panelTitle;
    this.locator = this.panel.locator;
    this.selectors = getLocatorSelectors(TEST_IDS.panel)(this.locator);
  }

  private getMsg(msg: string): string {
    return `Panel: ${msg}`;
  }

  public async checkIfNoErrors() {
    return expect(this.panel.getErrorIcon(), this.getMsg('Check If No Errors')).not.toBeVisible();
  }

  public async checkPresence() {
    return expect(this.selectors.chart(), this.getMsg(`Check ${this.title} Presence`)).toBeVisible();
  }

  public async compareScreenshot(name: string) {
    return expect(this.selectors.chart(), this.getMsg(`Check ${this.title} Screenshot`)).toHaveScreenshot(name);
  }

  public async checkAlert() {
    return expect(this.selectors.error(), this.getMsg(`Check ${this.title} Alert`)).toBeVisible();
  }
}
