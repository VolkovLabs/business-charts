import { PanelModel } from '@grafana/data';

import { EditorMode } from './constants';
import { PanelOptions } from './types';

/**
 * Outdated Panel Options
 */
interface OutdatedPanelOptions extends Omit<PanelOptions, 'editorMode'> {
  /**
   * Editor Mode introduced in 5.2.0
   */
  editorMode?: EditorMode;
}

/**
 * Get Migrated Options
 *
 * @param panel
 */
export const getMigratedOptions = (panel: PanelModel<OutdatedPanelOptions>): PanelOptions => {
  const { ...options } = panel.options;

  /**
   * Set code editor mode if not defined
   */
  if (!options.editorMode) {
    options.editorMode = EditorMode.CODE;
  }

  return options;
};
