import React, { Component } from 'react'
import moment from 'moment'
import '../styles/NewEvent.css'

export default class NewEvent extends Component {
  state = {
    title: "",
    start: "",
    end: "",
    location: "",
    url: "",
    errors: []
  }

  fields = () => {
    const fields = ["TITLE", "BEGINS", "ENDS", "LOCATION", "INFO LINK"]
    return fields.map((field, idx) => (
      <div key={idx} className="New-event-field">{field}</div>
    ))
  }

  onChange = e => {
    const stateObject = {}
    stateObject[e.target.name] = e.target.value
    this.setState(stateObject)
  }

  formInputs = () => (
    ["title", "start", "end", "location", "url"].map((input, idx) => {
      if (["start", "end"].includes(input)) {
        return (
          <input
            key={idx}
            name={input}
            type="datetime-local"
            value={this.state[input]}
            />
        )
      } else {
        return (
          <textarea
            key={idx}
            name={input}
            value={this.state[input]}
            />
        )
      }
    })
  )

  onSubmit = () => {
    const start = moment(this.state.start)
    const end = moment(this.state.end)
    const errors = []

    if (this.state.title === "") { errors.push("Title cannot be blank") }
    if (!start.isValid()) { errors.push("Start time is invalid") }
    if (!end.isValid()) { errors.push("End time is invalid") }
    if (start.isValid() && end.isValid() && start.isAfter(end)) {
      errors.push("End time must be after start time")
    }

    if (errors.length === 0) {
      this.setState({ title: "", start: "", end: "", location: "", url: "", errors: [] })
      this.props.createEvent(this.state)
    } else {
      this.setState({ errors })
    }
  }

  displayErrors = () => (
    this.state.errors.map((error, idx) => (
      <div key={idx} className="New-event-error">{error}</div>)
    )
  )

  render = () => (
    <div className="New-event">
      <div className="New-event-fields">
        {this.fields()}
      </div>
      <form onChange={this.onChange} className="New-event-form">
        {this.formInputs()}
      </form>
      <button onClick={this.onSubmit}>Create Event</button>
      {this.displayErrors()}
    </div>
  )
}
