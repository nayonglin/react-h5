import React, { Component } from 'react'
import {log} from './assets/js/util.js';
import classNames from 'classnames'
import './assets/sass/pages/app.scss';
import banner from './assets/img/banner.png';
import head from "./assets/img/head.png";
import {fetchData} from './fetch';
import useMyCount from './components/hook/useCount';
import {useState, useEffect} from 'react';

function App() {

    const [count, setCount] = useMyCount(2);
    const [isShow, setIsShow] = useState(false);

    return(
        <div onClick={(e) => {setIsShow(!isShow)}}>
        {count}
        {isShow && <div>我被掌控雷电</div>}
        </div>
    );
}

export default App