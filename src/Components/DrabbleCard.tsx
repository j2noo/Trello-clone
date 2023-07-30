import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { toDoState } from "../atoms";
const Card = styled.div<{ $isDragging: boolean }>`
  background-color: ${(props) =>
    props.$isDragging ? "#74b9ff" : props.theme.cardColor};
  padding: 10px 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  box-shadow: ${(props) =>
    props.$isDragging ? "0px 2px 10px rgba(0, 0, 0, 0.5)" : "none"};
  &:hover > span {
    opacity: 1;
    display: block;
  }
`;
const Delete = styled.span`
  color: red;
  float: right;
  transition: all 0.2s ease-in-out;
  opacity: 0;
`;
interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}
function DraggableCard({ toDoId, toDoText, index }: IDraggableCardProps) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  function deleteClick(toDoId: number) {
    console.log(toDoId);

    const targetidx = toDos.findIndex((toDo) => toDo.id === toDoId);
    const copiedToDo = [...toDos];
    copiedToDo.splice(targetidx, 1);
    setToDos(copiedToDo);
  }
  return (
    <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          $isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {toDoText}
          <Delete onClick={() => deleteClick(toDoId)}>✖</Delete>
        </Card>
      )}
    </Draggable>
  );
}
export default React.memo(DraggableCard);
