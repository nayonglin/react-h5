import React, { Component } from 'react'
import classNames from'classnames'
import '../assets/sass/navTabs.scss'

class SubNav extends Component {
  constructor () {
    super();

    this.state = {
      type: 1
    }
  }
  handleNavClick (tab) {
    this.props.onNavClick(tab)
  }

  render () {
    const props = this.props
    const stage = props.stage
  	const wrapClass = classNames({
      [`sub-active-${stage}`]:true,
      "sub-nav-wrap": true
  	})

    return (
      <section className={wrapClass}>
        <ul className="sub-nav-name">
          <li>海选</li>
          <li>复赛</li>
          <li>决赛</li>
        </ul>
        <ul className="sub-nav-sign clearfix">
          <li><i></i></li>
          <li><i></i></li>
          <li><i></i></li>
        </ul>
        <ul className="sub-nav-time">
          <li><p>12月12日</p></li>
          <li><p>12月15日</p></li>
          <li><p>12月20日</p></li>
        </ul>
  		</section>
    )
  }
}

export default SubNav