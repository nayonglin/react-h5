import React, { Component } from 'react'
import classNames from 'classnames'
import '../assets/sass/map.scss'
import Helper from '../assets/js/helper.js'
import Swiper from 'react-id-swiper'

class MapArea extends Component {
    constructor(props) {
        super(props)
        this.goNext = this.goNext.bind(this)
        this.goPrev = this.goPrev.bind(this)
        // this.goLive = this.goLive.bind(this)
        this.swiper = null
        this.state = {
            initSwiper: false
        }
    }

    goLive (item) {
        Helper.goLive(item);
    }

    goNext() {
        if (this.swiper) this.swiper.slideNext()
    }

    goPrev() {
        if (this.swiper) this.swiper.slidePrev()
    }
    
    componentWillMount () {
        this.setState({
            initSwiper:true
        })
    }

    getList (item,index) {
        const defaultImg = require("../assets/img/map-default.png");
        const defaultImg1 = require("../assets/img/default.png")
        const {iGroupId,tAttackFst,tAttackSec,tBeAttack} = item
        const tAttackFstUrl = tAttackFst.sLogoUrl && tAttackFst.sLogoUrl.replace('http','https')
        const tAttackSecUrl = tAttackSec.sLogoUrl && tAttackSec.sLogoUrl.replace('http','https')
        const tBeAttackUrl = tBeAttack.sLogoUrl && tBeAttack.sLogoUrl.replace('http','https')

        return (
            <div className="map-item" key={index}>
                <div className={
                    classNames({
                        "map-section":true,
                        [`map-type-${index}`]:true
                    })
                }>
                    <div className="map-bg"></div>
                    <div className="map-mask-wrap">
                        <div className="map-mask"></div>
                        <img 
                        className="map-img-first"
                        src={tBeAttackUrl}
                        onError={(event)=>event.target.setAttribute("src", defaultImg)}
                        />
                        <img 
                        className="map-img-second"
                        src={tAttackFstUrl}
                        onError={(event)=>event.target.setAttribute("src", defaultImg)}
                        />
                        <img 
                        className="map-img-third"
                        src={tAttackSecUrl}
                        onError={(event)=>event.target.setAttribute("src", defaultImg)}
                        />
                    </div>
                    <div className={
                        classNames({
                            "map-title": true,
                            [`map-title-${iGroupId}`]:true
                        })
                    }></div>
                    <a className="map-btn" onClick={this.goLive.bind(this,tBeAttack.tJump)}></a>
                </div>
                <div className="map-vs-wrap">
                    <div className="map-vs-item">
                        <div className="avatar-wrap" onClick={this.goLive.bind(this,tAttackFst.tJump)}>
                            <img 
                             src={tAttackFstUrl}
                             onError={(event)=>event.target.setAttribute("src", defaultImg1)}
                            />
                            {tAttackFst.tJump.lPid > 0 && <i className="icon-live"></i>}
                        </div>
                        {
                            tAttackFst.sName ? 
                            <div className="map-vs-more">
                                <h3 className="word">{tAttackFst.sName}</h3>
                                <p>粉丝团分贝<span>{tAttackFst.iScore}</span></p>
                            </div>
                            :
                            <div className="map-vs-more">
                                <h3 className="word">--虚位以待--</h3>
                            </div>
                        }
                    </div>
                    <i className="map-icon-vs"></i>
                    <div className="map-vs-item">
                        <div className="avatar-wrap" onClick={this.goLive.bind(this,tAttackSec.tJump)}>
                            <img 
                             src={tAttackSecUrl}
                             onError={(event)=>event.target.setAttribute("src", defaultImg1)}
                            />
                            {tAttackSec.tJump.lPid > 0 && <i className="icon-live"></i>}
                        </div>
                        {
                            tAttackSec.sName ?
                            <div className="map-vs-more">
                                <h3 className="word">{tAttackSec.sName}</h3>
                                <p>粉丝团分贝<span>{tAttackSec.iScore}</span></p>
                            </div>
                            :
                            <div className="map-vs-more">
                                <h3 className="word">--虚位以待--</h3>
                            </div>
                        }
                    </div>
                </div>
                {
                    tBeAttack.sName && 
                    <div className="map-more">
                        正在争夺占领
                        <div className="avatar-wrap" onClick={this.goLive.bind(this,tBeAttack.tJump)}>
                            <img 
                                src={tBeAttackUrl}
                                onError={(event)=>event.target.setAttribute("src", defaultImg1)}
                            />
                            {tBeAttack.tJump.lPid > 0 && <i className="icon-live"></i>}
                        </div>
                        <h3 className="word">{tBeAttack.sName}</h3>的直播间
                    </div>
                }
            </div>
        )
    }

    render () {
        const {warLive,mapList} = this.props, {initSwiper} = this.state 
        const params = {
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },
            // navigation: {
            //     nextEl: '.swiper-button-next',
            //     prevEl: '.swiper-button-prev'
            // },
            initialSlide: 0
        }
        
        return (
            <div className="map-area">
                <div className="map-area-inner">
                    {
                        initSwiper && 
                        <Swiper {...params} ref={node => {if(node) this.swiper = node.swiper} }>
                            { mapList.map((item,index) => this.getList(item,index))}
                        </Swiper>
                    }
                </div>
                <button className="swiper-button-next" onClick={this.goNext}></button>
                <button className="swiper-button-prev" onClick={this.goPrev}></button>
                {
                    warLive.length > 0 &&
                    <div className="report-wrap">
                        <ul>
                            {
                                warLive.map((item,index) => {
                                    const {tAttackInfo,tGuardInfo} = item
                                    return (
                                        item.iType === 1 ?
                                        <li key={index}>
                                            <div className="report-time">{item.time}</div>
                                            <h3 className="word">{tAttackInfo.sName}</h3>
                                            <p>对</p>
                                            <h3 className="word">{tGuardInfo.sName}</h3>
                                            <p>使用号角，分贝上涨<span>{item.iValue1}</span></p>
                                            {item.iFlag === 1 && <i className="fight-back"></i>}
                                        </li>
                                        :
                                        <li key={index}>
                                            <div className="report-time">{item.time}</div>
                                            <h3 className="word">{tAttackInfo.sName}</h3>
                                            <p>粉丝团在</p>
                                            <h3 className="word">{tGuardInfo.sName}</h3>
                                            <p>直播间分贝暴涨<span>{item.iValue1}</span></p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                }
                
            </div>
        )
    }
}

export default MapArea