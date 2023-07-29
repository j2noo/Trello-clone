import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DrabbleCard";
import { styled } from "styled-components";
import { useRef } from "react";
import { useForm } from "react-hook-form";

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
    props.$isDraggingOver
      ? "#dfe6e9"
      : props.$isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;
const Form = styled.form`
  width: 100%;
`;
interface IBoardProps {
  toDos: string[];
  boardId: string;
}
interface IAreaProps {
  $isDraggingFromThis: boolean;
  $isDraggingOver: boolean;
}
// form의 입력타입?
interface IForm {
  toDo: string;
}
function Board({ toDos, boardId }: IBoardProps) {
  const { register, setValue, handleSubmit } = useForm<IForm>();

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form>
        <input
          type="text"
          placeholder={`${boardId}에 추가하세요`}
          {...(register("toDo"), { required: true })}
        ></input>
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            $isDraggingOver={snapshot.isDraggingOver}
            $isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo}
                toDo={toDo}
                index={index}
              ></DraggableCard>
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
export default Board;
