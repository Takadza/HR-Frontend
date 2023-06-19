import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AddEditEmployee from './components/AddEditEmployee';
import EmployeesList from './components/EmployeesList';
import Login from './components/Login';
import './index.css';
import reportWebVitals from './reportWebVitals';
import DepartmentsList from './components/DepartmentsList';
import AddEditDepartment from './components/AddEditDepartment';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/employees",
    element: <EmployeesList />,
  },
  {
    path: "/employees/:id",
    element: <AddEditEmployee />,
  },
  {
    path: "/employees/create",
    element: <AddEditEmployee />,
  },
  
  {
    path: "/departments",
    element: <DepartmentsList />,
  },
  {
    path: "/departments/:id",
    element: <AddEditDepartment />,
  },
  {
    path: "/departments/create",
    element: <AddEditDepartment />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
