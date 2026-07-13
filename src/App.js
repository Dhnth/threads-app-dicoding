import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoadingBar from '@dimasmds/react-redux-loading-bar';
import { asyncGetOwnProfile } from './features/auth/authThunk';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DetailPage from './pages/DetailPage';
import CreateThreadPage from './pages/CreateThreadPage';
import LeaderboardPage from './pages/LeaderboardPage';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const [isPrecheck, setIsPrecheck] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(asyncGetOwnProfile())
        .finally(() => {
          setIsPrecheck(false);
        });
    } else {
      setIsPrecheck(false);
    }
  }, [dispatch]);

  // Menahan render rute agar komponen ProtectedRoute tidak mencuri start membaca data null
  if (isPrecheck) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Memuat aplikasi...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="app">
        <LoadingBar
          style={{
            backgroundColor: '#004ac6',
            height: '3px',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999
          }}
        />
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/thread/:id" element={<DetailPage />} />
            <Route path="/create-thread" element={<CreateThreadPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;