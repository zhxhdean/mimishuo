import React, { Component } from 'react'
import './index.css'
import Head from '../../components/head'
import Foot from '../../components/foot'
export default class index extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Head />
          测试页面
        <Foot />
      </div>
    )
  }
}
