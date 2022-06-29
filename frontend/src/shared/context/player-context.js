import { createContext } from "react";

export const PlayerContext = createContext({
  currentPlay: {},
  switchRecord: () => {},
//   logout: () => {},
});
