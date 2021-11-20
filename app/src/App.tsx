import Board from "../../meteor-app/imports/ui/components/Board";
import "../../meteor-app/client/main.css";
import { getInitialBoardState } from "../../meteor-app/imports/ui/utils";

export const App = () => (
  <Board
    board={getInitialBoardState()}
    upsert={(a: any, b: any) => console.log(a, b)}
  />
);
export default App;
