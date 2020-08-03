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
                  <Link to="/personal">
                    <input type="button" value={t("welcome.PersonalDetails")} />
                  </Link>
                </li>
                <li>
                  <Link to="/academic">
                    <input type="button" value={t("welcome.AcademicDetails")} />
                  </Link>
                </li>
                <li>
                  <Link to="/docs">
                    <input type="button" value={t("welcome.UploadDocuments")} />
                  </Link>
                </li>
                <li>
                  <Link to="/payment">
                    <input type="button" value={t("welcome.Payment")} />
                  </Link>
                </li>
                <li>
                  <Link to="/admit">
                    <input type="button" value={t("welcome.ViewAdmitCard")} />
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
