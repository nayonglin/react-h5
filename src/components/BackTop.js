import React, { PureComponent } from 'react'
import classNames from'classnames'

class BackTop extends PureComponent {
  constructor () {
    super();

    this.goTop = this.goTop.bind(this)
  }
  goTop () {
  	window.scroll(0, 0);
    setTimeout(() => {
      this.props.onBtnClick();
    }, 200);
  }

  render () {
    return (
      <a className={
        classNames({
          "backtotop": true,
          "hide": !this.props.status
        })
      } onClick={this.goTop}></a>
    )
  }
}

export default BackTop