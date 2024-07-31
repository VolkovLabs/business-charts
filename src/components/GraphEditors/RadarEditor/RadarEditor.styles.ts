import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';

/**
 * Styles
 */
export const getStyles = (theme: GrafanaTheme2) => {
  return {
    label: css`
      margin-bottom: ${theme.spacing(1)};
      margin-top: ${theme.spacing(2)};
    `,
    new: css`
      margin-top: ${theme.spacing(2)};
    `,
    removeButton: css`
      color: ${theme.colors.text.secondary};
    `,
  };
};
