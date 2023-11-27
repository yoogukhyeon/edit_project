import PdfToimg from 'pages/PdfToimg';
import { GlobalStyle } from 'css/Globalstyles';
import Layout from 'pages/Layout';
import Main from 'pages/Main';
import { Route, Routes } from 'react-router-dom';
import ImgToPng from 'pages/ImgToPng';
import ImgToJpg from 'pages/ImgToJpg';
import HtmlTagRemove from 'pages/HtmlTagRemove';
import TextConvert from 'pages/TextConvert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />}></Route>
          <Route path="/pdf-img" element={<PdfToimg />}></Route>
          <Route path="/img-png" element={<ImgToPng />}></Route>
          <Route path="/img-jpg" element={<ImgToJpg />}></Route>
          <Route path="/html-remove" element={<HtmlTagRemove />}></Route>
          <Route path="/text-convert" element={<TextConvert />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
