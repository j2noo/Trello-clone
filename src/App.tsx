import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { categoryState, toDoSelector, toDoState } from "./atoms";
import DraggableCard from "./Components/DrabbleCard";
import Board from "./Components/Board";
import AddBoard from "./Components/AddBoard";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: start;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  margin-top: 10vh;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const categorys = useRecoilValue(categoryState); //["To Do","Done","Doing"]

  const onDragEnd = (info: DropResult) => {
    // if (!info.destination) return;
    // const toDos_target = [...toDos[info.source.droppableId]];
    // const toDos_dest = [...toDos[info.destination?.droppableId]];
    // const movedToDo = toDos_target.splice(info.source.index, 1);
    // console.log(toDos_target);
    // if (info.source.droppableId === info.destination?.droppableId) {
    //   toDos_target.splice(info.destination?.index, 0, {
    //     id: movedToDo[0].id,
    //     text: movedToDo[0].text,
    //   });
    //   setToDos((oldToDos) => ({
    //     ...oldToDos,
    //     [info.source.droppableId]: toDos_target,
    //   }));
    // } else {
    //   toDos_dest.splice(info.destination?.index, 0, {
    //     id: movedToDo[0].id,
    //     text: movedToDo[0].text,
    //   });
    //   setToDos((oldToDos) => ({
    //     ...oldToDos,
    //     [String(info.destination?.droppableId)]: toDos_dest,
    //     [info.source.droppableId]: toDos_target,
    //   }));
    // }
    // toDos_dest.splice(info.destination?.index, 0, info.draggableId);
    // let newToDos = [...toDos];
    // newToDos.splice(source.index, 1);
    // newToDos.splice(destination?.index, 0, draggableId);
    // setToDos(newToDos);
  };
  return (
    <>
      {/* <GlobalStyle></GlobalStyle> */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {categorys.map((category) => (
              <Board category={category}></Board>
            ))}

            <AddBoard></AddBoard>
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
