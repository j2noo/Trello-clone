import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DrabbleCard";
import { styled } from "styled-components";
import { useRef } from "react";

const Wrapper = styled.div`
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  margin-bottom: 10px;
  text-align: center;
  font-size: 30px;
`;
const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;
interface IBoardProps {
  toDos: string[];
  boardId: string;
}
interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}
function Board({ toDos, boardId }: IBoardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onClick = () => {
    inputRef.current?.focus();
    console.log(inputRef);
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <input ref={inputRef} type="text" />
      <button onClick={onClick}>click me</button>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} toDo={toDo} index={index}></DraggableCard>
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
export default Board;
