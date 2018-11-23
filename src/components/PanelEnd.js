import React, { Component, PureComponent } from 'react'
import classNames from 'classnames'
import Helper from '../assets/js/helper.js'
import '../assets/sass/panelEnd.scss'

class PanelEnd extends PureComponent {
  goLive (item) {
    item && Helper.goLive(item.tJump);
  }

  render () {
    const { data } = this.props 
    const rank = data || []
    const defaultImg = require("../assets/img/default.png");
    let url1 = rank[1] && rank[1].sLogoUrl, url0 = rank[0] && rank[0].sLogoUrl, url2 = rank[2] && rank[2].sLogoUrl

    url1 = url1 && url1.replace('http','https')
    url0 = url0 && url0.replace('http','https')
    url2 = url2 && url2.replace('http','https')

    return (
        <div className="panel-end-wrap">
          <div className="end-detail">
            <section className="end-avatar-wrap" onClick={ this.goLive.bind(this,rank[1]) }>
              <div className="end-avatar">
                <img 
                  src={url1}
                  onError={(event)=>event.target.setAttribute("src", defaultImg)}
                />
                <i className="end-lv-2"></i>
              </div>
              <div className="word">{rank[1] && rank[1].sName}</div>
            </section>
            <section className="end-avatar-wrap end-best" onClick={ this.goLive.bind(this,rank[0]) }>
              <div className="end-avatar">
                <img 
                  src={url0}
                  onError={(event)=>event.target.setAttribute("src", defaultImg)}
                />
                <i className="end-lv-1"></i>
              </div>
              <div className="word">{rank[0] && rank[0].sName}</div>
            </section>
            <section className="end-avatar-wrap" onClick={ this.goLive.bind(this,rank[2]) }>
              <div className="end-avatar">
                <img 
                  src={url2}
                  onError={(event)=>event.target.setAttribute("src", defaultImg)}
                />
                <i className="end-lv-3"></i>
              </div>
              <div className="word">{rank[2] && rank[2].sName}</div>
            </section>
          </div>
        </div>
    )
  }
}
export default PanelEnd