import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CoinPair from './views/CoinPair';
import Rates from './views/Rates';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/rates" />} />
      <Route path="rates" element={<Rates />} />
      <Route path="app" element={<App />} />
      <Route path="pair" element={<CoinPair supply borrow />} />

    </Routes>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
