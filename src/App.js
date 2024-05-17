import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './components/Homepage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header></Header>}>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
