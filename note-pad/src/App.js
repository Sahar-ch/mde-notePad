import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Split from "react-split";
import Editor from "./components/Editor";
import SideBar from "./components/SideBar";

const App = () => {
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );

  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  );

  const createNewNote = (event) => {
    setNotes((prevNotes) => {
      return [{ id: nanoid(), body: "# type your markdown" }, ...prevNotes];
    });
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const findCurrentNote = () => {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  };

  const updateNote = (text) => {
    setNotes((prevNotes) => {
      let newNotes = [];
      for (let i = 0; i < prevNotes.length; i++) {
        if (prevNotes[i].id === currentNoteId) {
          newNotes.unshift({ ...prevNotes[i], body: text });
        } else {
          newNotes.push(prevNotes[i]);
        }
      }
      return newNotes;
    });
  };

  return (
    <main>
      {(notes[0] && (
        <Split>
          <SideBar />
          <Editor />
        </Split>
      )) || (
        <div className="no-notes">
          <h1>You have no notes</h1>

          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
};

export default App;
