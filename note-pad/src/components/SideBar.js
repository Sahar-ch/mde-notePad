import React from "react";

const SideBar = (props) => {
  const noteElements = props.notes.map((note) => {
    const bodySplit = note.body.split("\n");
    return (
      <div key={note.id}>
        <div
          className={`title ${
            note.id === props.currentNote.id ? "selected-note" : ""
          }`}
          onClick={() => props.setCurrentNoteId(note.id)}
        >
          <h4 className="text-snippet">{bodySplit[0]}</h4>
          <button
            className="delete-btn"
            onClick={(event) => props.deleteNote(event, note.id)}
          >
            <i className="gg-trash trash-icon"></i>
          </button>
        </div>
      </div>
    );
  });
  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>My Notes</h3>

        <button onClick={props.newNote} className="new-note">
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
};

export default SideBar;
