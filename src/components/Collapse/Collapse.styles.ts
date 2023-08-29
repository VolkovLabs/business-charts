import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';

/**
 * Styles
 */
export const Styles = (theme: GrafanaTheme2) => {
  return {
    root: css`
      border: 1px solid ${theme.colors.border.weak};
      background-color: ${theme.colors.background.primary};
    `,
    header: css`
      label: Header;
      padding: ${theme.spacing(0.5, 0.5)};
      min-height: ${theme.spacing(4)};
      display: flex;
      align-items: center;
      justify-content: space-between;
      white-space: nowrap;

      &:focus {
        outline: none;
      }
    `,
    title: css`
      font-weight: ${theme.typography.fontWeightBold};
      margin-left: ${theme.spacing(0.5)};
      overflow: hidden;
      text-overflow: ellipsis;
    `,
    collapseIcon: css`
      margin-left: ${theme.spacing(0.5)};
      color: ${theme.colors.text.disabled};
    `,
    actions: css`
      margin-left: auto;
      display: flex;
      align-items: center;
    `,
    content: css`
      padding: ${theme.spacing(1)};
    `,
  };
};
