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
        this.state = {
            dataList: [], // 排行表列表
            isShowCurAnhor: false,  // 是否展示当前主播
            curAnhorData: {
                score: [3432,4433,5434,3432,13433,342434],   // 当前主播的分数
                name: "哈哈哈",
                rank: 0
            }, // 当前主播数据
            page: 1, // 请求数据页数
            isShowMoreBtn: true, // 是否展示加载更多按钮
        }
        this.getData = this.getData.bind(this);
    }

    // 获取榜单数据
    getData() {
        let _this = this;
        // 获取当前主播信息
       //alert(HUYASdk.isInHuyaApp());
        
        HUYASdk.getJumpChannelInfo({
            complete : function(resp) {
                let uid = resp.anchoruid != 'undefined' ? resp.anchoruid : 0;   // 获取当前主播uid
                console.log("当前主播信息", resp);
                // 获取榜单列表
                fetchData({
                    actType: 26,
                    uid: uid,
                    size: 10 * _this.state.page
                }).then(res => {

                     // 展示加载更多按钮
                     if((res.data.rankList.length < (10 * _this.state.page)) || _this.state.page == 10) {
                        _this.setState({isShowMoreBtn: false})
                    }
                    
                    log("榜单数据", res);
                    if(res.data.userRank != null) {
                        let name = res.data.userRank.item_text.split('|')[0];
                        _this.setState({
                            dataList: res.data.rankList,
                            isShowCurAnhor: true,
                            curAnhorData: {
                                name: name,
                                score: res.data.userRank.item_nums,
                                headPic: res.data.userRank.item_pic,
                                rank:　res.data.userRank.rank
                            },
                            page: _this.state.page + 1  
                        });
                    } else {
                            _this.setState({
                                dataList: res.data.rankList,
                                isShowCurAnhor: false,
                                page: _this.state.page + 1  
                        });
                    }
                })
            }  
        });

         
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

        // 返回顶部图标class
        let toTopClass = classNames({
            // "to_top": true,
            // "on": this.state.isShowTop
        });
        let numberNames = ['现场值', '能量值', '表演值', '评委值', '应援值', '饭票值'];   
        
        // 拼接榜单li
        let ranks;
        if(this.state.dataList.length > 0) {
            ranks = this.state.dataList.map((list, index) => {
                let listClass = classNames({
                    "list": true,
                    'list1': index == 0,
                    'list2': index == 1,
                    'list3': index == 2,
                });
                let itemPic = list.item_pic.replace("http://", "//");
                let nameAndIntro = list.item_text.split('|');
                let name = nameAndIntro[0];
                let intro = nameAndIntro[1];
                let totalNumber = 0;
                let len = list.item_nums.slice(0,6).length;
                for(let i = 0; i < len; i++){
                    totalNumber += list.item_nums[i];
                } 
              //  let isOnline = (list.lTid != 0) ? true : false;
               return (
                <li className="vote_item" key={index}>
                <div className={listClass}>{index + 1}</div>
                <div className="item_col_1">
                    <div className="col_1_1">
                        <div className="col_1_1_1">
                             <img src={itemPic} className="head_pic" />
                        </div>
                        <div className="col_1_1_2">
                            <div className="name">{name}</div>
                             <div className="score">声优值：{totalNumber}</div>
                        </div>
                    </div>
                    <div className="col_1_2">
                        {intro}
                    </div>
                </div>
                <div className="item_col_2">
                    { 
                    
                      numberNames.map((innerList, innerIndex) => {
                        let scoreClass = classNames({
                            "col_2_1": true,
                            "has_border": innerIndex % 2 != 1
                        });
                        return (<div className={scoreClass} key={innerIndex}>
                            <span className="col_2_1_1">
                            {innerList}
                            </span> 
                            <span className="col_2_1_2"> {list.item_nums[innerIndex]}</span>
                        </div>)
                    }) }   
                </div>
            </li>
            );
            })
        } else {
            ranks =''// <li className="list_none">暂无数据</li>
        }

        // 拼接当前主播分值
        let scoreLi;
        scoreLi = numberNames.map((list, index) => {
           return (<span>
                        {numberNames[index]}
                        <span className="score_span">{this.state.curAnhorData.score[index]}、</span>
                   </span>
                  );  
        });
        return ( 
            <div className="wrap">
                {/* 头图 */}
                <img src={banner} className="banner"/>

                {/* 标题 */}
                <div className="topic"></div>

                {/* 介绍 */}
                <div className="intro">
                1、声优值是检验每一位声优实力的依据<br/>
                2、声优值=人气值+能量值+音悦值+Pick值+饭票值+应援值+评委值<br/>
                3、除人气值外，各赛道分值按照一定比例综合到声优值排行上<br/>
                </div>

                {/* 当前主播 */}
                {
                 this.state.isShowCurAnhor && (<div className="cur_anchor">
                    <div className="cur_anchor_top">
                      <img src={head} className="head_pic" />
                      <span className="cur_name">{this.state.curAnhorData.name}</span>声优值<span className="score_span">{this.state.curAnhorData.score[0]}</span>，排名<span>{this.state.curAnhorData.rank}</span>
                    </div>
                    <div className="cur_anchor_bottom">
                        {/* 专业值<span>123456</span>、人气值<span>155446</span>、 
                        导师值<span>1515452</span>、饭票值<span>4235443</span> */}
                        {scoreLi}
                    </div>
                </div>)
                }
                {/* 榜单 */}
                <ul className="list_ul">
                {ranks}
                    {/* <li className="vote_item">
                        <div className="list">1</div>
                        <div className="item_col_1">
                            <div className="col_1_1">
                                <div className="col_1_1_1">
                                     <img src={head} className="head_pic" />
                                </div>
                                <div className="col_1_1_2">
                                    <div className="name">粉红色的户放发货呢圣诞节开发商声大哭</div>
                                     <div className="score">声优值：323222</div>
                                </div>
                            </div>
                            <div className="col_1_2">
                                这里和打法是否就开始对会发生的健康回复速度快
                            </div>
                        </div>
                        <div className="item_col_2">
                            <div className="col_2_1">
                                <div className="col_2_1_1">
                                    现场值
                                </div>
                                <div className="col_2_1_2">
                                    <div className="progress"></div>
                                </div>
                                <div className="col_2_1_3">
                                    12154545
                                </div>
                            </div>
                        </div>
                    </li> */}
                </ul>   

                 {/* 加载更多按钮  */}
                 {this.state.isShowMoreBtn && <div className="look_more" onClick={(e) => this.getData()}>
                        加载更多 <img src="https://v-cms-img.huya.com/huya/diy-vote/logo1.png" />
                    </div>}
            </div>
        );
    }
}

export default App