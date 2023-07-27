import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { styled } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;
const Board = styled.div`
  padding: 30px 10px 20px 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;
const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px 10px;
  margin-bottom: 5px;
`;

const toDos = [
  "모든 인류 구성원의 천부의 존엄성과 동등",
  "폰트에서 원하는 폰트를 가져온다",
  "index.tsx에서 React.StrictMode를 div로 변경",
  "DWhereas a common understanding",
  "E",
];

function App() {
  const onDragEnd = () => {};
  return (
    <>
      {/* <GlobalStyle></GlobalStyle> */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            <Droppable droppableId="one">
              {(provided) => (
                <Board ref={provided.innerRef} {...provided.droppableProps}>
                  {toDos.map((toDo, index) => (
                    <Draggable draggableId={toDo} index={index}>
                      {(provided) => (
                        <Card ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                          {toDo}
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Board>
              )}
            </Droppable>
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
