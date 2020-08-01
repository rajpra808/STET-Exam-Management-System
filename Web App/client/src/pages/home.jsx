import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

class Home extends Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <div className="parody">
          <div>
            <h2>{t("welcome.stet")}</h2>
          </div>
          <br />
          <p>{t("welcome.para")}</p>
          <div>
            <Link to="/login">
              <input type="button" value="Login" />
            </Link>
            <Link to="/signup">
              <input type="button" value="SignUp" />
            </Link>
            <br />
          </div>
        </div>
        <div>
          <div className="content-box-gray">
            <h4>{t("welcome.QuickLinks")}</h4>
            <ul>
              <li>
                <Link to="/">
                  <span>{t("welcome.ApplictionForm")}</span>
                </Link>
              </li>
              <br />
              <li>
                <Link to="/">
                  <span>{t("welcome.Syllabus")}</span>
                </Link>
              </li>
              <br />
              <li>
                <Link to="/">
                  <span>{t("welcome.PreviousYearpaper")}</span>
                </Link>
              </li>
              <br />
              <li>
                <Link to="/">
                  <span>{t("welcome.AdmitCard")}</span>
                </Link>
              </li>
              <br />
              <li>
                <Link to="/">
                  <span>{t("welcome.AnswerKey")}</span>
                </Link>
              </li>
              <br />
              <li>
                <Link to="/">
                  <span>{t("welcome.Result")}</span>
                </Link>
              </li>
              <br />
              <li>
                <Link to="/">
                  <span>{t("welcome.FAQs")}</span>
                </Link>
              </li>
            </ul>
          </div>
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(Home);
