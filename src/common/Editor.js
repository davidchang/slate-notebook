import React, { Component } from 'react';
import PasteLinkify from 'slate-paste-linkify';
import { Editor } from 'slate-react';

function MarkHotkey(options) {
  const { type, key } = options;

  // Return our "plugin" object, containing the `onKeyDown` handler.
  return {
    onKeyDown(event, change) {
      // Check that the key pressed matches our `key` option.
      if ((!event.ctrlKey && !event.metaKey) || event.key !== key) {
        return;
      }

      // Prevent the default characters from being inserted.
      event.preventDefault();

      // Toggle the mark `type`.
      change.toggleMark(type);
      return true;
    },
  };
}

const plugins = [
  PasteLinkify({
    type: 'link',
    hrefProperty: 'url',
    collapseTo: 'end',
  }),
  MarkHotkey({ key: 'b', type: 'bold' }),
  MarkHotkey({ key: '`', type: 'code' }),
  MarkHotkey({ key: 'i', type: 'italic' }),
  MarkHotkey({ key: '~', type: 'strikethrough' }),
  MarkHotkey({ key: 'u', type: 'underline' }),
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

  renderMark = props => {
    switch (props.mark.type) {
      case 'bold':
        return <strong>{props.children}</strong>;
      case 'code':
        return <code>{props.children}</code>;
      case 'italic':
        return <em>{props.children}</em>;
      case 'strikethrough':
        return <del>{props.children}</del>;
      case 'underline':
        return <u>{props.children}</u>;
      default:
        return null;
    }
  };

  render() {
    const { value, onChange } = this.props;
    return (
      <Editor
        value={value}
        onChange={onChange}
        plugins={plugins}
        renderMark={this.renderMark}
        renderNode={this.renderNode}
      />
    );
  }
}

export default CommonEditor;
