import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter,RouterProvider,createRoutesFromChildren,Route} from 'react-router-dom'
import GetUser from './pages/GetUser';
import SetUsers from './pages/SetUsers';
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route element={<App/>}>
      <Route path="/" element={<GetUser/>}/>
      <Route path="/SetUser" element={<SetUsers/>}/>
    </Route>
    
  )
);
root.render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);

