import { atom, selector } from "recoil";
interface IToDoState {
  [key: string]: string[];
}
export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": ["A", "B", "C", "로롤"],
    Doing: ["C잊자자자", "E"],
    Done: ["A가나다라"],
  },
});
