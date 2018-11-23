import React, { Component } from 'react'
import classNames from 'classnames'
import '../assets/sass/popBox.scss'

class PopBox extends Component {
  constructor () {
    super();

    this.state = {
      num: 0
    }

    this.sub = this.sub.bind(this)
    this.add = this.add.bind(this)
  }

  add () {
    const {data} = this.props, iBooms = data.iBooms
    const {num} = this.state 
    this.setState({
      num:(num + 1) <= iBooms ? (num + 1) : iBooms
    })
  }

  sub () {
    const {num} = this.state 
    this.setState({
      num:((num - 1) < 1 ? 0 : (num - 1))
    })
  }

  componentWillMount () {
    const {data} = this.props
    this.setState({
      num: data.iBooms
    })
  }

  handleBtnClick(type) {
    this.props.onPopBtnClick(type, this.state.num)
  }

  handleChange(event) {
    const {data} = this.props, iBooms = data.iBooms
    const value = event.target.value

    this.setState({
      num: value <= iBooms ? value : iBooms
    });
  }

  render () {
    const {data} = this.props;
    const type = data.type
    const {num} = this.state 

    return (
      <div className="pop-box-container">
        <div className="mask"></div>
        <div className="pop-box-wrap">
          <div className="inner">
            <header className="pop-header">
              温馨提示
              <div className="pop-close" onClick={this.handleBtnClick.bind(this,1)}></div>
            </header>
            {
              type <= 3 ?
              <div className="pop-content content-border">
                <i className="icon-tip"></i>
                {
                  type === 1 &&
                  <div className="pop-info">
                    <p>当前暂未获得<i className="icon-gift"></i>，无法参与占领，送出 <i className="icon-gift2"></i>，</p>
                    <p>即可获得相同数量的<i className="icon-gift"></i>。</p>
                  </div>
                }

                {
                  type === 2 && 
                  <div className="pop-info">
                    <p>当前暂未获得<i className="icon-gift"></i>，无法参与占领，今日首次</p>
                    <p>送出1个<i className="icon-gift2"></i>即可获得20个</p>
                  </div>
                }
                
                {
                  type === 3 &&
                  <div className="pop-info">
                    <p>需要佩戴粉丝徽章才能代表粉丝团使用</p>
                    <p><i className="icon-gift"></i>粉丝喇叭，切换徽章可更换粉丝团</p>
                  </div>
                }
                
                <div className="pop-btn-group">
                  {
                    type === 2 ? 
                    <div className="p-btn btn-sendnow" onClick={this.handleBtnClick.bind(this,2)}></div>
                    :
                    <div className="p-btn btn-sure" onClick={this.handleBtnClick.bind(this,1)}></div>
                  }
                </div>
              </div>
              :
              <div className="pop-content-wrap">
                <div className="pop-content">
                  <div className="pop-info">
                    <p>立即使用<i className="icon-gift"></i>粉丝喇叭可贡献分贝数，</p>
                    <p>帮助粉丝团占领当前直播间</p>
                  </div>
                  <div className="pop-fans-group">
                    
                    {
                      data.iOveredScore === 0 ? 
                      <p>
                        我的粉丝团<span className="badge"><em>{data.sFansTitle}</em></span>
                        当前领先
                      </p>
                      :
                      <p>
                        我的粉丝团<span className="badge"><em>{data.sFansTitle}</em></span>
                        距离第一还需<span>{data.iOveredScore}</span>分贝
                      </p>
                    }
                  </div>
                </div>
                <div className="pop-count">
                  <div className="count-select">
                    <h3>选择数量</h3>
                    <i className="btn-select btn-sub" onClick={this.sub}></i>
                    {/* <div className="count-num">{num}</div> */}
                    <input className="count-num" type="number" value={num} onChange={this.handleChange.bind(this)}/>
                    <i className="btn-select btn-add" onClick={this.add}></i>
                  </div>
                  <p className="fans-left">剩余粉丝喇叭：<span>{data.iBooms}</span></p>
                  <div className="pop-btn-group">
                    <div className="p-btn btn-usenow" onClick={this.handleBtnClick.bind(this,3)}></div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default PopBox