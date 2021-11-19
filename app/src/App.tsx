import React from 'react';
import { Stage, Layer, Star, Text } from 'react-konva';
import {StickyNote} from "./components/Note";


function generateNote(note?: Omit<Note, any>):  Note {
  return {
    id:Math.random().toString(),
    x: Math.random()/2 * window.innerWidth,
    y: Math.random() * window.innerHeight,
    isDragging: false,
      text: "Double click to edit text",
      ...note
  };
}

type Note = {
    id: string,
    x: number,
    y: number,
    text: string,
    isDragging: boolean,
}

const INITIAL_STATE: Note[] = [
    generateNote({
        text: "Double click to edit text",
        x: 150,
        y: 50
    }),    generateNote({
        text: "Drag a note to place it at a different location.",
        x: 320,
        y: 50
    }),    generateNote({
        text: "You go it.",
        x: 490,
        y: 50
    }),
];

const App = () => {
  const [notes, setNotes] = React.useState(INITIAL_STATE);
    const addNote = () => setNotes(s=>[...s, generateNote()])
    const removeAll = () => setNotes([])
    const deleteNote = (noteId: string) => setNotes(notes =>notes.filter(n=>n.id !== noteId))
    const updateNote = (noteId: string) => (payload: Omit<Note, "id">) => {
        console.log("_______ noteId, payload", noteId, payload)
        setNotes(notes => notes.map(n => {
            console.log("_______ n.id !== noteId, n.id ,noteId", n.id != noteId, n.id ,noteId)
            return (n.id != noteId ? n : {...n, text: payload});
        }));
    }
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
  const handleDragEnd = (e) => {
    setNotes(
        notes.map((note) => {
          return {
            ...note,
            isDragging: false,
          };
        })
    );
  };

  return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {notes.map((n) => (
              <StickyNote
                  key={n.id}
                  id={n.id}
              colour={"yellow"}
              text={n.text}
              x={n.x}
              y={n.y}
              width={100}
              height={100}
              // onClick={() => console.log('_____ onClick')}
              onTextResize={() => console.log('_____ onTextResize')}
              onTextChange={updateNote(n.id)}
              selected={'selected'}
              onTextClick={() => console.log('_____ onTextClick')}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
                  deleteNote={() => deleteNote(n.id)}
              />
          ))}
            <Text
                onClick={addNote}
                text={"+"}
            fontSize={199}
            // padding={50}
            />

            <Text
                onClick={removeAll}
                text={"RESET"}
            fontSize={100}
                x={window.innerWidth - 350}
                y={window.innerHeight - 100}
            />
        </Layer>
      </Stage>
  );
};

export default App
