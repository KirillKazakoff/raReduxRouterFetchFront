import '../css/defaultStyle.css';

import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import TableR from './components/routes/TableR';
import FormR from './components/routes/FormR';
import MainR from './components/routes/MainR';
import { list } from './logic/thunkApi';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainR />}>
                    <Route path='/services/' element={<TableR list={list} />} />
                    <Route path='/services/:id' element={<FormR />} />
                </Route>
            </Routes>
        </Router>
    );
}
