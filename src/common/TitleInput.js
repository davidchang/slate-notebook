import React from 'react';

export default function TitleInput({ titleValue, onTitleChange }) {
  return (
    <input
      className="TitleInput"
      type="text"
      value={titleValue}
      placeholder="Note Title"
      onChange={onTitleChange}
    />
  );
}
