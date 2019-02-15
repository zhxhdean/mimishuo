import React, { Component } from 'react'
import './SetCompany.less'
import { observer, inject } from 'mobx-react'
import Head from '../../components/head'
import util from '../../util/util'
import {post} from '../../util/request'

@inject('titleStore')
@observer
class SetCompany extends Component {
  constructor(props) {
    super(props)
    this.state = {
      companyName: '',
      wxcode: ''
    }
  }
  componentWillMount() {
    this.props.titleStore.setPageTitleText('设置我的公司')

    if(util.isWechat()){
      // const wxCode = '001DJFWO1LdEF917OKUO1z2kWO1DJFWs'
      const wxCode = util.getQuery('code')
      if (!wxCode){
        const url = encodeURIComponent(window.location.href)
        const uurl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd6f12e5d04ed854b&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
        window.location.replace(uurl)
      }else {
        this.state.wxcode = wxCode
      }
    } else {
      util.showToast('请在微信浏览器打开')
    }
  }
  companyInputChange = e => {
    const name = e.currentTarget.value
    console.log(name)
    this.setState({ companyName: name })
  }
  async setCompany (e) {
    const companyName = this.state.companyName
    if (!companyName) {
      util.showToast('请输入公司名称',1500)
      console.log('请输入公司名称')
      return
    }
    console.log(companyName)
    const rsp = await post({
      url: '',
      data: {
        companyName: companyName,
        code: this.state.wxcode
      }
    })
    if (rsp.code === 0) {
      util.showToast('绑定成功', 1500)
      setTimeout(() => {
        this.props.history.push('/LookComplaints')
      },1500)
    } else {
      util.showToast(rsp.msg || '绑定失败', 1500)
    }
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