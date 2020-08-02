import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

class Header extends Component {
  render() {
    const { t, i18n } = this.props;

    return (
      <header>
        <button onClick={() => i18n.changeLanguage("hi")}>hi</button>
        <button onClick={() => i18n.changeLanguage("en")}>en</button>
        <button onClick={() => i18n.changeLanguage("ne")}>ne</button>
        <div className="myheader">
          <img src="sikkim.png" alt="" />
          <h1>{t("welcome.title")}</h1>
          <div className="mylist">
            <ul className="standard-nav visible-lg">
              <li>
                <Link to="/" id="portfolio-linker" className="scroll">
                  {t("welcome.home")}
                </Link>
              </li>
              <li>
                <Link to="/signup" id="portfolio-linker" className="scroll">
                  {t("welcome.Registration")}
                </Link>
              </li>
              <li>
                <Link to="/" id="mycontact" className="scroll">
                  {t("welcome.ContactUs")}
                </Link>
              </li>
              <Link to="/login" className="scroll">
                {t("welcome.Login")}
              </Link>
            </ul>
          </div>
          <hr />
        </div>
      </header>
    );
  }
}

export default withTranslation("common")(Header);
