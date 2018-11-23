import React, { Component } from 'react'
import classNames from 'classnames'
import TableList from './TableList.js'
import '../assets/sass/popBox.scss'

class PopBox extends Component {
  handleBtnClick(type) {
    this.props.onPopBtnClick(type)
  }

  render () {
    const defaultImg = require("../assets/img/default.png");
    const {data} = this.props, curList = data.vFansRank || [],tFansLeader = data.tFansLeader
    const sLogoUrl = tFansLeader.sLogoUrl && tFansLeader.sLogoUrl.replace('http','https')
    let sDecoUrl

    if(tFansLeader.sDecoUrl) {
      sDecoUrl = tFansLeader.sDecoUrl.split('.png')[0] + '_6.png'
      sDecoUrl = sDecoUrl.replace('http', 'https')
    }

    return (
      <div className="pop-box-container">
        <div className="mask"></div>
        <div className="pop-box-wrap">
          <div className="inner">
            <div className="pop-main-content">
              <div className="captain-info">
                <div className="avatar-wrap">
                  <div className="avatar">
                    <img 
                      src={tFansLeader.sLogoUrl}
                      onError={(event)=>event.target.setAttribute("src", defaultImg)}
                    />
                  </div>
                  <i className="icon-captain"></i>
                </div>
                <div className="captain-detail">
                  <h3>{tFansLeader.sName}<i className="icon-pendant" style={{backgroundImage: "url(" + sDecoUrl + ")", backgroundSize:'100% 100%'}}></i></h3>
                </div>
              </div>
              <div className="pop-table">
                <TableList 
                      lists={curList}
                      nav={{tab:1}}
                      panel={{}}
                      baseType={2}
                  />
              </div>
              <p className="pop-txt">时段结束贡献分贝数量最多的用户将成为下个时段的团长</p>
              <div className="pop-btn-group">
                <div className="p-btn btn-sure" onClick={this.handleBtnClick.bind(this)}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PopBox