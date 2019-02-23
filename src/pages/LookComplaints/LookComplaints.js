import React, { Component } from 'react'
import './LookComplaints.less'
import { observer, inject } from 'mobx-react'
import Head from '../../components/head'
import {get} from '../../util/request'
import {NEWLETTER_DETAIL} from '../../util/urls'
import util from '../../util/util'
@inject('titleStore')
@observer
class LookComplaints extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      wxcode: '0812N01u0nndKh1QiS0u0HfX0u02N01Y',
      packageId : 7,
      hasMore: true,  // 是否还有更多
      isLoading: false, // 是否在加载中
      page: 1 // 记录当前页
    }
  }
  async componentWillMount() {
    this.props.titleStore.setPageTitleText('看吐槽')
    if(util.isWechat()){
      // const wxCode = '001DJFWO1LdEF917OKUO1z2kWO1DJF1s'
      const wxCode = util.getQuery('code')
      const packageId = util.getQuery('packageId') || 7
      if (!wxCode){
        const url = encodeURIComponent(window.location.href)
        const uurl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd6f12e5d04ed854b&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
        window.location.replace(uurl)
      }else {
        this.state.wxcode = wxCode
        this.initLoadData(packageId,wxCode)
      }
    } else {
      util.showToast('请在微信浏览器打开')
    }

  }

  componentDidMount() {
    // this.scrollPage()
  }
  // 绑定页面滚动
  scrollPage () {
    let timeoutId
    const self = this
    const wrapper = this.refs.wrapper
    function callback() {
      console.log(456)
      const top = wrapper.getBoundingClientRect().top
      const windowHeight = window.screen.height
      if (top && top < windowHeight) {
        // 证明 wrapper 已经被滚动到暴露在页面可视范围之内了
        self.loadMore()
      }
    }
    window.addEventListener('scroll',function () {
      if (!this.state.hasMore) {
        return false
      }

      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(callback,50)
    }.bind(this),false)
  }

  async initLoadData (packageId, wxCode) {
    try {
      const rsp = await get({
        url: NEWLETTER_DETAIL,
        data: {
          packageId: packageId || this.state.packageId,
          code: wxCode || this.state.wxcode
        }
      })
      console.log(rsp)
      if (rsp.code === 0 && rsp.data) {
        let rstList
        if (rsp.data.secretReplyList) {
          rstList = rsp.data.secretReplyList.map(item => {
            return Object.assign(item, {
              createTime: util.formatDate(item.createTime, 'Y-M-D h:m'),
              replyTime: util.formatDate(item.replyTime, 'Y-M-D h:m')
            })
          })
        } else {
          rstList = []
        }
        rsp.data.secretReplyList = rstList
        this.setState({
          data: rsp.data,
        })
      } else {
        if (rsp.code === 10007) { // 没有绑定公司
          util.showToast(rsp.msg || '您还未绑定公司，请先绑定', 1500)
          setTimeout(() => {
            this.props.history.push('/SetCompany')
          },1500)
        } else {
          util.showToast(rsp.msg || '获取失败，请重试', 1500)
        }
        this.setState({
          hasMore: false,
          isLoading: false
        })
      }
    } catch (err) {
      util.showToast(err, 1500)
    }
  }
  async topProgram () {

  }
  // 加载数据
  async loadMore() {
    if(!this.state.hasMore || this.state.isLoading) {
      return
    }
    this.setState({
      isLoading: true
    })
    try {
      const rsp = await get({
        url: NEWLETTER_DETAIL,
        data: this.params()
      })
      console.log(rsp)
      if (rsp.data&&rsp.data.secretReplyList.length>0) {
        this.setState({
          list: [...this.state.list, ...rsp.data.secretReplyList],
          page: this.state.page + 1,
          isLoading: false
        })
      } else {
        this.setState({
          hasMore: false,
          isLoading: false
        })
      }
    } catch (err) {
      alert(err)
      this.setState({
        isLoading: false
      })
    }
  }
  /**
   * 封装接口需要的参数
   */
  params () {
    const { packageId = '1', code = ''} = this.state
    let result = {
      packageId,
      code
    }
    return result
  }
  render() {
    const { data, wxcode, hasMore} = this.state
    return (
      <div className="complaints">
        {/*<Head />*/}
        <div className="content">
          <div className="top">
            <div className="top-title">{data.companyName}</div>
            <div className="top-content">
              <div className="periods">{data.year}年第{data.phaseNum}期 </div>
              {/*<div className="topProgram" onClick={this.topProgram.bind(this)}>进入小程序</div>*/}
              {/*{wxcode}*/}
            </div>
          </div>
          {data.secretReplyList && data.secretReplyList.map((item, index) => {
            return (

              <div key={index} className="item">
                <div className="user">
                  <div className="user-img">
                    <img className="avator" src={item.headImageUrl}/>
                  </div>
                  <div className="user-top">
                    {item.createTime}
                  </div>
                </div>

                <div className="user-content">
                  {item.content}
                  {/*<div className="content-icon"></div>*/}
                </div>

                <div className="images">
                  {item.imageUrls && item.imageUrls.map((item, index) => {
                    return (
                      <div className={(index+1)%3==0?'image image-r':'image'} key={index}>
                        <img src={item} className="img"/>
                      </div>
                    )
                  })}
                </div>

                <div className="reply">
                  <div className="reply-hr"><span className="reply-name">HR回复</span>
                    <span className="reply-time">{item.replyTime}</span></div>
                  <div className="reply-content">{item.reply}
                  {/*<div className="content-icon-hr"></div>*/}
                  </div>
                </div>
              </div>
            )
          })}

          {/*<div className="load-more" ref="wrapper">*/}
          {/*{hasMore*/}
            {/*? '加载更多'*/}
            {/*: '没有更多了'}*/}
          {/*</div>*/}
        </div>
      </div>
    )
  }
}

export default LookComplaints