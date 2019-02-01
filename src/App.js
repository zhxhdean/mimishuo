import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { searchStore } from './pages/search/store'
import { titleStore } from './components/head/store'

import HomePage from './pages/home/index.js'
import Index from './pages/index/index.js'
import Search from './pages/search/index.js'
import SetCompany from './pages/SetCompany/SetCompany.js'
import LookComplaints from './pages/LookComplaints/LookComplaints.js'

import './App.css';
const store = {
  searchStore,
  titleStore
}
class App extends Component {
  render() {
    return (
      <Provider {...store}>
        <Router>
          <div>
            <Switch>
              <Route path="/Index" component={Index} />
              <Route path="/Search" component={Search} />
              <Route path="/SetCompany" component={SetCompany} />
              <Route path="/LookComplaints" component={LookComplaints} />
              <Route path="/" exact component={LookComplaints} />
              <Redirect to="/" />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
