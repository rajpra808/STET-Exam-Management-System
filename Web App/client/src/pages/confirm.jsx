import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
//functions
const token = 123456789;

function sendCode(phno) {
  fetch("https://aadhar-backend.herokuapp.com/otp/" + token, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ messengerId: "8192836451", phoneNumber: phno }),
  })
    .then(function (res) {
      console.log(res);
      window.location.assign("/otp");
    })
    .catch(function (err) {
      console.log(err);
    });
}

function phone(username) {
  fetch("https://aadhar-backend.herokuapp.com/users/" + username, {
    method: "get",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      console.log(data);
      sendCode(data.phno);
    })
    .catch(function (err) {
      console.log(err);
    });
}
function send(num) {
  const number = num;
  fetch("https://aadhar-backend.herokuapp.com/users/authenticate", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ username: number }),
  })
    .then(function (res) {
      if (res.status === 200) {
        console.log("Yes");
        phone(number);
      } else {
        alert("Aadhar number is invalid.");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

//functions end

class Confirm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      Name: "",
      Email_id: "",
      Aadhar_no: "",
      Phone_no: "",
      Password: "",
      confirming: true,
    };
  }

  componentDidMount = () => {
    // const { id } = this.props.match.params;
    // fetch(`${API_URL}/confirmation/email/confirm/${id}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     this.setState({
    //       confirming: false,
    //       Name: data.name,
    //       Email_id: data.email,
    //       Aadhar_no: data.aadhar_no,
    //       Phone_no: data.phone_no,
    //       Password: data.pwd,
    //     });
    //     numberInput = data.aadhar_no;
    //     window.alert(data.msg);
    //   })
    //   .catch((err) => console.log(err));
  };
  handleChangeName = async (event) => {
    const Name = event.target.value;
    console.log(Name);
    this.setState({ Name });
  };
  handleChangeEmail = async (event) => {
    const Email_id = event.target.value;
    console.log(Email_id);
    this.setState({ Email_id });
  };
  handleChangeAadhar = async (event) => {
    const Aadhar_no = event.target.value;
    console.log(Aadhar_no);
    this.setState({ Aadhar_no });
  };
  handleChangePhone = async (event) => {
    const Phone_no = event.target.value;
    console.log(Phone_no);
    this.setState({ Phone_no });
  };
  handleChangePassword = async (event) => {
    const Password = event.target.value;
    this.setState({ Password });
  };

  handleClick(event) {
    event.preventDefault();
    send(this.state.Aadhar_no);
  }

  onSubmit(event) {
    event.preventDefault();
    const { Name, Email_id, Aadhar_no, Phone_no, Password } = this.state;
    const payload = {
      Name,
      Email_id,
      Aadhar_no,
      Phone_no,
      Password,
    };
    console.log(payload);

    axios
      .post(`${API_URL}/details/signup`, payload)
      .then((res) => {
        console.log(res);
        window.alert(`Sign Up Successful`);
        this.setState({
          sendingEmail: true,
        });
        window.location.href = "/personal";
      })
      .catch((err) => {
        window.alert(`Error : ` + err.response);
      });
  }

  render() {
    const { Name, Email_id, Aadhar_no, Phone_no, Password } = this.state;
    return (
      <div className="container1">
        <form onSubmit={this.onSubmit}>
          <div className="meter">
            <span className="myspan1"></span>
          </div>

          <div className="myheader">
            <h2>Sign Up</h2>
          </div>

          <label htmlFor="name">
            <p>Enter Name</p>
          </label>
          <input
            type="text"
            id="Name"
            name="Name"
            placeholder="Name..."
            value={Name}
            onChange={this.handleChangeName}
          />

          <label htmlFor="emailid">
            <p>Enter Email Id</p>
          </label>
          <input
            type="email"
            id="Email_id"
            name="Email_id"
            placeholder="Email_id.."
            value={Email_id}
            onChange={this.handleChangeEmail}
          />

          <label htmlFor="aadharno">
            <p>Enter Aadhar Number</p>
          </label>
          <input
            type="number"
            id="Aadhar_no"
            name="Aadhar_no"
            placeholder="Aadhar_no.."
            value={Aadhar_no}
            onChange={this.handleChangeAadhar}
            maxLength="12"
          />

          <label htmlFor="phoneno">
            <p>Enter Phone Number</p>
          </label>
          <input
            type="number"
            id="Phone_no"
            name="Phone_no"
            placeholder="Phone_no.."
            value={Phone_no}
            onChange={this.handleChangePhone}
            maxLength="10"
          />

          <label htmlFor="password">
            <p>Enter Password</p>
          </label>
          <input
            type="password"
            id="Password"
            name="Password"
            placeholder="Password.."
            value={Password}
            onChange={this.handleChangePassword}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{5,}"
            title="Must contain at least one number, one lowercase, one uppercase letter, one special character and at least 5 or more characters"
          />
          <div className="myheader">
            <br />
            <div className="myheader">
              <input type="button" value="Verify Email" disabled={"disabled"} />
              <br />
              <br />
              <input
                type="button"
                value="Verify Aadhar Number"
                onClick={this.handleClick}
              />
              <br />
              <br />
              <input type="submit" value="Sign Up" />
              <br />
            </div>
          </div>
        </form>
        <br />
        <br />
      </div>
    );
  }
}

export default Confirm;
