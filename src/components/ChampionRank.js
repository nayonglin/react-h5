import React, { Component } from 'react'
import classNames from 'classnames'
import Helper from '../assets/js/helper'
import '../assets/sass/championRank.scss'
import Swiper from 'react-id-swiper'

class ChampionRank extends Component {
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
        Helper.goLive(item.tJump);
    }

    goNext() {
        if (this.swiper) this.swiper.slideNext()
    }

    goPrev() {
        if (this.swiper) this.swiper.slidePrev()
    }
    
    componentDidMount () {
        setTimeout(() => {
            this.setState({
                initSwiper:true
            })
        }, 100)
    }

    getItems () {        
        const {list, timeNowId} = this.props
        const defaultImg = require("../assets/img/default.png")

        return list.map((item,index) => {
            const uuid = Helper.createUUID()
            //冠军榜需要知道当前的阶段， 然后当前阶段的前一个阶段即为所需要的数据
            const {vTrip,vPassenger,dayTxt} = item, curTimeStage = timeNowId
            const item1 = vTrip, item2 = vPassenger
            let sDecor1 = item1.sDecor, sDecor2 = item2.sDecor, sDecor1S

            sDecor1 = sDecor1 ? (sDecor1.split('.png')[0] + '_6.png') : sDecor1
            sDecor2 = sDecor2 ? (sDecor2.split('.png')[0] + '_6.png') : sDecor2

            return (
                <div className="champion-list-item" key={uuid}>
                    <div className="rank-item item-first">
                        <div className="best-avatar-wrap" onClick={this.goLive.bind(this,item2.tPresent)}>
                        <img 
                            src={item2.tPresent.sLogoUrl}
                            onError={(event)=>event.target.setAttribute("src", defaultImg)}
                        />
                        <div className="best-avatar-mask"></div>
                        </div>
                        {
                            item2.tPresent.sName ? 
                            <div className="best-info">
                                <h3 className="word">{item2.tPresent.sName}</h3>
                                <h3 className="best-value">接客人次 <span>{item2.tPresent.iScore}</span> 人  获得挂件<i className="icon-sign" style={{backgroundImage: "url(" + sDecor2 + ")", backgroundSize:'100% 100%'}}></i></h3>
                            </div>
                            :
                            <div className="best-info">
                                <h3 className="blank-pos">-虚位以待-</h3>
                            </div>
                        }
                    </div>
                    <div className="item-line"></div>
                    <div className="rank-item item-second">
                        <div className="best-avatar-wrap" onClick={this.goLive.bind(this,item1.tPresent)}>
                        <img 
                            src={item1.tPresent.sLogoUrl}
                            onError={(event)=>event.target.setAttribute("src", defaultImg)}
                        />
                        <div className="best-avatar-mask"></div>
                        </div>
                        {
                            item1.tPresent.sName ?
                            <div className="best-info">
                                <h3 className="word">{item1.tPresent.sName}</h3>
                                <h3 className="best-value">时段里程 <span>{item1.tPresent.iScore}</span> km  获得挂件<i className="icon-sign" style={{backgroundImage: "url(" + sDecor1 + ")", backgroundSize:'100% 100%'}}></i></h3>
                            </div>
                            :
                            <div className="best-info">
                                <h3 className="blank-pos">-虚位以待-</h3>
                            </div>
                        }
                    </div>
                    
                    <div className="champion-day"><h3>第{item.iDay}天{dayTxt}</h3></div>
                </div>
            )
        })
    }

    render () {
        const { panel,list,curDay } = this.props, { initSwiper } = this.state
        const params = {
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },
            initialSlide: (list.length - 4)
        }
        
        return (
            <div className="champion-rank-wrap">
                <div className="champion-rank-list">
                    {/* {
                        initSwiper && list.length > 0 ?
                        <Swiper {...params} ref={node => {if(node) this.swiper = node.swiper} }>
                            { this.getItems() }
                        </Swiper>
                        : 
                        <div className="blank">
                            <div className="blank-tip"></div>
                            <div className="blank-msg">暂无人上榜</div>
                        </div>
                    } */}
                    {
                        initSwiper && 
                        <Swiper {...params} ref={node => {if(node) this.swiper = node.swiper} }>
                            { this.getItems() }
                        </Swiper>
                    }
                </div>
                {
                    list.length > 1 &&
                    <div>
                        <button className="swiper-button-next" onClick={this.goNext}></button>
                        <button className="swiper-button-prev" onClick={this.goPrev}></button>
                    </div>
                }
            </div>
        )
    }
}

export default ChampionRank