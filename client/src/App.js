import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./main/login";
import Index from './main';
import ResetPassword from './main/reset-password';
import Signup from './main/signup';
import Switcher from './component/Switcher';
import ScrollToTop from './component/Scroll-top';

export default function App() {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.classList.add('light');
  }, []);
  kfns
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Switcher />
    </BrowserRouter>
    // <div>App</div>
  );
}
