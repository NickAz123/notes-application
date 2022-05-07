import { getByTitle } from "@testing-library/react";
import React from "react";
import { Link } from "react-router-dom";

const generateTitle = (note) => {
  //splitting title by new lines
  const title = note.body.split("\n")[0];

  if (title.length > 45) {
    return title.slice(0, 45);
  }

  return title;
};

const generateTime = (note) => {
  return new Date(note.updated).toLocaleDateString();
};

const generatePreview = (note) => {
  const title = generateTitle(note);
  let preview = note.body.replaceAll("\n", "");
  
  if (preview.length > 45) {
    preview = preview.replaceAll(title, "");
    return preview.slice(0, 45) + "...";
  }

  return preview;
};

const ListItem = ({ note }) => {
  return (
    <Link to={`/note/${note.id}`}>
      <div className="notes-list-item">
        <h3>{generateTitle(note)}</h3>
        <p>
          <span>{generateTime(note)} | </span>
          {generatePreview(note)}
        </p>
      </div>
    </Link>
  );
};

export default ListItem;
