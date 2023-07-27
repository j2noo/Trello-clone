import { atom, selector } from "recoil";
export const toDoState = atom({
  key: "toDo",
  default: [
    "모든 인류 구성원의 천부의 존엄성과 동등",
    "폰트에서 원하는 폰트를 가져온다",
    "index.tsx에서 React.StrictMode를 div로 변경",
    "DWhereas a common understanding",
    "E",
  ]
});
