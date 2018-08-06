import React, { Component } from 'react';
import AutoReplaceIframe from 'slate-auto-replace-iframe';
import BibleReferences from 'slate-bible-references';
import Editor from 'slate-md-editor';
import isHotkey from 'is-hotkey';

const MdEditor = Editor({});

const isSaveHotkey = isHotkey('mod+s');

const plugins = [
  AutoReplaceIframe(),
  BibleReferences({
    esvAPIKey: '955cf1a9994ebdf2add173f69affb8814d3d8dd0',
  }),
];

class CommonEditor extends Component {
  onKeyDown = (event, change) => {
    const { onSave } = this.props;
    if (isSaveHotkey(event)) {
      onSave();
      event.preventDefault();
      return true;
    }
  };

  render() {
    const { value, onChange } = this.props;
    return (
      <div className="EditorContainer">
        <MdEditor
          value={value}
          onChange={onChange}
          onKeyDown={this.onKeyDown}
          plugins={plugins}
          renderNode={this.renderNode}
        />
      </div>
    );
  }
}

export default CommonEditor;
