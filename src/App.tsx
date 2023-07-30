import React from "react";
import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  Droppable,
  DropResult,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { categoryState, IToDo, toDoSelector, toDoState } from "./atoms";
import DraggableCard from "./Components/DrabbleCard";
import Board from "./Components/Board";
import AddBoard from "./Components/AddBoard";

const Wrapper = styled.div`
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: start;
  height: 100vh;
`;
const Title = styled.div`
  font-size: 40px;
  text-align: center;
  margin-top: 5vh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  margin-top: 5vh;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;
function findToDoIndex(toDos: IToDo[], source: DraggableLocation) {
  let count = -1;
  for (let i = 0; i < toDos.length; i++) {
    if (toDos[i].category === source.droppableId) {
      count += 1;
      if (count === source.index) return i;
    }
  }
  console.log("findToDoIndex Error");
  return -2221;
}
function findToDoBeforeIndex(toDos: IToDo[], source: DraggableLocation) {
  if (source.index == 0) return 0;
  let count = 0;
  for (let i = 0; i < toDos.length; i++) {
    if (toDos[i].category === source.droppableId) {
      count += 1;
      if (count === source.index) return i + 1;
    }
  }
  console.log("findToDoIndex Error");
  return -2221;
}
function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const categorys = useRecoilValue(categoryState); //["To Do","Done","Doing"]

  const onDragEnd = (info: DropResult) => {
    console.log(info);
    if (!info.destination) return;
    const toDo_targetIndex = findToDoIndex(toDos, info.source);
    const toDos_copy = [...toDos];
    const movedToDo = toDos_copy.splice(toDo_targetIndex, 1);

    const toDo_destIndex = findToDoBeforeIndex(toDos_copy, info.destination);

    toDos_copy.splice(toDo_destIndex, 0, {
      ...movedToDo[0],
      category: info.destination.droppableId,
    });
    console.log(toDos, toDo_targetIndex, toDo_destIndex);
    setToDos(toDos_copy);
    console.log(toDos_copy, toDo_targetIndex, toDo_destIndex);
  };
  return (
    <>
      {/* <GlobalStyle></GlobalStyle> */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Title>진우's To Do list</Title>
          <Boards>
            {categorys.map((category) => (
              <Board key={category} category={category}></Board>
            ))}

            <AddBoard></AddBoard>
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
