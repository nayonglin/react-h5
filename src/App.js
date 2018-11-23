import React, { Component } from 'react'
import {log} from './assets/js/util.js';
import classNames from 'classnames'
import './assets/sass/pages/app.scss';
import banner from './assets/img/banner.png';
import head from "./assets/img/head.png";
import {fetchData} from './fetch';

class App extends Component {
    constructor() {
        super();
        this.state = {}
        this.getData = this.getData.bind(this);
    }

    // 获取榜单数据
    getData() {
        let _this = this;
        // 获取当前主播信息
        //alert(HUYASdk.isInHuyaApp());
       
        fetchData({
            actType: 26,
        }).then(res => {});
         
    }




    goLive(item) {  //  onClick={(e) => this.goLive({lTid: list.lTid, lSid: list.lSid, lUid: list.lUid, iRoomId: list.iRoomId})}
        // if (!item || !item.lYYId) return;
        if(window.KiwiJSBridge){
            const pargam =
          "live://channelid=" +
          item.lTid +
          "&subid=" +
          item.lSid +
          "&uid=" +
          (item.lPid || item.lUid) +
          "&type=3"; 
        const url = "yykiwi://openurl?banneraction=" + encodeURIComponent(pargam);
        HUYASdk.openUrl({
          url: url
        });
        } else {
          window.open("https://www.huya.com/" + item.iRoomId);
        }
    }

    // 头像加载失败后，加载默认头像
    picErro(e) {
       e.target.onerror=null; 
       e.target.src='//hd.huya.com/201804lottery/img/head_default.png';
    }

    componentDidMount() {
       this.getData();
    }

    componentWillUnmount() {
    }

    render() { 
        
        let exampleClass = classNames({
            // "to_top": true,
            // "on": this.state.isShowTop
        });
      
   
        return ( 
            <div className="wrap">
                {/* 头图 */}
                <img src={banner} className="banner"/>
            </div>
        );
    }
}

export default App