import React from "react";
import { Board } from "./Board";
import { useTracker } from "meteor/react-meteor-data";
import { BoardsCollection } from "../../api/boards";
import { useParams } from "react-router-dom";
export const BoardContainer = () => {
  let { boardId } = useParams();

  const board = useTracker(() => {
    return BoardsCollection.findOne({ _id: boardId });
  });

  return board ? <Board board={board} /> : <h1>loading board...</h1>;
};
