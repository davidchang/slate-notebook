import store from 'store2';

const NOTES_KEY = 'notes';

const findNextIndex = notes => {
  if (!notes || !notes.length) {
    return 1;
  }

  return notes.reduce((acc, { id }) => (acc > id ? acc : id), -1) + 1;
};

const filterNotes = (notes, id) => {
  return notes.filter(({ id: noteID }) => noteID !== id);
};

export default {
  retrieveNotes() {
    return store.get(NOTES_KEY) || [];
  },
  createNote({ title, body }) {
    const notes = store.get(NOTES_KEY) || [];
    const toCreate = {
      title,
      body,
      id: findNextIndex(notes),
      createdAt: Date.now(),
    };
    store.set(NOTES_KEY, [toCreate, ...notes]);
    return toCreate;
  },
  saveNote({ title, body, id }) {
    const notes = store.get(NOTES_KEY) || [];
    const updatedNote = notes.find(({ id: curID }) => curID === id);
    store.set(NOTES_KEY, [
      { ...updatedNote, title, body, updatedAt: Date.now() },
      ...filterNotes(notes, id),
    ]);
  },
  removeNote({ id }) {
    const notes = store.get(NOTES_KEY) || [];
    store.set(NOTES_KEY, filterNotes(notes, id));
  },
};
