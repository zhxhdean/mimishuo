import React, { Component } from 'react'
import './SetCompany.less'
import { observer, inject } from 'mobx-react'
import {searchStore} from "../search/store";

@inject('searchStore')
@observer
class SetCompany extends Component {
  constructor(props) {
    super(props)
    this.state = {
      companyName: ''
    }
  }
  componentWillMount() {
    // this.props.cityStore.getList()
  }
  companyInputChange = e => {
    const name = e.currentTarget.value
    console.log(name)
    this.setState({ companyName: name })
  }
  render() {
    const { companyName } = this.state
    // const { domestic, overseas } = this.props.cityStore
    return (
      <div className="company-page">
        <input className="input"
               placeholder="请输入您的公司名称全称"
               value={companyName}
               onChange={this.companyInputChange.bind(this)}/>
        <div className="button">立即设置</div>
        <div className="content">设置您的公司后，您即可看到同事的吐槽。<br/>
          同时也可以通过我们的微信小程序发表自己的吐槽
        </div>
        <div>
          <img className="logo-img" src="//img.alicdn.com/tfs/TB1MaLKRXXXXXaWXFXXXXXXXXXX-480-260.png"></img>
        </div>
      </div>
    )
  }
}

export default SetCompany