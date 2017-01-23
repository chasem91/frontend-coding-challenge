import React, { Component } from 'react'
import Event from './Event'
import NewEvent from './NewEvent'
import '../styles/Events.css'

export default class Events extends Component {
  state = {
    events: [],
    sortBy: "Start Time"
  }

  render = () => (
    <div className="Events">
      {this.sorts()}
      {this.sortedList()}
      <NewEvent createEvent={this.receiveEvent} />
    </div>
  )

  componentWillMount = () => {
    const obj = {
      method: "GET",
      headers: {
        "Content-Type": "Application/JSON",
        "Authorization": "Token 7761e7e3b25a1d6d315901fcd7180d971f77ea2e"
      },
    }
    fetch("https://api.eventable.com/v1/events/", obj)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response
        } else {
          const error = new Error(response.statusText)
          error.response = response
          throw error
        }
      })
      .then(response => response.json())
      .then(data => {
        this.setState({ events: data.results })
      })
      .catch(error => console.log('Request error: ', error))
  }

  receiveEvent = event => {
    const newEvent = {
      title:      event.title,
      start_time: event.start,
      end_time:   event.end,
      locations:  [{ name: event.location }],
      url:        event.url,
    }
    this.setState({ events: [...this.state.events, newEvent] })
  }

  changeSort = e => {
    this.setState({ sortBy: e.target.textContent })
  }

  eventsList = events => (
    events.map((event, idx) => {
      const filter = new RegExp(this.props.filter, 'i')
      return event.title.match(filter) ? <Event key={idx} event={event} /> : null
    })
  )

  comparisonCreator = attribute => (
    (a, b) => {
      if (a[attribute] < b[attribute]) {
        return -1;
      } else if (a[attribute] > b[attribute]) {
        return 1;
      } else {
        return 0;
      }
    }
  )

  sortedList = () => {
    let attribute
    switch (this.state.sortBy) {
      case "Start Time":
        attribute = "start_time"
        break
      case "Event Title":
        attribute = "title"
        break
      default:
        attribute = "id"
    }
    const compare = this.comparisonCreator(attribute)
    const sortedEvents = this.state.events.sort(compare)
    return (
      <div className="Events-items-container">
        {this.eventsList(sortedEvents)}
      </div>
    )
  }

  sorts = () => {
    const sortNames = ["Event Title", "Start Time"]
    const sortElements = []
    sortNames.forEach((name, idx) => {
      if (this.state.sortBy === name) {
        sortElements.push(
          <div key={idx}
            className="Events-sort-selected">
            {name}
          </div>
        )
      } else {
        sortElements.push(
          <div key={idx}
            className="Events-sort"
            onClick={this.changeSort}>
            {name}
          </div>
        )
      }
    })
    return (
      <div className="Events-sorts">
        <div>SORT BY:</div>
        {sortElements}
      </div>
    )
  }
}
