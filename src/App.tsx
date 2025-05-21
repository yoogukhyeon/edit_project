import { GlobalStyle } from 'css/Globalstyles';
import CounterChar from 'pages/CounterChar';
import HtmlTagRemove from 'pages/HtmlTagRemove';
import ImgToJpg from 'pages/ImgToJpg';
import ImgToPng from 'pages/ImgToPng';
import InvestLucky from 'pages/InvestLucky';
import Layout from 'pages/Layout';
import Lotto from 'pages/Lotto';
import Main from 'pages/Main';
import MakeQr from 'pages/MakeQr';
import MetaTag from 'pages/MetaTag';
import MyIp from 'pages/MyIp';
import PdfToimg from 'pages/PdfToimg';
import TextConvert from 'pages/TextConvert';
import UrlEncoded from 'pages/UrlEncoded';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <ToastContainer
        position="top-center"
        autoClose={2000}
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
          <Route path="/counter-char" element={<CounterChar />}></Route>
          <Route path="/make-qr" element={<MakeQr />}></Route>
          <Route path="/make-meta" element={<MetaTag />}></Route>
          <Route path="/my-ip" element={<MyIp />}></Route>
          <Route path="/lotto" element={<Lotto />}></Route>
          <Route path="/invest-lucky" element={<InvestLucky />}></Route>
          <Route path="/encode-decode" element={<UrlEncoded />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
