import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

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
  const [categories, setCategories] = useRecoilState(categoryState);
  function addClick() {
    const newCategory = prompt("추가할 카테고리를 입력하세요");
    if (newCategory === null) {
      return;
    }
    if (categories.includes(newCategory)) {
      alert("이미 존재하는 카테고리 입니다!");
      return;
    }
    setCategories((curr) => [...curr, newCategory]);
  }
  return <Wrapper onClick={addClick}>➕</Wrapper>;
}
export default AddBoard;
