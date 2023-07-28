import { atom, selector } from "recoil";
interface IToDoState {
  [key: string]: string[];
}
export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    to_do: ["A", "B", "C", "로롤"],
    doing: ["C잊자자자", "E"],
    done: ["A가나다라"],
  },
});
