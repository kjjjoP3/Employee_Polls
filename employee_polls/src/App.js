import './App.css';
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Navigation from './components/Navigation';
import { Login } from './components/Login';
import { LeaderBoard } from './components/LeaderBoard';
import { AnswerQuestion } from './components/AnswerQuestion';
import { Home } from './components/Home';
import { CreateQuestion } from './components/CreateQuestion';
import { PageNotFound } from './components/PageNotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';

function App() {
    const currentUser = useSelector(state => state.currentUser.value.length > 0 
        ? state.currentUser.value 
        : JSON.parse(sessionStorage.getItem('currentUser')) || []
      );
  
  return (
    <div className="App">
      {currentUser?.length && <Navigation />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/leaderboard" element={<ProtectedRoute element={<LeaderBoard />} />} />
        <Route path="/add" element={<ProtectedRoute element={<CreateQuestion />} />} />
        <Route path="/questions/:question_id" element={<ProtectedRoute element={<AnswerQuestion />} />} />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;