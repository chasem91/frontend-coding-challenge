import React, { Component } from 'react'
import '../styles/Search.css'

export default class Search extends Component {
  render = () => (
    <div className="Search">
      <input
        placeholder="Search events"
        className="Search-input"
        onChange={this.props.onChange}
        />
    </div>
  )
}
