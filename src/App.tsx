import Test from 'pages/Test';
import { GlobalStyle } from 'css/Globalstyles';
import Layout from 'pages/Layout';
import Main from 'pages/Main';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Test2 from 'pages/Test2';
import Test3 from 'pages/Test3';
import Text from 'pages/Text';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />}></Route>
          <Route path="/test" element={<Test />}></Route>
          <Route path="/test2" element={<Test2 />}></Route>
          <Route path="/test3" element={<Test3 />}></Route>
          <Route path="/text" element={<Text />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
