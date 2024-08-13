import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';

/**
 * Styles
 */
export const getStyles = (theme: GrafanaTheme2) => {
  return {
    add: css`
      margin-top: ${theme.spacing(2)};
      margin-bottom: ${theme.spacing(2)};
    `,
    valueLevel: css`
      margin-bottom: ${theme.spacing(2)};
    `,
    item: css`
      margin-bottom: ${theme.spacing(1)};
    `,
    header: css`
      padding: ${theme.spacing(0.5, 0.5)};
      border-radius: ${theme.shape.radius?.default};
      background: ${theme.colors.background.secondary};
      min-height: ${theme.spacing(4)};
      display: grid;
      grid-template-columns: minmax(100px, max-content) min-content;
      align-items: center;
      justify-content: space-between;
      white-space: nowrap;

      &:focus {
        outline: none;
      }
    `,
    column: css`
      display: flex;
      align-items: center;
    `,
    titleWrapper: css`
      display: flex;
      align-items: center;
      flex-grow: 1;
      cursor: pointer;
      overflow: hidden;
      margin-right: ${theme.spacing(0.5)};
    `,
    dragHandle: css`
      display: flex;
      margin: ${theme.spacing(0, 0.5)};
    `,
    dragIcon: css`
      cursor: grab;
      color: ${theme.colors.text.disabled};
      &:hover {
        color: ${theme.colors.text};
      }
    `,
    title: css`
      font-weight: ${theme.typography.fontWeightBold};
      color: ${theme.colors.text.secondary};
      margin-left: ${theme.spacing(0.5)};
      overflow: hidden;
      text-overflow: ellipsis;
    `,
  };
};
