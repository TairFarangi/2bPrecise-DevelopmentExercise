import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import OrganizationStructure from './components/OrganizationStructure';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<OrganizationStructure />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
