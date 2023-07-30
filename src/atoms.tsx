import { atom, selector } from "recoil";
export interface IToDo {
  id: number;
  text: string;
}
interface IToDoState {
  [key: string]: IToDo[];
}
export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [
      { id: 1, text: "To Do" },
      { id: 12, text: "운동하기" },
    ],
    Doing: [{ id: 11, text: "놀기" }],
    Done: [{ id: 113, text: "잠자기ss" }],
  },
});
