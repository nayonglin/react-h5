import React, { Component} from 'react'
import classNames from 'classnames'
import '../assets/sass/taskProgress.scss';

class TaskProgress extends Component {
  render () {
  	const { panel} = this.props 

    return (
      	<div className="task-info">
	      <div className="task-gift"></div>
	      <div className="task">
	        <div className="task-wrap">
	          <div className="task-inner" style={{width: panel.taskPercent}}></div>
	          <div className="task-txt">{panel.iTaskProgress}/{panel.iTaskRequire}</div>
	        </div>
	      </div>
	    </div>
    )
  }
}

export default TaskProgress