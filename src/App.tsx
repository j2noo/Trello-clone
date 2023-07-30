import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  Droppable,
  DropResult,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import { createGlobalStyle, styled, ThemeProvider } from "styled-components";
import {
  categoryState,
  isDarkState,
  IToDo,
  toDoSelector,
  toDoState,
} from "./atoms";
import DraggableCard from "./Components/DrabbleCard";
import Board from "./Components/Board";
import AddBoard from "./Components/AddBoard";
import { darkTheme, lightTheme } from "./theme";

const Wrapper = styled.div`
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: start;
  height: 100vh;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5vh;
`;
const Title = styled.span`
  font-size: 40px;
  text-align: center;
`;
const ToggleBtn = styled.span<{ isDark: boolean }>`
  position: absolute;
  left: 65vw;
  font-size: 40px;
  transition: 1s ease-in-out;
  opacity: ${(props) => (props.isDark ? 1 : 0.99)};
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  margin-top: 5vh;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;
const GlobalStyle = createGlobalStyle`
/* @import url('https://fonts.googleapis.com/css2?family=Dongle:wght@300;400;700&family=Noto+Sans+KR:wght@400;500;700;900&display=swap'); */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 400;
  font-family: 'Do Hyeon', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  transition: ease-in-out 1s;
  color:black;
  line-height: 1.2;
}
a {
  text-decoration:none;
  color:inherit;
}
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
  const [isDark, setisDark] = useRecoilState(isDarkState);
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
  function toggleTheme() {
    setisDark((curr) => !curr);
  }
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle></GlobalStyle>
        <DragDropContext onDragEnd={onDragEnd}>
          <Wrapper>
            <TitleContainer>
              <Title>진우's To Do list</Title>
              <ToggleBtn isDark={isDark} onClick={toggleTheme}>
                {isDark ? "🌞" : "🌚"}
              </ToggleBtn>
            </TitleContainer>

            <Boards>
              {categorys.map((category) => (
                <Board key={category} category={category}></Board>
              ))}

              <AddBoard></AddBoard>
            </Boards>
          </Wrapper>
        </DragDropContext>
      </ThemeProvider>
    </>
  );
}

export default App;
