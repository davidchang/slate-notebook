import React, { Component } from 'react';
import PasteLinkify from 'slate-paste-linkify';
import AutoReplaceIframe from 'slate-auto-replace-iframe';
import MarkHotkeys from 'slate-mark-hotkeys';
import BibleReferences from 'slate-bible-references';
import { Editor } from 'slate-react';
import isHotkey from 'is-hotkey';

const isSaveHotkey = isHotkey('mod+s');

const plugins = [
  PasteLinkify({
    type: 'link',
    hrefProperty: 'url',
    collapseTo: 'end',
  }),
  AutoReplaceIframe(),
  MarkHotkeys(),
  BibleReferences({
    esvAPIKey: '955cf1a9994ebdf2add173f69affb8814d3d8dd0',
  }),
];

class CommonEditor extends Component {
  renderNode = props => {
    const { node, attributes, children } = props;
    switch (node.type) {
      case 'link':
        return (
          <a {...attributes} href={node.data.get('url')}>
            {children}
          </a>
        );
      default:
        return null;
    }
  };

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
      <Editor
        value={value}
        onChange={onChange}
        onKeyDown={this.onKeyDown}
        plugins={plugins}
        renderNode={this.renderNode}
      />
    );
  }
}

export default CommonEditor;
