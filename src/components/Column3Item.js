import React, { Component, PureComponent } from 'react'
import classNames from 'classnames'
import Helper from '../assets/js/helper.js'
import Emitter from '../assets/js/Emitter.js'

class Column3Item extends Component {
  goLive (item) {
    Helper.goLive(item);
  }

  render () {
    const {index, tab, type} = this.props 
    const defaultImg = require("../assets/img/default.png");
    const className = classNames({
      'rank': true,
      [`rank-${index + 1}`]: true,
      'rank-normal': index > 2
    })
    let item = type && type === 1 && this.props.item.tItem ? this.props.item.tItem : this.props.item
    const imgUrl = item.sLogoUrl && item.sLogoUrl.replace('http','https'), sFansTitle = item.sFansTitle

    return (
      <li className="wrap-two">
          <div className={className}>
            { index > 2 ? <span>{index+1}</span> : <span></span> }
          </div>
          <div className="list-item-info">
            <div className="avatar-name-wrap" onClick={ this.goLive.bind(this, item.tJump) }> 
              <div className="avatar-wrap">
                <div className="avatar">
                  <img 
                    src={imgUrl}
                    onError={(event)=>event.target.setAttribute("src", defaultImg)}
                  />
                </div>
                { item.tJump && item.tJump.lTid > 0 && tab !== 3 && <i className="icon-live"></i> }
              </div>
              <span className="word">{item.sName}</span>
              {!type && tab !== 4 && tab !== 3 && sFansTitle && <div className="badge"><em>{sFansTitle}</em></div>}
            </div>
            
            {type && <div className="fans-arrow" onClick={() => Emitter.emit('popUpFansGroup', this.props.item)}></div>}
          </div>
          {
            tab === 4 && <div className="list-item-more">NO.{item.iRank}</div>
          }
          <div className="list-item-value">{item.iScore}</div>
      </li>
    )
  }
}

export default Column3Item