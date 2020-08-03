import React, { Component } from "react";

import { withTranslation } from "react-i18next";

class Faq extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className="container1">
        <form>
          <div class="faq1">
            <div className="myheader">
              <h2>
                <u>Frequently Asked Questions(FAQs)</u>
              </h2>
            </div>

            <p>{t("welcome.1a")}</p>
            <p1>{t("welcome.1aa")} </p1>
            <p>{t("welcome.1b")}</p>
            <p1>{t("welcome.1ba")}. </p1>
            <p>{t("welcome.1c")}</p>
            <p1>{t("welcome.1ca")}. </p1>
            <p>{t("welcome.2a")}</p>
            <p1>{t("welcome.2aa")}. </p1>
            <p>{t("welcome.2b")}</p>
            <p1>{t("welcome.2ba")}. </p1>
            <p>{t("welcome.2c")}</p>
            <p1>{t("welcome.2ca")}. </p1>
            <p>{t("welcome.3a")}</p>
            <p1>{t("welcome.3aa")}. </p1>
            <p>{t("welcome.3b")}</p>
            <p1>{t("welcome.3ba")}. </p1>
            <p>{t("welcome.3c")}</p>
            <p1>{t("welcome.3ca")}. </p1>
            <p>{t("welcome.4a")}</p>
            <p1>{t("welcome.4aa")}. </p1>
            <p>{t("welcome.4b")}</p>
            <p1>{t("welcome.4ba")}. </p1>
            <p>{t("welcome.4c")}</p>
            <p1>{t("welcome.4ca")}. </p1>
            <p>{t("welcome.5a")}</p>
            <p1>{t("welcome.5aa")}. </p1>
          </div>
          <br />
          <br />
          <div className="myheader">
            <input
              type="button"
              value="Back To Home"
              onClick={() => (window.location.href = "/")}
            />
          </div>
          <br />
          <br />
        </form>
      </div>
    );
  }
}

export default withTranslation("common")(Faq);
