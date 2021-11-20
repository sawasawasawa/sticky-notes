import React from "react";
import { Board } from "./Board";
// @ts-ignore
import { useTracker } from "meteor/react-meteor-data";
import { BoardsCollection } from "../../api/boards";
import { useParams } from "react-router-dom";
export const BoardContainer = () => {
  let { boardId } = useParams();

  const board = useTracker(() => {
    return BoardsCollection.findOne({ _id: boardId });
  });

  const upsert = ({ _id }, { notes, lines }) =>
    BoardsCollection.upsert({ _id }, { notes, lines });

  return board ? (
    <Board board={board} upsert={upsert} />
  ) : (
    <h1>loading board...</h1>
  );
};
