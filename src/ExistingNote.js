import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import TitleInput from './common/TitleInput';
import NoteActionsAndMetadata from './common/NoteActionsAndMetadata';

class Main extends Component {
  state = {
    enableSaveButton: false,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.activeNote && props.activeNote.id !== state.id) {
      return {
        body: Value.fromJSON(props.activeNote.body),
        title: props.activeNote.title,
        id: props.activeNote.id,
      };
    }

    return null;
  }

  onChange = ({ value }) => {
    this.setState({ body: value, enableSaveButton: true });
  };

  onTitleChange = e => {
    this.setState({ title: e.target.value, enableSaveButton: true });
  };

  onSave = () => {
    const { onSave } = this.props;
    const { title, body, id } = this.state;
    onSave({
      title,
      body,
      id,
    });
  };

  onRemove = () => {
    const { onRemove } = this.props;
    const { id } = this.state;
    if (window.confirm('Are you sure you want to delete this note?')) {
      onRemove(id);
    }
  };

  render() {
    const { activeNote } = this.props;
    const { title, body, enableSaveButton } = this.state;
    return (
      <div className="NoteBody">
        <NoteActionsAndMetadata
          noteMetadata={activeNote}
          onSave={this.onSave}
          onRemove={this.onRemove}
          enableSaveButton={enableSaveButton}
        />
        <TitleInput titleValue={title} onTitleChange={this.onTitleChange} />
        <Editor value={body} onChange={this.onChange} />
      </div>
    );
  }
}

export default Main;
