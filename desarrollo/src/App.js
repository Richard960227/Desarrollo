import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingView from './components/LandingView';
import AdminView from './components/AdminView';
import UserView from './components/UserView';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="btn btn-square loading"></div>
        </div>
      ) : (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingView />} />
              <Route path="/admin" element={<AdminView />} />
              <Route path="/user" element={<UserView />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;

