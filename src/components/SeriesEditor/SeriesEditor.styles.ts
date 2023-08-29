import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';

/**
 * Styles
 */
export const Styles = (theme: GrafanaTheme2) => {
  return {
    newGroup: css`
      margin: ${theme.spacing(2)} 0;
    `,
    group: css`
      margin-bottom: ${theme.spacing(1)};
    `,
    groupHeader: css`
      overflow: hidden;
      text-overflow: ellipsis;
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
