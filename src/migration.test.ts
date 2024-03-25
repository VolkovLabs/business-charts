import { EditorMode } from './constants';
import { getMigratedOptions } from './migration';
import { PanelOptions } from './types';

describe('Migrations', () => {
  it('Should return panel options', () => {
    const options: Partial<PanelOptions> = {
      editorMode: EditorMode.VISUAL,
    };

    expect(
      getMigratedOptions({
        options: options,
      } as any)
    ).toEqual(options);
  });

  describe('5.2.0', () => {
    it('Should set code to editor mode if not defined', () => {
      expect(
        getMigratedOptions({
          options: {},
        } as any)
      ).toEqual({
        editorMode: EditorMode.CODE,
      });
    });
  });

  describe('6.0.0', () => {
    describe('getOption', () => {
      it.each([
        {
          name: 'panel.data',
          initial: `
          const data = [];
          data.series.forEach();
          `,
          expected: `
          const data = [];
          context.panel.data.series.forEach();
          `,
        },
        {
          name: 'grafana.replaceVariables',
          initial: `
          const replaceVariables = () => {};
          replaceVariables('123')
          `,
          expected: `
          const replaceVariables = () => {};
          context.grafana.replaceVariables('123')
          `,
        },
        {
          name: 'grafana.theme',
          initial: `
          const theme = {};
          theme.color;
          `,
          expected: `
          const theme = {};
          context.grafana.theme.color;
          `,
        },
        {
          name: 'panel.chart',
          initial: `
          const echartsInstance = {};
          echartsInstance.color;
          `,
          expected: `
          const echartsInstance = {};
          context.panel.chart.color;
          `,
        },
        {
          name: 'echarts',
          initial: `
          const echarts = {};
          echarts.color;
          `,
          expected: `
          const echarts = {};
          context.echarts.color;
          `,
        },
        {
          name: 'ecStat',
          initial: `
          const ecStat = {};
          ecStat.color;
          `,
          expected: `
          const ecStat = {};
          context.ecStat.color;
          `,
        },
        {
          name: 'grafana.eventBus',
          initial: `
          eventBus.subscribe();
          `,
          expected: `
          context.grafana.eventBus.subscribe();
          `,
        },
        {
          name: 'grafana.locationService',
          initial: `
          locationService.replace()
          `,
          expected: `
          context.grafana.locationService.replace()
          `,
        },
        {
          name: 'grafana.notifySuccess',
          initial: `
          notifySuccess()
          `,
          expected: `
          context.grafana.notifySuccess()
          `,
        },
        {
          name: 'grafana.notifyError',
          initial: `
          notifyError()
          `,
          expected: `
          context.grafana.notifyError()
          `,
        },
      ])('Should migrate $name', ({ initial, expected }) => {
        expect(
          getMigratedOptions({
            pluginVersion: '5.2.0',
            options: {
              getOption: initial,
            },
          } as any).getOption
        ).toEqual(expected);
      });
    });
  });
});
