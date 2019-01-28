import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './Head.less'
import { observer, inject } from 'mobx-react'

@inject('titleStore')
@observer
class Head extends Component {
  constructor(props) {
    super(props)
  }
  comeBack = () => {
    console.log('back')
    const { url } = this.props
    debugger
    if (url) {
      this.props.history.push({ pathname: url })
    } else {
      this.props.history.goBack()
    }
  }
  render() { //
    const { pageTitle } = this.props.titleStore
    return (
      <div className="headTop">
        <div className="arrow" onClick={this.comeBack.bind(this)}></div>
        <div className="title">{pageTitle || '秘密说'}</div>
      </div>
    )
  }
}
export default withRouter(Head)