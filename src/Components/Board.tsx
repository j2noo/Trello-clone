import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DrabbleCard";
import { styled } from "styled-components";

const Wrapper = styled.div`
  padding: 30px 10px 20px 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;
const Title = styled.div`
  margin-bottom: 10px;
  text-align: center;
  font-size: 30px;
`;
interface IBoardProps {
  toDos: string[];
  boardId: string;
}
function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} toDo={toDo} index={index}></DraggableCard>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
}
export default Board;
