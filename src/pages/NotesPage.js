import React, { useState, useEffect } from "react";
// import notes from "../assets/data";
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";

const NotesPage = () => {
  //creates state
  let [notes, setNotes] = useState([]);

  //fires on conponent mount
  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    let res = await fetch('http://localhost:5000/notes');
    let data = await res.json();

    setNotes(data);
  };

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782;Notes</h2>
        <p className="note-count">{notes.length}</p>
      </div>

      <div className="notes-list">
        {notes.map((n, index) => (
          <ListItem key={index} note={n} />
        ))}
      </div>
      <AddButton />
    </div>
  );
};

export default NotesPage;
