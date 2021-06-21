import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css'
import { BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
      </AuthProvider>
    </Router>
  );
}

export default App;
