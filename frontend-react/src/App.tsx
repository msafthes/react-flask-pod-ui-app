import React, { useState, useCallback, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

const App = () => {

  const [stores, setStores] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://127.0.0.1:5000/store',
      );
      setStores(result.data.stores);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://127.0.0.1:5000/',
      );
      setMessage(result.data);
    };
    fetchData();
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Message: {message}</p>
        <p>Stores: {stores[0] && stores[0]['name']}</p>
      </header>
    </div>
  );
}

export default App;
