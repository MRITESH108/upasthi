// App.js
import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import College from './components/College';
import Student from './components/Student';


const Layout = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center' 
  }}>
    <Navbar />
    <Outlet />
  </div>
);


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <div>Welcome Home</div> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'about', element: <div>About Page</div> },
      { path: 'colleges', element: <College/> },
      { path: 'students', element: <div><Student/></div> },
      { path: 'service', element: <div>Service Page</div> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;