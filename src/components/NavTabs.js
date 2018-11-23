import React, { Component,PureComponent } from 'react'
import classNames from'classnames'
import '../assets/sass/navTabs.scss'

class NavTabs extends PureComponent {
  constructor () {
    super()
    this.handleNavClick = this.handleNavClick.bind(this)
  }

  handleNavClick (tab) {
    this.props.onNavClick(tab)
  }

  render () {
    const props = this.props, {isRulePage} = props
    const navClass = classNames({
      "nav-tabs": true,
      [`tab-${props.tab}`]:true
    })

    return (
      <section className="nav-tabs-wrap">
      {
        isRulePage ? 
        <nav className="rule-page-nav">
        </nav>
        :
        <nav className={navClass}>
          <ul>
            <li onClick={() => this.handleNavClick(1)}></li>
            <li onClick={() => this.handleNavClick(2)}></li>
            <li onClick={() => this.handleNavClick(3)}></li>
          </ul>
        </nav>
      }
      </section>
    )
  }
}

export default NavTabs