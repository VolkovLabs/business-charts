import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';

/**
 * Styles
 */
export const getStyles = (theme: GrafanaTheme2) => {
  return {
    item: css`
      margin-bottom: ${theme.spacing(1)};
    `,
    dragIcon: css`
      cursor: grab;
      color: ${theme.colors.text.disabled};
      margin: ${theme.spacing(0, 0.5)};
      &:hover {
        color: ${theme.colors.text};
      }
    `,
    removeButton: css`
      color: ${theme.colors.text.secondary};
    `,
  };
};
