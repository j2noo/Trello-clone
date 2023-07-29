import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DrabbleCard";
import { styled } from "styled-components";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

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
  display: flex;
  justify-content: center;
  width: 100%;
  input {
    width: 90%;
    border-radius: 5px;
  }
`;
interface IBoardProps {
  toDos: IToDo[];
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
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    // console.log(data, toDos);
    const newToDoArray = [...toDos, { id: Date.now(), text: data.toDo }];
    setToDos((oldToDos) => ({ ...oldToDos, [boardId]: newToDoArray }));
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          type="text"
          placeholder={`${boardId}에 추가하세요`}
          {...register("toDo", { required: true })}
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
                key={toDo.id}
                toDoText={toDo.text}
                toDoId={toDo.id}
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
