import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage></Homepage>}>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
