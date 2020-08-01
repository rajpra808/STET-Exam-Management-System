import React, { Component } from "react";
import { withTranslation } from "react-i18next";

class Footer extends Component {
  render() {
    const { t } = this.props;
    return (
      <footer>
        <div className="footer">
          <p>{t("welcome.design")}</p>
        </div>
      </footer>
    );
  }
}

export default withTranslation("common")(Footer);
