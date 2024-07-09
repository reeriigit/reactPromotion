import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './elements/Home';
import Create from './elements/Create';
import Edit from './elements/Edit';
import Read from './elements/Read';
import Login from './web/Login';
import CreateStore from './stores/CreateStore';
import Mulimages from './stores/Mulimages';
import EditStore from './stores/EditStore';
import AlertStatus from './stores/AlertStatus';
import StoreData from './admin/StoreData';
import EditStoredata from './admin/EditStoreData';
import RegisterForm from './web/RegisterForm';
import RegisterStore from './stores/RegisterStore';
import Dashboard from './stores/pages/Dashboard';
import SidebarData from './stores/components/SidebarData';
import ProfileUser from './stores/components/ProfileUser';
import Settings from './stores/pages/Setting';
import StoreDetail from './stores/pages/StoreDetail';
import Promotion from './stores/pages/Promotion';
import ProductType from './stores/pages/ProductType';
import Product from './stores/pages/Product';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/web/login" element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/edit/:storeId' element={<Edit />} />
        <Route path='/read/:storeId' element={<Read />} />

        <Route path="/stores/create/:username/:password" element={<CreateStore />} />
        <Route path="/stores/editstore/:storeId" element={<EditStore />} />
        <Route path="/stores/mulimages/:user_id" element={<Mulimages />} />
        <Route path="/stores/regisstore" element={<RegisterStore />} />
        
        <Route path="/admin/storedata" element={<StoreData />} />
        <Route path="/admin/editstoredata/:storeId" element={<EditStoredata />} />
        <Route path="/web/register" element={<RegisterForm />} />

        
        
        <Route
          path="/stores/alertstatus/:user_id"
          element={
            <React.Fragment>
              <AlertStatus />
            </React.Fragment>
          }
        />

        <Route
          path="/stores/dashboard/:user_id"
          element={
            <React.Fragment>
              <SidebarData />
              <Dashboard />
            </React.Fragment>
          }
        />

        <Route
          path="/stores/components/profileuser/:user_id/"
          element={
            <React.Fragment>
              <SidebarData />
              <ProfileUser />
            </React.Fragment>
          }
        />

        <Route
          path="/stores/setting/profile/:user_id"
          element={
            <React.Fragment>
              <SidebarData />
              <Settings />
            </React.Fragment>
          }
        />

        <Route
          path="/stores/store/:user_id"
          element={
            <React.Fragment>
              <SidebarData />
              <StoreDetail />
            </React.Fragment>
          }
        />
        <Route
          path="/stores/promotions/:user_id"
          element={
            <React.Fragment>
              <SidebarData />
              <Promotion />
            </React.Fragment>
          }
        />

      <Route
          path="/stores/producttype/:user_id"
          element={
            <React.Fragment>
              <SidebarData />
              <ProductType />
            </React.Fragment>
          }
        />
        <Route
          path="/stores/product/:user_id"
          element={
            <React.Fragment>
              <SidebarData />
              <Product/>
            </React.Fragment>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
