import React, { Component } from 'react'
import classNames from 'classnames'
import Swiper from 'react-id-swiper'
import Helper from '../assets/js/helper.js'

class AllDayBestTwo extends Component {
    constructor(props) {
        super(props);
        this.goNext = this.goNext.bind(this)
        this.goPrev = this.goPrev.bind(this)
        this.swiper = null
        this.state = {
            initSwiper: false
        }
    }

    goLive (item) {
        Helper.goLive(item);
      }

    goNext() {
        if (this.swiper) {
            this.swiper.slideNext()
        }
    }

    goPrev() {
        if (this.swiper) {
            this.swiper.slidePrev()
        }
    }
    
    componentWillMount () {
        setTimeout(() => {
            this.setState({
                initSwiper:true
            })
        }, 300)
    }

    getList (item,index) {
        const defaultImg = require("../assets/img/default.png"),date = new Date(), tTopInfo = item.tTopInfo
        const sLogoUrl = tTopInfo.sLogoUrl && tTopInfo.sLogoUrl.replace('http','https'),
            sFansLeaderLogo = tTopInfo.sFansLeaderLogo && tTopInfo.sFansLeaderLogo.replace('http','https'),
            sDecoUrl = tTopInfo.sDecoUrl && tTopInfo.sDecoUrl.replace('http','https')

        let d = new Date(),
            month = d.getMonth() + 1,
            day = d.getDate();

        month = month < 10 ? ('0' + month) : month;
        day = day < 10 ? ('0' + day) : day;

        let iRaceBgnTm = item.iRaceBgnTm, iRaceEndTm = item.iRaceEndTm

        iRaceBgnTm = iRaceBgnTm < 10 ? ('0' + iRaceBgnTm) : iRaceBgnTm;
        iRaceEndTm = iRaceEndTm < 10 ? ('0' + iRaceEndTm) : iRaceEndTm;

        return (
            <div className="item-best-two" key={index}>
                <div className="item-title">
                    <div className="badge"><em>{tTopInfo.sFansTitle}</em></div>
                    {month}月{day}日{iRaceBgnTm}-{iRaceEndTm}时第一
                </div>
                <div className="item-content">
                    <ul>
                        <li onClick={ this.goLive.bind(this,tTopInfo.tJump) }>
                            <div className="avatar-wrap">
                                <div className="avatar">
                                    <img 
                                    src={sLogoUrl}
                                    onError={(event)=>event.target.setAttribute("src", defaultImg)}
                                    />
                                </div>
                               <i className="icon-live"></i>
                            </div>
                            <span className="word">{tTopInfo.sName}</span>
                        </li>
                        <li>
                            <div className="avatar-wrap">
                                <div className="avatar">
                                    <img 
                                    src={sFansLeaderLogo}
                                    onError={(event)=>event.target.setAttribute("src", defaultImg)}
                                    />
                                </div>
                               <i className="icon-live"></i>
                            </div>
                            <span className="word">{tTopInfo.sFansLeaderName || '--虚位以待--'}&nbsp;{tTopInfo.sFansLeaderName&&<i className="icon-pendant" style={{backgroundImage: "url(" + sDecoUrl + ")", backgroundSize:'100% 100%'}}></i>}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    render () {
        const { list,subTab } = this.props, { initSwiper } = this.state
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

        let sDecoClass

        switch (subTab) {
            case 1: sDecoClass = 'sDeco-2'; break;
            case 2: sDecoClass = 'sDeco-1'; break;
            case 3: sDecoClass = 'sDeco-3'; break;
            case 4: sDecoClass = 'sDeco-4'; break;
        }

        return (
            
            list.length > 0 ?
            <div className="all-day-best-two">
                <div className="best-two-inner">
                    {
                        initSwiper && 
                        <Swiper {...params} ref={node => {if(node) this.swiper = node.swiper} }>
                            { list.map((item,index) => this.getList(item,index))}
                        </Swiper>
                    }
                </div>
                {list.length > 1 && <button className="swiper-button-next" onClick={this.goNext}></button>}
                {list.length > 1 && <button className="swiper-button-prev" onClick={this.goPrev}></button>}
                <p className="best-two-more">获得时段第一的粉丝团团长获得特殊挂件&nbsp;<i className={
                    classNames({
                        "icon-pendant1":true,
                        [`${sDecoClass}`]:true
                    })
                }></i></p>
            </div>
            
            :

            <div className="all-day-best-two">
                <div className="blank">
                    <div className="blank-tip"></div>
                    <div className="blank-msg">当前主播粉丝团并未对其他主播发起占领</div>
                </div>
            </div>
        )
    }
}

export default AllDayBestTwo