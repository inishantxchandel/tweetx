// App.js
import React from 'react';
import ReactDoM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Feed from './pages/Feed';
import Users from './pages/Users';
import App from './App';
import Protected from './components/Protected';
import './index.css';
const router = createBrowserRouter (
  createRoutesFromElements (
        <Route path="/" element={<App/>} >
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path='/' element={<Protected/>} >
        <Route path="/" element={<Users/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/feed" element={<Feed/>} />
        </Route>
      </Route>
    
  )
)
 
const root = ReactDoM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router = {router} />
);