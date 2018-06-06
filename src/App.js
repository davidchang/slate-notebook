import React, { Component } from 'react';
import './App.css';
import NewNote from './NewNote';
import ExistingNote from './ExistingNote';
import Sidebar from './Sidebar';
import storage from './storage';

class App extends Component {
  state = {
    notes: storage.retrieveNotes(),
    activeNoteID: null,
  };

  onSaveNote = ({ title, body, id }) => {
    storage.saveNote({ title, body, id });
    this.setState({
      notes: storage.retrieveNotes(),
    });
  };

  onRemoveNote = id => {
    storage.removeNote({ id });
    this.setState({
      notes: storage.retrieveNotes(),
      activeNoteID: null,
    });
  };

  onSelectNote = id => {
    this.setState({
      activeNoteID: id,
    });
  };

  onCreateNote = ({ title, body }) => {
    const { id } = storage.createNote({ title, body });
    this.setState({
      notes: storage.retrieveNotes(),
      activeNoteID: id,
    });
  };

  render() {
    const { notes, activeNoteID } = this.state;

    return (
      <div className="FullHeightContainer">
        <div className="App">
          <section className="App-sidebar">
            <Sidebar
              activeNoteID={activeNoteID}
              notes={notes}
              onSelect={this.onSelectNote}
            />
          </section>
          <section className="App-main">
            {activeNoteID && (
              <ExistingNote
                activeNote={notes.find(({ id }) => id === activeNoteID)}
                onSave={this.onSaveNote}
                onRemove={this.onRemoveNote}
              />
            )}
            <div style={{ display: activeNoteID ? 'none' : 'block' }}>
              <NewNote onSave={this.onCreateNote} />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
