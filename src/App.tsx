import Test from 'pages/Test';
import { GlobalStyle } from 'css/Globalstyles';
import Layout from 'pages/Layout';
import Main from 'pages/Main';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Test2 from 'pages/Test2';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />}></Route>
          <Route path="/test" element={<Test />}></Route>
          <Route path="/Test2" element={<Test2 />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
