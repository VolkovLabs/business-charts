import { getTemplateSrv } from '@grafana/runtime';
import { CodeEditorSuggestionItemKind } from '@grafana/ui';
import { act, render, screen } from '@testing-library/react';
import { AutosizeCodeEditor } from '@volkovlabs/components';
import React from 'react';

import {
  CODE_EDITOR_SUGGESTIONS,
  CodeLanguage,
  Editor,
  Format,
  TEST_IDS,
  VISUAL_CODE_EDITOR_SUGGESTIONS,
} from '../../constants';
import { EchartsEditor } from './EchartsEditor';

/**
 * Mock @grafana/ui
 */
jest.mock('@grafana/ui', () => ({
  ...jest.requireActual('@grafana/ui'),
  PageToolbar: jest.fn(({ leftItems, children }) => {
    return (
      <>
        {leftItems}
        {children}
      </>
    );
  }),
}));

/**
 * Mock @volkovlabs/components
 */
jest.mock('@volkovlabs/components', () => ({
  ...jest.requireActual('@volkovlabs/components'),
  AutosizeCodeEditor: jest.fn().mockImplementation(() => null),
}));

/**
 * Mock @grafana/runtime
 */
jest.mock('@grafana/runtime', () => ({
  getTemplateSrv: jest.fn(),
}));

/**
 * Mock timers
 */
jest.useFakeTimers();

/**
 * Echarts Editor
 */
describe('Echarts Editor', () => {
  const getContext = (modifiers: string[] = []) => {
    const editor = {
      height: 300,
      format: Format.NONE,
    };
    if (modifiers.includes('enableFormatting')) {
      editor.format = Format.AUTO;
    }

    return {
      options: {
        editor,
        themeEditor: {
          height: 300,
        },
      },
    };
  };

  const getComponent = ({ ...restProps }: any, context = getContext()) => {
    return <EchartsEditor item={{}} value={''} {...restProps} context={context} />;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should find component', async () => {
    await act(async () => {
      render(getComponent({}));
    });
    expect(screen.getByTestId(TEST_IDS.editor.root)).toBeInTheDocument();
  });

  it('Should show mini map if value more than 100 symbols', async () => {
    await act(async () => {
      render(getComponent({ value: new Array(102).join('1') }));
    });

    expect(AutosizeCodeEditor).toHaveBeenCalledWith(
      expect.objectContaining({
        showMiniMap: true,
      }),
      expect.anything()
    );
  });

  it('Should enable formatting if enabled', async () => {
    const runFormatDocument = jest.fn();
    const editor = {
      getAction: jest.fn().mockImplementation(() => ({
        run: runFormatDocument,
      })),
    };

    jest.mocked(AutosizeCodeEditor).mockImplementationOnce(({ onEditorDidMount }: any) => {
      onEditorDidMount(editor);
      return null;
    });

    await act(async () => {
      render(getComponent({ value: 'test' }, getContext(['some'])));
    });
    jest.runAllTimers();

    expect(editor.getAction).not.toHaveBeenCalledWith('editor.action.formatDocument');
    expect(runFormatDocument).not.toHaveBeenCalled();
  });

  it('Should not run formatting if disabled', async () => {
    const runFormatDocument = jest.fn();
    const editor = {
      getAction: jest.fn().mockImplementation(() => ({
        run: runFormatDocument,
      })),
    };

    jest.mocked(AutosizeCodeEditor).mockImplementationOnce(({ onEditorDidMount }: any) => {
      onEditorDidMount(editor);
      return null;
    });

    await act(async () => {
      render(getComponent({ value: 'test' }, getContext(['enableFormatting'])));
    });
    jest.runAllTimers();

    expect(editor.getAction).toHaveBeenCalledWith('editor.action.formatDocument');
    expect(runFormatDocument).toHaveBeenCalled();
  });

  it('Should save changes on blur', async () => {
    const value = 'some value';
    const onChange = jest.fn();

    jest.mocked(AutosizeCodeEditor).mockImplementationOnce(({ onBlur }: any) => {
      onBlur(value);
      return null;
    });

    await act(async () => {
      render(
        getComponent({
          onChange,
        })
      );
    });

    expect(onChange).toHaveBeenCalledWith(value);
  });

  it('Should pass value on save', async () => {
    const value = 'some value';
    const onChange = jest.fn();

    jest.mocked(AutosizeCodeEditor).mockImplementationOnce(({ onSave }: any) => {
      onSave(value);
      return null;
    });

    await act(async () => {
      render(
        getComponent({
          onChange,
        })
      );
    });

    expect(onChange).toHaveBeenCalledWith(value);
  });

  it('Should make correct suggestions', async () => {
    let suggestionsResult;
    const variableWithDescription = { name: 'var1', description: 'Var description', label: 'Var Label' };
    const variableWithoutDescription = { name: 'var2', description: '', label: 'Var 2' };
    const variables = [variableWithDescription, variableWithoutDescription];

    jest.mocked(AutosizeCodeEditor).mockImplementationOnce(({ getSuggestions }: any) => {
      suggestionsResult = getSuggestions();
      return null;
    });
    jest.mocked(getTemplateSrv).mockImplementationOnce(
      () =>
        ({
          getVariables: jest.fn().mockImplementation(() => variables),
        }) as any
    );

    await act(async () => {
      render(getComponent({}));
    });

    expect(suggestionsResult).toEqual(expect.arrayContaining(CODE_EDITOR_SUGGESTIONS));
    expect(suggestionsResult).toEqual(
      expect.arrayContaining([
        {
          label: `\$\{${variableWithDescription.name}\}`,
          kind: CodeEditorSuggestionItemKind.Property,
          detail: variableWithDescription.description,
        },
      ])
    );
    expect(suggestionsResult).toEqual(
      expect.arrayContaining([
        {
          label: `\$\{${variableWithoutDescription.name}\}`,
          kind: CodeEditorSuggestionItemKind.Property,
          detail: variableWithoutDescription.label,
        },
      ])
    );
  });

  it('Should make correct suggestions for visual editor', async () => {
    let suggestionsResult;
    const variableWithDescription = { name: 'var1', description: 'Var description', label: 'Var Label' };
    const variableWithoutDescription = { name: 'var2', description: '', label: 'Var 2' };
    const variables = [variableWithDescription, variableWithoutDescription];

    jest.mocked(AutosizeCodeEditor).mockImplementationOnce(({ getSuggestions }: any) => {
      suggestionsResult = getSuggestions();
      return null;
    });
    jest.mocked(getTemplateSrv).mockImplementationOnce(
      () =>
        ({
          getVariables: jest.fn().mockImplementation(() => variables),
        }) as any
    );

    await act(async () => {
      render(
        getComponent(
          {
            item: { id: Editor.VISUALCODE },
          },
          {
            options: {
              editor: {
                format: Format.NONE,
              },
              visualEditor: {
                codeHeight: 300,
              },
            } as any,
          }
        )
      );
    });

    expect(suggestionsResult).toEqual(expect.arrayContaining(VISUAL_CODE_EDITOR_SUGGESTIONS));
  });

  it('Should use JSON language for themeConfig item', async () => {
    await act(async () => {
      render(getComponent({ item: { id: Editor.THEME } }));
    });
    expect(AutosizeCodeEditor).toHaveBeenCalledWith(
      expect.objectContaining({
        language: CodeLanguage.JSON,
      }),
      expect.anything()
    );
  });
});
