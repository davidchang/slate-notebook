import React, { Component } from 'react';
import { Value } from 'slate';
import TitleInput from './common/TitleInput';
import NoteActionsAndMetadata from './common/NoteActionsAndMetadata';
import Editor from './common/Editor';

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.',
              },
            ],
          },
        ],
      },
    ],
  },
});

const initialState = {
  body: initialValue,
  title: 'New Untitled Note',
  enableSaveButton: false,
};

class Main extends Component {
  state = initialState;

  onChange = ({ value }) => {
    this.setState({ body: value, enableSaveButton: true });
  };

  onTitleChange = e => {
    this.setState({ title: e.target.value, enableSaveButton: true });
  };

  onSave = () => {
    const { onSave } = this.props;
    const { title, body } = this.state;
    onSave({
      title,
      body,
    });
    this.setState(initialState);
  };

  render() {
    const { title, body, enableSaveButton } = this.state;
    return (
      <div className="NoteBody">
        <NoteActionsAndMetadata
          onSave={this.onSave}
          enableSaveButton={enableSaveButton}
        />
        <TitleInput titleValue={title} onTitleChange={this.onTitleChange} />
        <Editor value={body} onChange={this.onChange} onSave={this.onSave} />
      </div>
    );
  }
}

export default Main;
