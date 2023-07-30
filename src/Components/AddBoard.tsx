import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Wrapper = styled.div`
  border-radius: 5px;
  min-height: 200px;
  background-color: rgba(1, 1, 1, 0.1);
  font-size: 48px;
  display: flex;
  justify-content: center;
  transition: 0.2s ease-in-out;
  align-items: center;
  &:hover {
    background-color: rgba(1, 1, 1, 0.3);
  }
`;
function AddBoard() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  function addClick() {
    const newCategory = prompt("추가할 카테고리를 입력하세요");
    if (newCategory === null) {
      return;
    }
    if (Object.keys(toDos).includes(newCategory)) {
      alert("이미 존재하는 카테고리 입니다!");
      return;
    }
    const newToDos = {
      ...toDos,
      [newCategory]: [{ id: 212, text: "테스트이빈다" }],
    };
    setToDos(newToDos);
  }
  return <Wrapper onClick={addClick}>➕</Wrapper>;
}
export default AddBoard;
