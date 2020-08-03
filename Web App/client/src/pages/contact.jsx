import React, { Component } from "react";

import { withTranslation } from "react-i18next";

class Contact extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className="container1">
        <div className="parody">
          <div>
            <h2>Contact Us</h2>
          </div>
          <br />
          <p>Contact Number : 987654321</p>
          <p>Email-id : stet@gmail.com</p>
          <p>Website : stet.co.in</p>
        </div>
        <div>
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(Contact);
