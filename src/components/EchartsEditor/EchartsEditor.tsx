import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/seti.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/selection/active-line.js';
import 'codemirror/keymap/sublime.js';
import 'codemirror/addon/comment/comment.js';
import CodeMirror from 'codemirror';
import React, { useEffect, useRef } from 'react';
// import { StandardEditorProps } from '@grafana/data';
import { css } from '@emotion/css';
import { funcParams } from '../../constants';

// import 'codemirror/addon/hint/show-hint.css';
// import 'codemirror/addon/hint/show-hint.js';
// import 'codemirror/addon/hint/javascript-hint.js';

const getStyles = () => ({
  span: css`
    padding: 2px;
    opacity: 0.6;
    font-size: 12px;
  `,
});

/**
 * Properties
 */
interface Props {
  /**
   * Value
   */
  value: string;

  /**
   * On Change
   */
  onChange: (value?: string) => void;
}

export const EchartsEditor: React.FC<Props> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const styles = getStyles();

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    const cm = CodeMirror.fromTextArea(editorRef.current, {
      autoRefresh: true,

      theme: 'seti',
      mode: 'javascript',
      keyMap: 'sublime',

      tabSize: 2,
      smartIndent: true,
      indentUnit: 2,

      lineNumbers: true,
      inputStyle: 'contenteditable',
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],

      matchBrackets: true,
      autoCloseBrackets: true,
      styleActiveLine: true,

      extraKeys: {
        'Cmd-/': 'toggleComment',
        'Ctrl-/': 'toggleComment',
      },
    });

    cm.on('blur', (cm: any) => {
      onChange(cm.doc.getValue());
    });

    // bad hack: try to fix display problems when CodeMoirror is initialized
    setTimeout(() => cm.refresh(), 300);

    return () => {
      if (cm) {
        cm.toTextArea();
      }
    };
  }, [onChange]);

  return (
    <>
      <span className={styles.span}>{`function (${funcParams}) {`}</span>
      <textarea ref={editorRef} value={value} />
      <span className={styles.span}>{`}`}</span>
    </>
  );
};
