import React, { Component } from 'react'
import {log} from './assets/js/util.js';
import classNames from 'classnames'
import './assets/sass/pages/app.scss';
import banner from './assets/img/banner.png';
import head from "./assets/img/head.png";
import {fetchData} from './fetch';
//import {useMyCount} from './components/hook/useCount.js';


// function App() {

//     const count = useMyCount(2);
//     return(
//         <div>2</div>
//     );
// }

import { useState } from 'react';

function App() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default App