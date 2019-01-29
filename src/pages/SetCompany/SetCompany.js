import React, { Component } from 'react'
import './SetCompany.less'
import { observer, inject } from 'mobx-react'
import Head from '../../components/head'
import util from '../../util/util'

@inject('titleStore')
@observer
class SetCompany extends Component {
  constructor(props) {
    super(props)
    this.state = {
      companyName: ''
    }
  }
  componentWillMount() {
    this.props.titleStore.setPageTitleText('设置我的公司')
  }
  companyInputChange = e => {
    const name = e.currentTarget.value
    console.log(name)
    this.setState({ companyName: name })
  }
  setCompany = e => {
    const companyName = this.state.companyName
    if (!companyName) {
      util.showToast('请输入公司名称',1500)
      console.log('请输入公司名称')
      return
    }
    console.log(companyName)
    this.props.history.push('/LookComplaints')
  }
  render() {
    const { companyName } = this.state
    // const { domestic, overseas } = this.props.cityStore
    return (
      <div className="company-page">
        <Head />
        <div className="content">
          <input className="input"
                 placeholder="请输入您的公司名称全称"
                 value={companyName}
                 onChange={this.companyInputChange.bind(this)}/>
          <div className="button" onClick={this.setCompany.bind(this)}>立即设置</div>
          <div className="content">设置您的公司后，您即可看到同事的吐槽。<br/>
            同时也可以通过我们的微信小程序发表自己的吐槽
          </div>
          <div>
            <img className="logo-img" src="//img.alicdn.com/tfs/TB1MaLKRXXXXXaWXFXXXXXXXXXX-480-260.png"></img>
          </div>
        </div>
      </div>
    )
  }
}

export default SetCompany