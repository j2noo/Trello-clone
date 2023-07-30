import { atom, selector, selectorFamily } from "recoil";
export interface IToDo {
  id: number;
  text: string;
  category: string;
}

export const categoryState = atom({
  key: "category",
  default: ["To Do", "Doing", "Done"],
});
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [
    { id: 11111, text: "운동하기", category: "To Do" },
    { id: 22222, text: "잠자기", category: "Done" },
    { id: 33333, text: "놀기", category: "Doing" },
    { id: 44444, text: "공부하기", category: "To Do" },
  ],
});

export const toDoSelector = selectorFamily({
  key: "toDoSelector",
  get:
    (category: string) =>
    ({ get }) => {
      const toDos = get(toDoState);
      return toDos.filter((toDo) => toDo.category === category);
    },
  set:
    (category: string) =>
    ({ set, get }, newValue) => {
      //set에서 selectorFamily 사용도 가능함!
      const toDos = get(toDoSelector(category));
      set(toDoState, newValue);
    },
});

export const isDarkState = atom({ key: "darkTheme", default: false });
