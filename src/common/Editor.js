import React, { Component } from 'react';
import AutoReplaceIframe, { renderNodeHOF } from 'slate-auto-replace-iframe';
import MarkHotkeys, { renderMark } from 'slate-mark-hotkeys';
import { Editor } from 'slate-react';
import isHotkey from 'is-hotkey';

const isSaveHotkey = isHotkey('mod+s');

const plugins = [AutoReplaceIframe(), MarkHotkeys()];

class CommonEditor extends Component {
  renderNode = props => {
    const autoReplaceRenderNode = renderNodeHOF()(props);
    if (autoReplaceRenderNode) {
      return autoReplaceRenderNode;
    }

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
        renderMark={renderMark}
        renderNode={this.renderNode}
      />
    );
  }
}

export default CommonEditor;
