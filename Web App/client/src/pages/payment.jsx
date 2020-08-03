import { appendScript } from "../api/appendScript";
import { removeScript } from "../api/removeScript";
import { Navbar } from "../components/index";
import PaymentButton from "./payment_child";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { API_URL } from "../config";
//import axios from "axios";
//var api = require("../../api/index");

class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", phno: "", currentUser: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount = () => {
    fetch(`${API_URL}/details/currentUser`)
      .then((res) => res.json())
      .then((data) => {
        const Name = localStorage.getItem(data.phone_no);
        this.setState({
          currentUser: Name,
        });
      })
      .catch((err) => console.log(err));
  };
  /*
  componentDidMount = () => {
    fetch(`${API_URL}/details/currentUser`, {
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.phone_no != null){
          this.setState({
            currentUser: data.phone_no
          });
        }
        else
        {
          window.alert("Session Expired");
          window.location.assign("/");
        }
      })
      .catch((err) => console.log(err));
  };
*/
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
    const { currentUser } = this.state;
    return (
      <div className="container1">
        <Navbar />
        <br />
        <p>Current User : {currentUser}</p>
        <form onSubmit={this.handleSubmit}>
          <div className="meter">
            <span id="myspan"></span>
          </div>
          <div className="myheader">
            <h2>Payment</h2>
          </div>
          <br />
          <p>
            <label>
              {t("welcome.EnterName")}
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>
          </p>
          <p>
            <label>
              {t("welcome.EnterEmailId")}
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </label>
          </p>
          <p>
            <label>
              {t("welcome.EnterPhoneNumber")}
              <input
                type="text"
                name="phno"
                value={this.state.phno}
                onChange={this.handleChange}
              />
            </label>
          </p>
        </form>
        <div className="myheader">
          <PaymentButton data={this.state} />
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default withTranslation("common")(PaymentForm);
