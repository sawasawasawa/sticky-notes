import React, { useEffect, useState } from "react";
import { Layer, Stage } from "react-konva";
import { Colorpicker } from "./Colorpicker";
import { Input } from "./Input";

import {
  checkIfTargetisNote,
  generateNote,
  Note,
  noteHeight,
  noteWidth,
  width,
} from "../utils";
import { Lines } from "./Lines";
import { Notes } from "./Notes";
import { Controls } from "./Controls";
import useDebounce from "../useDebounce";

type InputStateType = {
  x: number;
  y: number;
  id: string;
};

export const Board = ({ board, upsert }) => {
  const [notes, setNotes] = React.useState(board.notes);
  const [colorpicker, setColorpicker] = useState<InputStateType | null>(null);
  const [imageInput, setImageInput] = useState<InputStateType | null>(null);
  const [tool, setTool] = React.useState("pen");
  const [lines, setLines] = React.useState(board.lines);
  const isDrawing = React.useRef(false);

  const debouncedLines = useDebounce(lines, 300);

  useEffect(() => {
    upsert({ _id: board._id }, { notes, lines });
  }, [notes, debouncedLines]);

  useEffect(() => {
    setNotes(board.notes);
    setLines(board.lines);
  }, [board]);

  const addNote = () => setNotes((s) => [...s, generateNote()]);

  const removeAll = () => {
    setNotes([]);
    setLines([]);
  };

  const deleteNote = (noteId: string) =>
    setNotes((notes) => notes.filter((n) => n.id !== noteId));

  const updateNote = (noteId: string, payload: Omit<Note, any>) =>
    setNotes((notes) =>
      notes.map((n) => (n.id != noteId ? n : { ...n, ...payload }))
    );

  const handleDragStart = (e) => {
    const id = e.target.id();
    setNotes(
      notes.map((note) => {
        return {
          ...note,
          isDragging: note.id === id,
        };
      })
    );
  };

  const handleDragEnd = (e: {
    target: { id: () => any };
    evt: { y: number; x: number };
  }) => {
    const id = e.target.id();
    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
              ...note,
              x: e.evt.x - width,
              y: e.evt.y - width,
              isDragging: false,
            }
          : note
      )
    );
  };

  // DRAWING
  const handleMouseDown = (e) => {
    setColorpicker(null);
    setImageInput(null);
    const pos = e.target.getStage().getPointerPosition();
    if (notes.some((note) => checkIfTargetisNote(pos, note))) {
      isDrawing.current = false;
    } else {
      isDrawing.current = true;
      setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    }
  };

  const handleMouseMove = (e: { target: { getStage: () => any } }) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const onChangeColorClick = ({ x, y, id }: InputStateType) => {
    setColorpicker({
      x: x + noteWidth,
      y: y + noteHeight,
      callback: (color) => updateNote(id, { color }),
    });
  };
  const onSetImageClick = ({ x, y, id }: InputStateType) => {
    setImageInput({
      x: x,
      y: y + noteHeight,
      value: notes.find((note) => note.id === id).imageUrl,
      callback: (imageUrl) => updateNote(id, { imageUrl }),
    });
  };

  return (
    <>
      {/*// @ts-ignore*/}
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        // draggable
      >
        {/*// @ts-ignore*/}
        <Layer>
          <Lines lines={lines} />

          <Notes
            notes={notes}
            updateNote={updateNote}
            onChangeColorClick={onChangeColorClick}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
            deleteNote={deleteNote}
            onSetImageClick={onSetImageClick}
          />
        </Layer>
      </Stage>
      <Controls
        colorpicker={colorpicker}
        imageInput={imageInput}
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
        onClick={addNote}
        onClick1={removeAll}
      />
    </>
  );
};

export default Board;
