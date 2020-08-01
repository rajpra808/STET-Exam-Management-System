import { appendScript } from "../api/appendScript";
import { removeScript } from "../api/removeScript";
import { Navbar } from "../components/index";
import PaymentButton from "./payment_child";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";

//import axios from "axios";
//var api = require("../../api/index");

class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", phno: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(this.state.name);
    alert(this.state.email);
    alert(this.state.phno);
  }
  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  }
  componentDidMount() {
    appendScript("https://checkout.razorpay.com/v1/checkout.js");
  }
  componentWillUnmount() {
    removeScript("https://checkout.razorpay.com/v1/checkout.js");
  }
  render() {
    const { t } = this.props;
    return (
      <div>
        <Navbar />
        <form onSubmit={this.handleSubmit}>
          <label>
            {t("welcome.EnterName")}
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            {t("welcome.EnterEmailId")}
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <label>
            {t("welcome.EnterPhoneNumber")}
            <input
              type="text"
              name="phno"
              value={this.state.phno}
              onChange={this.handleChange}
            />
          </label>
        </form>
        <PaymentButton data={this.state} />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default withTranslation("common")(PaymentForm);
