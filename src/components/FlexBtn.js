import React, { Component, PureComponent } from 'react'
import classNames from 'classnames'
import '../assets/sass/flexBtn.scss'

const HUYASdk = window.HUYASdk

class FlexBtn extends PureComponent {
  togglePanel () {
    const props = this.props;
    const openStatus = !props.open
   //在父级改变open状态
    props.onStateChange(openStatus)

    HUYASdk && HUYASdk.expandActivityWindow({
      "expand": openStatus,
      "complete": (resp) => {
      }
    })
  }

  render () {
    const { baseType, isLand, open } = this.props 
    const btnClass = classNames({
      "flex-btn": true,
      "flex-open": open,
      "flex-close": !open
    })

    return (
        <div 
          className={ btnClass } 
          onClick={ this.togglePanel.bind(this) }>
          { 
            open &&
            <p>
              收起排行<i className="open-arrow"></i>
            </p>
          }
      </div>
    )
  }
}
export default FlexBtn