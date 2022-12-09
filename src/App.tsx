import Router from "./Router";
import { createGlobalStyle } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";
import { DarkTheme, LightTheme } from "./theme";
import { isDarkAtom } from "./atoms/atoms";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const GlobalStyled = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@700&family=Source+Sans+Pro:wght@300&display=swap');  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
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
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
  font-family: 'Source Sans Pro', sans-serif;  background-color: ${(props) =>
    props.theme.bgColor};
}
ol, ul {
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
a{
  text-decoration: none;
}
*{
  box-sizing:border-box;
}
`;
function App() {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const changeMode = () => {
    setIsDark(!isDark);
  };
  return (
    <>
      <ThemeProvider theme={isDark ? DarkTheme : LightTheme}>
        <GlobalStyled />
        <DarkModeBtn onClick={changeMode}>
          {isDark ? "LightMode" : "DarkMode"}
        </DarkModeBtn>
        <Router />
        <ReactQueryDevtools initialIsOpen />
      </ThemeProvider>
    </>
  );
}

export default App;

const DarkModeBtn = styled.button`
  width: 100px;
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: ${(props) => props.theme.bgColor};
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;
