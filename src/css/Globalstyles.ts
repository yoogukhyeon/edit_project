import { createGlobalStyle } from 'styled-components'; // ✨ 1

export const GlobalStyle = createGlobalStyle`  // ✨ 2
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
  font-family: 'Noto Sans KR', sans-serif;
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
*{
  box-sizing: border-box;
}
a{
  text-decoration: none
}

 #mobonDivBanner_902498 {
  position: absolute;
  left: -150px;
  top: 80px;

  @media (max-width: 1210px) {
      display: none;
  }
}

#mobonDivBanner_902509 {
  position: absolute;
  right: -150px;
  top: 80px;

  @media (max-width: 1210px) {
      display: none;
  }
} 

#mobonDivBanner_902510 {
  position: absolute;
  right: 50%;
  top: -97px;
  transform: translateX(50%);

  @media (max-width: 710px) {
      display: none;
  }
}

.root_wrap {
  position: relative;
  max-width: 896px;
  width: 100%;
  margin: 0 auto;
}

`;
