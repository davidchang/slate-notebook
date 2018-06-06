import React, { Component } from 'react';

class Sidebar extends Component {
  render() {
    const { activeNoteID, notes, onSelect } = this.props;
    return (
      <div className="SidebarBody">
        {[{ id: null, title: '+ New Note' }, ...notes].map(({ id, title }) => (
          <div
            className={`Sidebar-note-item ${activeNoteID === id
              ? 'Sidebar-note-item-active'
              : ''}`}
            key={id}
            onClick={() => onSelect(id)}
          >
            {title}
          </div>
        ))}
      </div>
    );
  }
}

export default Sidebar;
