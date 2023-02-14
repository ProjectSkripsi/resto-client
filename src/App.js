import React from 'react';
import ContentBody from './components/ContentBody/ContentBody';
import OrderPage from './components/Order';
import { Routes, Route, Navigate } from 'react-router-dom';

const ErrorPage = () => {
  return <div style={{ backgroundColor: 'red' }}>404 Not Found Page</div>;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<ContentBody />} />
      <Route path="/order/:id" element={<OrderPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<Navigate to="/error" />} />
    </Routes>
  );
}

export default App;
