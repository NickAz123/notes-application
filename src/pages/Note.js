import React, {useState, useEffect} from "react";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { Link } from "react-router-dom";

const Note = ({match, history}) => {
  const noteId = match.params.id;
  
  //creates state
  let[note, setNote] = useState(null)

  //fires on conponent mount
  useEffect(() => {
    
    getNote();
    
  }, [noteId]);
  

  const getNote = async () => {
    if (noteId === 'new') return;
    let res = await fetch(`http://localhost:5000/notes/${noteId}`)
    let data = await res.json();
    setNote(data);
    
  }

  const updateNote = async () => {
    await fetch(`http://localhost:5000/notes/${noteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...note, 'updated': new Date() })
    });
  }

  const createNote = async () => {
    await fetch(`http://localhost:5000/notes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...note, 'updated': new Date() })
    });
  }

  const deleteNote = async () => {
    await fetch(`http://localhost:5000/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
    history.push('/');
  }

  const handleSubmit = () => {
    if(noteId != 'new' && !note.body){
      deleteNote();
    } else if(noteId !== 'new'){
      updateNote();
    } else if(noteId === 'new' && note != null){
      createNote();
    }

    history.push('/');
  }

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>

        {noteId !== 'new' ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}

      </div>

      <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} value={note?.body}></textarea>
    </div>
  );
};

export default Note;
