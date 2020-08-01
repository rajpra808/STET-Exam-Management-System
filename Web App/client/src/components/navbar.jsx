import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

class Navbar extends Component {
  render() {
    const { t } = this.props;
    return (
      <nav>
        <div id="container">
          <div id="navbar">
            <div id="menu">
              <ul>
                <li>
                  <Link to="/academic">
                    <span>{t("welcome.AcademicDetails")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/personal">
                    <span>{t("welcome.PersonalDetails")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/docs">
                    <span>{t("welcome.UploadDocuments")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/payment">
                    <span>{t("welcome.Payment")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admit">
                    <span>{t("welcome.ViewAdmitCard")}</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withTranslation("common")(Navbar);
