import React, { Component } from "react";

const token = 123456789;

function send(number) {
  fetch("Aadhar API server URI/otp/" + token + "/" + number, {
    method: "get",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(function (res) {
      console.log(res);
      if (res.status === 200) {
        alert("OTP verification successful");
        window.location.href = "/confirm";
      } else alert("OTP verification unsuccessful");
    })
    .catch(function (err) {
      console.log(err);
    });
}

class NameForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    send(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          OTP:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default NameForm;
