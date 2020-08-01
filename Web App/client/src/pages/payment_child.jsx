import { appendScript } from "../api/appendScript";
import { removeScript } from "../api/removeScript";
import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
//var api = require('../../api/index');

async function paymentHandler(options) {
  console.log("Clicked!");
  const dummy = await axios
    .get(`${API_URL}/details/pay`)
    .then((res) => {
      console.log(res.data);
      options.order_id = res.data.orderId;
      let rzp1 = new window.Razorpay(options);
      console.log(options);
      rzp1.open();
    })
    .catch(function (err) {
      console.log(err);
    });
  console.log(dummy);
  console.log("End");
}

class PaymentButton extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(event) {
    event.preventDefault();
    console.log("Props Data");
    console.log(this.props.data);
    var options = {
      key: "rzp_test_CIycCdg9OhYtbF", // Enter the Key ID generated from the Dashboard
      amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "STET",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        window.location.href = "/docs";
      },
      prefill: {
        name: this.props.data.name,
        email: this.props.data.email,
        contact: this.props.data.phno,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#F37254",
      },
    };
    console.log(options);
    paymentHandler(options);
  }
  componentDidMount() {
    appendScript("https://checkout.razorpay.com/v1/checkout.js");
  }
  componentWillUnmount() {
    removeScript("https://checkout.razorpay.com/v1/checkout.js");
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Pay" />
        </form>
      </div>
    );
  }
}

export default PaymentButton;
