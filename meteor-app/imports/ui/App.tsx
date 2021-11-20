import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { BoardsCollection } from "../api/boards";
import { getInitialBoardState } from "./utils";
import { useNavigate } from "react-router-dom";
import { BoardContainer } from "./components/BoardContainer";

function CreateBoard() {
  let navigate = useNavigate();

  useEffect(async () => {
    const res = await BoardsCollection.insert(getInitialBoardState());

    navigate(res);
  }, []);
  return <h1>CREATING BOARD...</h1>;
}

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<CreateBoard />} />
      <Route path="/:boardId" element={<BoardContainer />} />
    </Routes>
  </BrowserRouter>
);
