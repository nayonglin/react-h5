import React, { PureComponent } from 'react'
import classNames from 'classnames'
import '../assets/sass/avatar.scss'

class Avatar extends PureComponent {
  render () {
    const defaultImg = require("../assets/img/default.png")
    let {url} = this.props
    url = url && url.replace('http','https')

    return (
      <div className="new-avatar-wrap">
        <img 
            src={url}
            onError={(event)=>event.target.setAttribute("src", defaultImg)}
            />
      </div>
    )
  }
}

export default Avatar