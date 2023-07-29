import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "styled-components";
const Card = styled.div<{ $isDragging: boolean }>`
  background-color: ${(props) =>
    props.$isDragging ? "#74b9ff" : props.theme.cardColor};
  padding: 10px 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  box-shadow: ${(props) =>
    props.$isDragging ? "0px 2px 10px rgba(0, 0, 0, 0.5)" : "none"};
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}
function DraggableCard({ toDoId, toDoText, index }: IDraggableCardProps) {
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
        </Card>
      )}
    </Draggable>
  );
}
export default React.memo(DraggableCard);
