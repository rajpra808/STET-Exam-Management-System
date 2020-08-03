import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { withTranslation } from "react-i18next";

class Login extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      Phone_no: "",
      Password: "",
    };
  }

  handleChangePhone = async (event) => {
    const Phone_no = event.target.value;
    console.log(Phone_no);
    this.setState({ Phone_no });
  };
  handleChangePassword = async (event) => {
    const Password = event.target.value;
    this.setState({ Password });
  };

  onSubmit(event) {
    event.preventDefault();
    const { Phone_no, Password } = this.state;
    const payload = {
      Phone_no,
      Password,
    };
    console.log(payload);
    axios
      .post(`${API_URL}/details/login`, payload)
      .then((res) => {
        console.log(res);
        window.alert(`Log In Successful`);
        this.setState({
          Phone_no: "",
          Password: "",
        });
        window.location.assign("/personal");
      })
      .catch((err) => {
        window.alert(`Error : ` + err);
      });
  }

  render() {
    const { Phone_no, Password } = this.state;
    const { t } = this.props;
    return (
      <div className="container1">
        <form onSubmit={this.onSubmit}>
          <div className="meter">
            <span className="myspan1"></span>
          </div>

          <div className="myheader">
            <h2>{t("welcome.LogIn")}</h2>
          </div>

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
          />
          <div className="myheader">
            <br />
            <div className="myheader">
              <input type="submit" value="Log In" />
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

export default withTranslation("common")(Login);
