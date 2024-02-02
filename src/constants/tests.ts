/**
 * Tests Identifiers
 */
export const TEST_IDS = {
  panel: {
    chart: 'data-testid chart',
    error: 'data-testid chart error',
    themeError: 'data-testid chart theme-error',
  },
  editor: {
    root: 'data-testid editor',
  },
  seriesEditor: {
    root: 'data-testid series-editor',
    buttonAddNew: 'data-testid series-editor button-add-new',
    buttonRemove: 'data-testid series-editor button-remove',
    itemHeader: (name: string) => `data-testid series-editor item-header-${name}`,
    itemContent: (name: string) => `data-testid series-editor item-content-${name}`,
    newItem: 'data-testid series-editor new-level',
    newItemId: 'data-testid series-editor new-item-id',
    fieldId: 'data-testid series-editor field-id',
    fieldName: 'data-testid series-editor field-name',
    fieldType: 'series-editor field-type',
    fieldEncodeX: 'series-editor field-encode-x',
    fieldEncodeY: 'series-editor field-encode-y',
  },
  datasetEditor: {
    buttonAddNew: 'data-testid dataset-editor button-add-new',
    buttonRemove: 'dataset-editor button-remove',
    item: (name: string) => `data-testid dataset-editor item-${name}`,
    newItem: 'data-testid dataset-editor new-item',
    newItemName: 'dataset-editor new-item-name',
    root: 'data-testid dataset-editor',
  },
};
