import React, { Component } from 'react'
import './LookComplaints.less'
import { observer, inject } from 'mobx-react'
import Head from '../../components/head'
import {get,post} from '../../util/request'
import {NEWLETTER_DETAIL, CITY_LIST} from '../../util/urls'
import util from '../../util/util'
@inject('titleStore')
@observer
class LookComplaints extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        {
          "subject":"",
          "content":"饭不怎么好吃呀",
          "createTime":"2019-01-02",
          "imageUrls":["https://mimishuo.oss-cn-beijing.aliyuncs.com/206bb6537b1343f2a514159f6d6c636b.jpg","https://mimishuo.oss-cn-beijing.aliyuncs.com/206bb6537b1343f2a514159f6d6c636b.jpg","https://mimishuo.oss-cn-beijing.aliyuncs.com/206bb6537b1343f2a514159f6d6c636b.jpg"],
          "headImageUrl":"https://mimishuo.oss-cn-beijing.aliyuncs.com/ee9075b0444fee6a61c6175bccc7853e.jpeg",
          "replyTime":"2019-01-02",
          "reply":"我们会加快处理的，我们会加快处理的，我们会加快处理的，我们会加快处理的，我们会加快处理的，我们会加快处理的，我们会加快处理的，我们会加快处理的，我们会加快处理的，我们会加快处理的，我们会加快处理的，"
        },
        {
          "subject":"",
          "content":"饭不怎么好吃呀",
          "createTime":"2019-01-02",
          "imageUrls":["https://mimishuo.oss-cn-beijing.aliyuncs.com/206bb6537b1343f2a514159f6d6c636b.jpg","https://mimishuo.oss-cn-beijing.aliyuncs.com/206bb6537b1343f2a514159f6d6c636b.jpg"],
          "headImageUrl":"https://mimishuo.oss-cn-beijing.aliyuncs.com/ee9075b0444fee6a61c6175bccc7853e.jpeg",
          "replyTime":"2019-01-02",
          "reply":"我们会加快处理的，我们会加快处理的，我们会加快处理的，我们会加快处理的，我们会加快处理的，我们会加快处理的，我们会加快处理的，我们会加快处理的，我们会加快处理的，我们会加快处理的，我们会加快处理的，"
        },
        {
          "subject":"",
          "content":"饭不怎么好吃呀",
          "createTime":"2019-01-02",
          "imageUrls":["https://mimishuo.oss-cn-beijing.aliyuncs.com/206bb6537b1343f2a514159f6d6c636b.jpg","https://mimishuo.oss-cn-beijing.aliyuncs.com/206bb6537b1343f2a514159f6d6c636b.jpg"],
          "headImageUrl":"https://mimishuo.oss-cn-beijing.aliyuncs.com/ee9075b0444fee6a61c6175bccc7853e.jpeg",
          "replyTime":"2019-01-02",
          "reply":"我们会加快处理的，我们会加快处理的，我们会加快处理的，我们会加快处理的，我们会加快处理的，我们会加快处理的，我们会加快处理的，我们会加快处理的，我们会加快处理的，我们会加快处理的，我们会加快处理的，"
        },
      ]
    }
  }
  async componentWillMount() {
    if(util.isWechat()){
      const wxCode = util.getQuery('code')
      const packageId = util.getQuery('packageId')
      console.log()
      if (!wxCode){
        const url = window.location.href
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd6f12e5d04ed854b&redirect_uri='+url+'&response_type=code&scope=SCOPE&state=STATE#wechat_redirect\n'
      }

      this.props.titleStore.setPageTitleText('看吐槽')
      const rsp = await get({url: NEWLETTER_DETAIL, data: {packageId: packageId,code:wxCode}})
      // const rsp = await post({url: CITY_LIST})
      console.log(rsp)
      return rsp
    } else {
      util.showToast('请在微信浏览器打开')
    }

  }
  topProgram () {

  }
  render() {
    const { list } = this.state
    // const { domestic, overseas } = this.props.cityStore
    return (
      <div className="complaints">
        <Head />
        <div className="content">
          <div className="top">
            <div className="top-title">上海本来生活有限公司</div>
            <div className="top-content">
              <div className="periods">2018年第11期</div>
              <div className="topProgram" onClick={this.topProgram.bind(this)}>进入小程序</div>
            </div>

          </div>
          {list.map((item, index) => {
            return (

              <div key={index} className="item">
                <div className="user">
                  <div className="user-top">
                    <img className="avator" src={item.headImageUrl}/>
                    <span className="user-text">{item.createTime}</span>
                  </div>
                </div>

                <div className="content">
                  {item.content}
                  <div className="content-icon"></div>
                </div>

                <div className="images">
                  {item.imageUrls && item.imageUrls.map((item, index) => {
                  return (
                  <div className="image" key={index}>
                  <img src={item} className="img"/>
                  </div>
                  )
                  })}
                </div>

                <div className="reply">
                  <div className="reply-hr"><strong>HR</strong>
                    <span className="">{item.replyTime}</span></div>
                  <div className="reply-content">{item.reply}<div className="content-icon-hr"></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default LookComplaints