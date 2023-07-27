import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { styled } from "styled-components";

function App() {

  const onDragEnd = () => {};
  return (
    <>
      {/* <GlobalStyle></GlobalStyle> */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <Droppable droppableId="one">
            {(provided) => (
              <ul ref={provided.innerRef} {...provided.droppableProps}>
                <Draggable draggableId="first" index={0}>
                  {(provided) => (
                    <li ref={provided.innerRef} {...provided.draggableProps}>
                      <span {...provided.dragHandleProps}>🔥</span>
                      One
                    </li>
                  )}
                </Draggable>
                <Draggable draggableId="second" index={1}>
                  {(provided) => (
                    <li ref={provided.innerRef} {...provided.draggableProps}>
                      <span {...provided.dragHandleProps}>🔥</span>
                      Two
                    </li>
                  )}
                </Draggable>
              </ul>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
}

export default App;
