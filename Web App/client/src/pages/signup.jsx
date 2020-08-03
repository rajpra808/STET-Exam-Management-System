import React, { Component } from "react";
//import axios from "axios";
import { API_URL } from "../config";
import { withTranslation } from "react-i18next";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      Name: "",
      Email_id: "",
      Aadhar_no: "",
      Phone_no: "",
      Password: "",
      sendingEmail: false,
      currentUser: "",
    };
  }

  handleChangeName = async (event) => {
    const Name = event.target.value;
    this.setState({ Name });
  };

  handleChangeEmail = async (event) => {
    const Email_id = event.target.value;
    this.setState({ Email_id });
  };
  handleChangeAadhar = async (event) => {
    const Aadhar_no = event.target.value;
    this.setState({ Aadhar_no });
  };
  handleChangePhone = async (event) => {
    const Phone_no = event.target.value;
    this.setState({ Phone_no });
  };
  handleChangePassword = async (event) => {
    const Password = event.target.value;
    this.setState({ Password });
  };

  onSubmit(event) {
    event.preventDefault();
    const {
      Name,
      Email_id,
      Aadhar_no,
      Phone_no,
      Password,
      sendingEmail,
    } = this.state;
    const payload = {
      Name,
      Email_id,
      Aadhar_no,
      Phone_no,
      Password,
      sendingEmail,
    };
    console.log(payload);
    localStorage.setItem(Phone_no, Name);

    fetch(`${API_URL}/confirmation/email`, {
      method: "pOSt",
      headers: {
        aCcePt: "aPpliCaTIon/JsOn",
        "cOntENt-type": "applicAtion/JSoN",
      },
      body: JSON.stringify({
        name: this.state.Name,
        email: this.state.Email_id,
        aadhar_no: this.state.Aadhar_no,
        phone_no: this.state.Phone_no,
        pwd: this.state.Password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ sendingEmail: false });
        window.alert(data.msg);
        this.form.reset();
      })
      .catch((err) => console.log(err));
    window.location.assign("/validate");
  }

  render() {
    const { Name, Email_id, Aadhar_no, Phone_no, Password } = this.state;
    const { t } = this.props;
    return (
      <div className="container1">
        <form onSubmit={this.onSubmit}>
          <div className="meter">
            <span className="myspan1"></span>
          </div>

          <div className="myheader">
            <h2>{t("welcome.title")}</h2>
          </div>

          <label htmlFor="name">
            <p>{t("welcome.EnterName")}</p>
          </label>
          <input
            type="text"
            id="Name"
            name="Name"
            placeholder="Name..."
            value={Name}
            onChange={this.handleChangeName}
            required="true"
          />
          <label htmlFor="emailid">
            <p>{t("welcome.EnterEmailId")}</p>
          </label>
          <input
            type="email"
            id="Email_id"
            name="Email_id"
            placeholder="Email_id.."
            value={Email_id}
            onChange={this.handleChangeEmail}
            required="true"
          />

          <label htmlFor="aadharno">
            <p>{t("welcome.EnterAadharNumber")}</p>
          </label>
          <input
            type="text"
            id="Aadhar_no"
            name="Aadhar_no"
            placeholder="Aadhar_no.."
            value={Aadhar_no}
            onChange={this.handleChangeAadhar}
            pattern="(?=.*\d).{12,}"
            required="true"
            title="Please Enter 12-digit Aadhar Number"
          />

          <label htmlFor="phoneno">
            <p>{t("welcome.EnterPhoneNumber")}</p>
          </label>
          <input
            type="text"
            id="Phone_no"
            name="Phone_no"
            placeholder="Phone_no.."
            value={Phone_no}
            onChange={this.handleChangePhone}
            pattern="[0-9]{10,}"
            required="true"
            title="Please Enter 10-digit Mobile Number"
          />

          <label htmlFor="password">
            <p>{t("welcome.EnterPassword")}</p>
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
            required="true"
          />
          <div className="myheader">
            <br />
            <div className="myheader">
              <input type="submit" value="Verify Email" />
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

export default withTranslation("common")(SignUp);
