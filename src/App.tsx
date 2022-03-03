import React from 'react';
import logo from './logo.svg';
import './App.scss';
import {getSunriseAndSunset} from './apiCall'

function App() {
  return (
    <div className="App">
      <button onClick={getSunriseAndSunset}>
        Get Sunrise and Sunset!
        </button>
    </div>
  );
}

export default App;
