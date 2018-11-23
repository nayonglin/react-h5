import React, { Component, PureComponent } from 'react'
import classNames from 'classnames'
import Column3Item from './Column3Item.js' 
import '../assets/sass/tableList.scss'

class TableList extends PureComponent {
  render () {
    const { lists, nav, from, panel, baseType, type} = this.props
    const tab = nav.tab, List = Column3Item
    const iRaceRank = panel.iRaceRank, iRank = panel.iRank

    return (
      <div className="table-list">
        {
          baseType === 1 && 
          (tab === 3 ? 
          <div className="table-detail"><p>使用粉丝喇叭提升分贝，时段第一可成为下时段的团长</p></div>
          :
          (
            tab === 2 ? 
            <div className="table-detail">
              <p>主播累计分贝<span>{panel.iScore}</span></p>
              <p>，累计排名<span>NO.{iRank > 99 || iRank == 0 ? '99+' : iRank}</span></p>
            </div>
            : 
            <div className="table-detail">
              <p>主播本时段分贝<span>{panel.iRaceScore}</span></p>
              <p>，排名<span>NO.{iRaceRank > 99 || iRaceRank == 0 ? '99+' : iRaceRank}</span></p>
            </div>
          ))
        }
        <nav className="table-nav">
          <ul className={classNames({
            "col-four": tab === 4
          })}>
            <li>排名</li>
            <li>{tab === 3 ? '粉丝昵称' : '主播昵称'}</li>
            {
              tab === 4 && <li>直播间排位</li>
            }
            <li>
              {
                tab === 1 ? '时段分贝数' :
                ( tab === 2 ? '累计分贝值' : (tab === 4 ? '占领分贝值' : '时段贡献分贝'))
              }
            </li>
          </ul>
        </nav>
        {
          lists.length > 0 ? 
          <ul className="table-main-ul">
            { lists.map((item, index) => <List key={item.tJump && item.tJump.lPid || index} item={item} index={index} tab={nav.tab} type={type}/>) }
          </ul>
          :
          <div className="blank">
            <div className="blank-tip"></div>
            <div className="blank-msg">
              { tab !== 4 && (tab === 3 ? '暂无观众上榜' : '暂无主播上榜') }
              { tab === 4 && '当前主播粉丝团并未对其他主播发起占领'}
            </div>
          </div>
        }
      </div>
    )
  }
}

export default TableList

