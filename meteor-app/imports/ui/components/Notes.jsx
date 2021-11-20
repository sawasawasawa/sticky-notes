import React from "react";
import { StickyNote } from "./Note";
import { width } from "../utils";

export function Notes(props) {
  const {
    notes = [],
    updateNote,
    onChangeColorClick,
    handleDragStart,
    handleDragEnd,
    deleteNote,
    onSetImageClick,
  } = props;
  return (
    <>
      {notes.map((n) => (
        <StickyNote
          key={n.id}
          id={n.id}
          color={n.color}
          text={n.text}
          imageUrl={n.imageUrl}
          x={n.x}
          y={n.y}
          width={width}
          height={width}
          onChangeColorClick={() =>
            onChangeColorClick({ x: n.x, y: n.y, id: n.id })
          }
          onTextChange={(text) => updateNote(n.id, { text })}
          selected={"selected"}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          deleteNote={() => deleteNote(n.id)}
          onSetImageClick={() => onSetImageClick({ x: n.x, y: n.y, id: n.id })}
        />
      ))}
    </>
  );
}
