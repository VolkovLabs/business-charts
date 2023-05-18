import React from 'react';
import { getTemplateSrv } from '@grafana/runtime';
import { CodeEditor, CodeEditorSuggestionItemKind } from '@grafana/ui';
import { render, screen } from '@testing-library/react';
import { CodeEditorSuggestions, Format, TestIds } from '../../constants';
import { EChartsEditor } from './EChartsEditor';

/**
 * Mock @grafana/ui
 */
jest.mock('@grafana/ui', () => ({
  ...jest.requireActual('@grafana/ui'),
  CodeEditor: jest.fn().mockImplementation(() => null),
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
 * Editor
 */
describe('Editor', () => {
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
      },
    };
  };

  const getComponent = ({ ...restProps }: any, context = getContext()) => {
    return <EChartsEditor {...restProps} context={context} />;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should find component', async () => {
    render(getComponent({}));
    expect(screen.getByTestId(TestIds.editor.root)).toBeInTheDocument();
  });

  it('Should show mini map if value more than 100 symbols', () => {
    render(getComponent({ value: new Array(102).join('1') }));

    expect(CodeEditor).toHaveBeenCalledWith(
      expect.objectContaining({
        showMiniMap: true,
      }),
      expect.anything()
    );
  });

  it('Should enable formatting if enabled', () => {
    const runFormatDocument = jest.fn();
    const editor = {
      getAction: jest.fn().mockImplementation(() => ({
        run: runFormatDocument,
      })),
    };

    jest.mocked(CodeEditor).mockImplementation(({ onEditorDidMount }: any) => {
      onEditorDidMount(editor);
      return null;
    });

    render(getComponent({}, getContext(['enableFormatting'])));
    jest.runAllTimers();

    expect(CodeEditor).toHaveBeenCalledWith(
      expect.objectContaining({
        monacoOptions: {
          formatOnPaste: true,
          formatOnType: true,
        },
      }),
      expect.anything()
    );
    expect(editor.getAction).toHaveBeenCalledWith('editor.action.formatDocument');
    expect(runFormatDocument).toHaveBeenCalled();
  });

  it('Should save changes on blur', () => {
    const value = 'some value';
    const onChange = jest.fn();

    jest.mocked(CodeEditor).mockImplementation(({ onBlur }: any) => {
      onBlur(value);
      return null;
    });

    render(
      getComponent({
        onChange,
      })
    );

    expect(onChange).toHaveBeenCalledWith(value);
  });

  it('Should pass value on save', () => {
    const value = 'some value';
    const onChange = jest.fn();

    jest.mocked(CodeEditor).mockImplementation(({ onSave }: any) => {
      onSave(value);
      return null;
    });

    render(
      getComponent({
        onChange,
      })
    );

    expect(onChange).toHaveBeenCalledWith(value);
  });

  it('Should make correct suggestions', () => {
    let suggestionsResult;
    const variableWithDescription = { name: 'var1', description: 'Var description', label: 'Var Label' };
    const variableWithoutDescription = { name: 'var2', description: '', label: 'Var 2' };
    const variables = [variableWithDescription, variableWithoutDescription];

    jest.mocked(CodeEditor).mockImplementation(({ getSuggestions }: any) => {
      suggestionsResult = getSuggestions();
      return null;
    });
    jest.mocked(getTemplateSrv).mockImplementation(
      () =>
        ({
          getVariables: jest.fn().mockImplementation(() => variables),
        } as any)
    );

    render(getComponent({}));

    expect(suggestionsResult).toEqual(expect.arrayContaining(CodeEditorSuggestions));
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
});
