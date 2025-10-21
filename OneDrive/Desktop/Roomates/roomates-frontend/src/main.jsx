import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { AuthProvider } from './context/AuthContext';

import CssBaseline from '@mui/material/CssBaseline'; // MUI's style reset
import '@fontsource/roboto/300.css'; // Import fonts
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* <-- 2. WRAP YOUR APP */}
        <CssBaseline />
        <App />
      </AuthProvider> {/* <-- 3. CLOSE THE WRAPPER */}
    </BrowserRouter>
  </React.StrictMode>
);