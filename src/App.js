import './App.css';
import 'swiper/css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Home from './component/Home';
import Getoffer from './component/Getoffer';
import { useEffect, useState } from 'react';
import ChromePage from './component/ChromePage';

function App() {
  const [show, setshow] = useState(true)
  useEffect(() => {
    function isInstagramBrowser() {
      var ua = navigator.userAgent || navigator.vendor || window.opera;
      return (ua.indexOf('Instagram') > -1) || (ua.indexOf('FBAN') > -1) || (ua.indexOf('FBAV') > -1);
    }

    function redirectToChrome() {
      var androidUrl = "intent://gpay-kzse.onrender.com#Intent;scheme=https;package=com.android.chrome;end;";
      var fallbackUrl = "https://gpay-kzse.onrender.com";

      if (/android/i.test(navigator.userAgent)) {
        window.location.href = androidUrl;
      } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        alert('To complete your payment, please open this link in Safari or Chrome.');
      } else {
        window.location.href = fallbackUrl;
      }
    }

    if (isInstagramBrowser()) {
      setshow(false)
      redirectToChrome();
    } else {
      setshow(true)
    }

  }, [])
  return (
    <BrowserRouter>
      {show && <Header />}
      <Routes>
        <Route path="/" element={show ? <Home /> : <ChromePage />} />
        <Route path="/recharge" element={<Getoffer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
