import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Signup from './pages/signup';
import ForgotPassword from './pages/forget_password';
import ResetPassword from './pages/reset_password';
import { MessageProvider } from './context/MessageContext';

const App = () => {
  return (
    <MessageProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </Router>
    </MessageProvider>
  );
};

export default App;

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Login from './pages/login';
// import Home from './pages/home';
// import Signup from './pages/signup';
// import ForgotPassword from './pages/forgot_password';
// import ResetPassword from './pages/reset_password';
// import ProtectedRoute from './ProtectedRoute'; // Ensure path is correct
// import { MessageProvider } from './context/MessageContext';

// const App: React.FC = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       // Optionally validate token here with an API call or other logic
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, []);

//   return (
//     <MessageProvider>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password/:token" element={<ResetPassword />} />

//           <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
//             <Route path="/" element={<Home />} />
//             <Route path="/home" element={<Home />} />
//             {/* Add other protected routes here */}
//           </Route>

//           {/* Redirect to login for unknown paths */}
//           <Route path="*" element={<Navigate to="/login" replace />} />
//         </Routes>
//       </Router>
//     </MessageProvider>
//   );
// };

// export default App;
