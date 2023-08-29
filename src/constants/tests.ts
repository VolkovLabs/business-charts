/**
 * Tests Identifiers
 */
export const TestIds = {
  panel: {
    chart: 'data-testid chart',
    error: 'data-testid chart error',
    themeError: 'data-testid chart theme-error',
  },
  editor: {
    root: 'data-testid editor',
  },
  datasetEditor: {
    buttonAddNew: 'data-testid dataset-editor button-add-new',
    buttonRemove: 'data-testid dataset-editor button-remove',
    item: (name: string) => `data-testid dataset-editor item-${name}`,
    newItem: 'data-testid dataset-editor new-item',
    newItemName: 'data-testidd dataset-editor new-item-name',
    root: 'data-testid dataset-editor',
  },
};
