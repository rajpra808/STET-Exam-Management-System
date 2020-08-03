import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { API_URL } from "../config";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Value: "Login",
      current: "",
    };
    this.handleButton = this.handleButton.bind(this);
  }

  componentDidMount = () => {
    fetch(`${API_URL}/details/currentUser`)
      .then((res) => {
        console.log(res);
        console.log(res.json());
        res.json();
      })
      .then((data) => {
        console.log(data);
        const Name = localStorage.getItem(data.phone_no);
        console.log(Name);
        if (Name && Name !== "undefined") {
          this.setState({
            Value: "Logout",
            current: data.phone_no,
          });
        } else {
          this.setState({
            Value: "Login",
          });
        }
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
  handleButton = (e) => {
    e.preventDefault();
    const { Value, current } = this.state;
    if (Value === "Logout") {
      localStorage.removeItem(current);
      window.location.assign("/");
    } else {
      window.location.assign("/login");
    }
  };

  render() {
    const { t, i18n } = this.props;
    const { Value } = this.state;
    return (
      <header>
        <div className="container3">
          <input
            type="button"
            onClick={() => i18n.changeLanguage("hi")}
            value="Hindi"
          />
          <input
            type="button"
            onClick={() => i18n.changeLanguage("en")}
            value="English"
          />
          <input
            type="button"
            onClick={() => i18n.changeLanguage("ne")}
            value="Nepali"
          />
          <div className="myheader">
            <img src="sikkim.png" alt="" />
            <h1>{t("welcome.title")}</h1>
            <div className="mylist">
              <ul className=" visible-lg">
                <li>
                  <Link to="/" className="scroll">
                    <input type="button" value={t("welcome.home")} />
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="scroll">
                    <input type="button" value={t("welcome.Registration")} />
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="scroll">
                    <input type="button" value={t("welcome.ContactUs")} />
                  </Link>
                </li>
                <Link to="/login" className="scroll">
                  <input
                    type="button"
                    value={Value}
                    onClick={this.handleButton}
                  />
                </Link>
              </ul>
            </div>
          </div>
        </div>
        <hr id="testhr" />
      </header>
    );
  }
}

export default withTranslation("common")(Header);
