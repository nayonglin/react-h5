import React, { Component,PureComponent } from 'react'
import classNames from'classnames'
import Emitter from '../assets/js/Emitter'

class ShareCard extends PureComponent {
  render () {
    const {item} = this.props, txt = !item.iType ? '里程' : '接客', iNextScore = item.iNextScore, txt2 = !item.iType ? 'km' : '人'

    return (
    <section className="share-card">
        <div className="wrap" style={{backgroundImage: "url(" + item.sUrl + ")", backgroundSize:'100% 100%'}}>
            <div className="info-wrap">
                <div className="info">
                    <p>累计{txt}<span>{item.iCurAchvScore}</span>{txt2}获得</p>
                    <p>已分享<span>{item.iShareNum}</span>次</p>
                </div>
                {
                    item.iID < 0 ? 
                    <a className="share-disabled"></a>
                    :
                    <a onClick={() => Emitter.emit('showbox', item)}></a>
                }
            </div>
        </div>
        {
            iNextScore < 0 ? 
            <p className="more">已达成全部{txt}成就</p>
            :
            <p className="more">
            还差 <span>{item.iNextScore}</span> {txt2}，即可解锁更高成就 <span>{item.sNextAchName}</span>
            </p>
        }
  	</section>
    )
  }
}

export default ShareCard