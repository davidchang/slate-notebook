import React from 'react';

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

export default function NoteActionsAndMetadata({
  enableSaveButton,
  noteMetadata,
  onRemove,
  onSave,
}) {
  return (
    <div className="NoteMetadataContainer">
      <button
        className="NoteMetadataContainer-button"
        onClick={onSave}
        disabled={!enableSaveButton}
      >
        Save
      </button>
      {noteMetadata && (
        <button className="NoteMetadataContainer-button" onClick={onRemove}>
          Delete
        </button>
      )}
      {noteMetadata && (
        <span className="NoteMetadataContainer-metadata">
          {noteMetadata.updatedAt ? (
            `Updated at ${new Date(noteMetadata.updatedAt).toLocaleDateString(
              'en-US',
              options,
            )}`
          ) : (
            `Created at ${new Date(noteMetadata.createdAt).toLocaleDateString(
              'en-US',
              options,
            )}`
          )}
        </span>
      )}
    </div>
  );
}
