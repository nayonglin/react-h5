import React, { Component, PureComponent } from 'react'
import classNames from 'classnames'
import '../assets/sass/tip.scss'

const HUYASdk = window.HUYASdk

class Tip extends PureComponent {
  close () {
    this.props.onStatusChange()
  }

  recharge () {
    //recharge://product_type=0 (0 Y币 1 暂未使用 2 金豆 3 银豆 )
    var url = 'yykiwi://openurl?banneraction=recharge%3a%2f%2fproduct_type%3d2';
    HUYASdk.openUrl({url: url});
    
    this.props.onStatusChange()
  }

  render () {
    const { popMsg } = this.props 
    return (
      <div className="pop-box">
        <div className="pop-box-inner">
          <div className="pop-box-content">
            <div className="pop-msg">
              <p>提示</p>
              <p>{popMsg.msg}</p>
            </div>        
            <div className="btns">
              <div className="pop-btn-group clearfix">
                <a className="col-commit" onClick={this.close.bind(this)}>取消</a>
                <a className="col-recharge" onClick={this.recharge.bind(this)}>充值</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Tip