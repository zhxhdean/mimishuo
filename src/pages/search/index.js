import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import SetCompany from "../SetCompany/SetCompany";


@inject('searchStore')
@observer
class index extends Component {
  render() {
    return (
        <div>
          mobx场景测试：
          <input value={this.props.searchStore.searchText} onChange={this.props.searchStore.setSearchText}/>
          <button onClick={this.props.searchStore.handleShowSearchText}>点击按钮</button>
        </div>
    )
  }
}
export default index
