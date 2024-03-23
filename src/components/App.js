import React from 'react';
import './App.css';
import Login from './Login';
import Rooms from './Rooms/Rooms';
import Accounts from './Accounts/Accounts';
import Rates from './Rates/Rates';
import History from './History/Table';
import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit'

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<RequireAuth loginPath="/login"><Rooms /></RequireAuth>} />
        <Route path='accounts' element={<RequireAuth loginPath="/login"><Accounts /></RequireAuth>} />
        <Route path='rates' element={<RequireAuth loginPath="/login"><Rates /></RequireAuth>} />
        <Route path='history' element={<RequireAuth loginPath="/login"><History /></RequireAuth>} />
        <Route path='login' element={<Login />} />
      </Routes>
    </div>

  );
}

export default App;
