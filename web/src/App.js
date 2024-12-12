import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import NoPage from './pages/NoPage';
import Layout from './pages/Layout';
import AdminUsers from './pages/AdminUsers';
import Events from './pages/Events';
import PostEvent from './pages/PostEvent';



const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="events" element={<Events />} />
          <Route path="adminusers" element={<AdminUsers />} />
          <Route path="*" element={<NoPage />} />
          <Route path="postevent" element={<PostEvent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;