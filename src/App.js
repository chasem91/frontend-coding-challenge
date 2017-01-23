import React, { Component } from 'react';
import '../styles/App.css';
import Events from './Events'
import Search from './Search'

class App extends Component {
  state = {
    searchFilter: ""
  }

  onChange = e => {
    this.setState({ searchFilter: e.currentTarget.value.split("").join("(?:\\s)?") })
  }

  render = () => (
    <div className="App">
      <Search onChange={this.onChange} />
      <Events filter={this.state.searchFilter} />
    </div>
  )
}

export default App;
