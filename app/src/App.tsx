import React, { useState } from "react";
import { Layer, Line, Stage, Text } from "react-konva";
import { StickyNote } from "./components/Note";
import { Vector2d } from "konva/lib/types";
import { Colorpicker } from "./components/Colorpicker";
import { Input } from "./components/Input";

function generateNote(note?: Omit<Note, any>): Note {
  return {
    id: Math.random().toString(),
    x: (Math.random() / 2) * 50 + 20,
    y: (Math.random() / 2) * 50 + 150,
    isDragging: false,
    color: "yellow",
    text: "Double click to edit text",
    ...note,
  };
}
const width = 100;
const noteWidth = width + 40;
const noteHeight = width + 60;
type Note = {
  id: string;
  x: number;
  y: number;
  text?: string;
  imageUrl?: string;
  isDragging: boolean;
  color: string;
};

const INITIAL_STATE: Note[] = [
  generateNote({
    text: "Double click to edit text",
    x: 150,
    y: 50,
  }),
  generateNote({
    text: "Drag a note to place it at a different location.",
    x: 320,
    y: 50,
  }),
  generateNote({
    text: "You go it.",
    x: 490,
    y: 50,
  }),
  generateNote({
    text: "Can you guess what happens when you click the big plus on the left? :)",
    x: 650,
    y: 50,
  }),
  generateNote({
    text: "Bonus!\n\nHover over a note to change its color...",
    color: "pink",
    x: 150,
    y: 250,
  }),
  generateNote({
    text: "...or change it into an image",
    x: 320,
    y: 250,
  }),
  generateNote({
    imageUrl: "https://konvajs.github.io/assets/yoda.jpg",
    x: 490,
    y: 250,
  }),

  generateNote({
    text: "You can draw anywhere on canvas. \nIf you need an eraser - switch here\n<--",
    x: 70,
    y: window.innerHeight - noteHeight + 5,
  }),
];

const checkIfTargetisNote = (pos: Vector2d, note: Note) => {
  const padding = 40;
  if (
    pos.x >= note.x &&
    pos.x <= note.x + width + padding &&
    pos.y >= note.y &&
    pos.y <= note.y + width + 2 * padding - 20
  ) {
    return true;
  }
  return false;
};

const App = () => {
  const [notes, setNotes] = React.useState(INITIAL_STATE);

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
      notes.map((note) => {
        console.log(
          "_______ note.isDragging === true",
          note.isDragging === true
        );
        return note.id === id
          ? {
              ...note,
              x: e.evt.x - width,
              y: e.evt.y - width,
              isDragging: false,
            }
          : note;
      })
    );
  };

  // DRAWING
  const [tool, setTool] = React.useState("pen");
  const [lines, setLines] = React.useState([]);
  const isDrawing = React.useRef(false);

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

  const onChangeColorClick = ({
    x,
    y,
    id,
  }: {
    x: number;
    y: number;
    id: string;
  }) => {
    setColorpicker({
      x: x + noteWidth,
      y: y + noteHeight,
      callback: (color) => updateNote(id, { color }),
    });
  };
  const onSetImageClick = ({
    x,
    y,
    id,
  }: {
    x: number;
    y: number;
    id: string;
  }) => {
    setImageInput({
      x: x,
      y: y + noteHeight,
      value: notes.find((note) => note.id === id).imageUrl,
      callback: (imageUrl) => updateNote(id, { imageUrl }),
    });
  };

  const [colorpicker, setColorpicker] = useState<null | {
    x: number;
    y: number;
    id: string;
  }>(null);
  const [imageInput, setImageInput] = useState<null | {
    x: number;
    y: number;
    id: string;
  }>(null);

  return (
    <>
      {colorpicker ? <Colorpicker {...colorpicker} /> : null}
      {imageInput ? <Input {...imageInput} /> : null}
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={line.tool === "eraser" ? 50 : 5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}

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
              // onClick={() => console.log('_____ onClick')}
              onTextResize={() => console.log("_____ onTextResize")}
              onChangeColorClick={() =>
                onChangeColorClick({ x: n.x, y: n.y, id: n.id })
              }
              onTextChange={(text) => updateNote(n.id, { text })}
              selected={"selected"}
              onTextClick={() => console.log("_____ onTextClick")}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              deleteNote={() => deleteNote(n.id)}
              onSetImageClick={() =>
                onSetImageClick({ x: n.x, y: n.y, id: n.id })
              }
            />
          ))}
          <Text onClick={addNote} text={"+"} fontSize={199} x={10} y={20} />

          <Text
            onClick={removeAll}
            text={"RESET"}
            fontSize={100}
            x={window.innerWidth - 350}
            y={window.innerHeight - 100}
          />
        </Layer>
      </Stage>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
        style={{ position: "absolute", left: 20, bottom: 20 }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
    </>
  );
};

export default App;
