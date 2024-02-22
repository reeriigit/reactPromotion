import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './elements/Home';
import Create from './elements/Create';
import Edit from './elements/Edit';
import Read from './elements/Read';
import Login from './web/Login';
import CreateStore from './stores/CreateStore';
import Mulimages from './stores/Mulimages';
import EditStore from './stores/EditStore';


function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/web/login" element={<Login/>} />
      <Route path='/' element={<Home/>} />
      <Route path='/create' element={<Create/>} />
      <Route path='/edit/:storeId' element={<Edit/>} />
      <Route path='/read/:storeId' element={<Read/>} />
      <Route path="/stores/create" element={<CreateStore/>} />
      <Route path="/stores/editstore/:storeId" element={<EditStore/>} />
      <Route path="/stores/mulimages/:email/:pass" element={<Mulimages />} />

    </Routes>
  </BrowserRouter>
  );
}

export default App;
