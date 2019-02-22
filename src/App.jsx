import { React, useState, useEffect } from 'react';
import classNames from 'classnames';
import { log } from './assets/js/util';
import './assets/sass/pages/app.scss';
import banner from './assets/img/banner.png';
import head from './assets/img/head.png';
import { fetchData } from './fetch';
import useMyCount from './components/hook/useCount';

import Rule from './components/Rule';

function App() {
  const [count, setCount] = useMyCount(2);
  const [isShow, setIsShow] = useState(false);

  return (
    <div role="presentation" onClick={(e) => { setIsShow(!isShow); }}>
      <Rule />
      { count }
      {isShow && <div>我被掌控雷电</div>}
    </div>
  );
}

export default App;
