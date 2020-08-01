import React, { Component } from "react";

class Validate extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      validatenumber:""
    };
  }

  handleChangeNumber = async (event) => {
    const validatenumber = event.target.value;
    this.setState({ validatenumber });
  };


  onSubmit(event) {
    event.preventDefault();
    const {
        validatenumber
    } = this.state;
    
    if (validatenumber === "3765") {
        window.alert("Email Confirmed");
        window.location.href="./confirm";
    } else {
        window.alert("Email not Confirmed, Please try again.");
        window.location.href = "./signup"
    }

  }

  render() {
    const { validatenumber } = this.state;
    return (
      <div className="container1">
        <form onSubmit={this.onSubmit}>
          <div className="meter">
            <span className="myspan1"></span>
          </div>

          <div className="myheader">
            <h2>Sign Up</h2>
          </div>

          <label htmlFor="aadharno">
            <p>Enter Number</p>
          </label>
          <input
            type="number"
            id="vnumber"
            name="vnumber"
            placeholder="Enter Number"
            value={validatenumber}
            onChange={this.handleChangeNumber}
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

export default Validate;
