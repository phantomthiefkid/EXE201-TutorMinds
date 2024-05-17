import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';

import Userlist from './components/Usermanagement/Userlist';
function App() {
  return (
    <BrowserRouter>
    <Header></Header>
      <Routes>
     
        
        <Route path='/userlist' element={<Userlist></Userlist>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
