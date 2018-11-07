import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import App from './App';
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'mobx-react'
import { Route, HashRouter as Router } from 'react-router-dom'
import Index from './pages/index'
import Search from './pages/search/'
import { searchStore } from './pages/search/store'
ReactDOM.render(
  <Router>
    <div>
      <Route path="/" component={Index} exact />
      <Provider searchStore={searchStore}>
        <Route path="/search" component={Search} />
      </Provider>
      {/* <Redirect from="*" to="/"/> */}
    </div>
  </Router>,
  document.getElementById('root')
)
registerServiceWorker()
