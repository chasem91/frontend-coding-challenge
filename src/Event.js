import React, { Component } from 'react'
import moment from 'moment'
import '../styles/Event.css'

export default class Event extends Component {
  formatDate = date => {
    const wrapper = moment(date)
    return `${wrapper.format("ddd, MMM Do 'YY")} - ${wrapper.format("hh:mm A")}`
  }

  timeItem = (title, time) => (
    <div className="Event-time">
      <div className="Event-time-title">{title}</div>
      <div>{this.formatDate(time)}</div>
    </div>
  )

  times = event => (
    <div className="Event-times">
      {this.timeItem("Begins", event.start_time)}
      {this.timeItem("Ends", event.end_time)}
    </div>
  )

  locations = event => {
    let locs = event.locations.map((location, idx) => (
      <div key={idx}>{location.name}</div>
    ))
    locs = locs.length === 0 ? ["Not Specified"] : locs
    return (
      <div className="Event-location">
        <div className="Event-location-header">Location</div>
        {locs}
      </div>
    )
  }

  details = event => {
    let details
    if (event.url === "") {
      details = <div></div>
    } else {
      details = <a href={event.url} target="_blank">Details</a>
    }
    return (
      <div className="Event-details">
        {details}
      </div>
    )
  }

  render = () => {
    const event = this.props.event
    return (
      <div className="Event">
        <div className="Event-title">{event.title}</div>
        {this.times(event)}
        {this.locations(event)}
        {this.details(event)}
      </div>
    )
  }
}
