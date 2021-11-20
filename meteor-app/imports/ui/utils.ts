import { Vector2d } from "konva/lib/types";

export const width = 100;
export const noteWidth = width + 40;
export const noteHeight = width + 60;
export type Note = {
  id: string;
  x: number;
  y: number;
  text?: string;
  imageUrl?: string;
  isDragging: boolean;
  color: string;
};

export function generateNote(note?: Omit<Note, any>): Note {
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

export const getInitialBoardState = () => ({
  notes: getInitialState(),
  lines: [
    {
      tool: "pen",
      points: [
        1093, 732, 1093, 733, 1093, 737, 1093, 741, 1093, 746, 1098, 751, 1106,
        759, 1124, 777, 1127, 778, 1137, 784, 1148, 788, 1155, 790, 1164, 791,
        1173, 793, 1181, 794, 1183, 794, 1188, 794, 1191, 794, 1193, 794, 1195,
        794, 1196, 794, 1196, 794, 1196, 794, 1197, 794, 1197, 794, 1198, 794,
        1202, 793,
      ],
    },
    {
      tool: "pen",
      points: [1206, 792],
    },
  ],
  createdAt: new Date(),
});

export const getInitialState = () => [
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
    text: "You know what will happen when you click the big plus.",
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
    text: "Super Bonus!\n\nShare the note url and collaborate on it in real time!",
    color: "lightgreen",
    x: 150,
    y: 450,
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

export const checkIfTargetisNote = (pos: Vector2d, note: Note) => {
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