import React, { Component } from "react";
import axios from "axios";
import { Navbar } from "../components/index";
import { API_URL } from "../config";
import { withTranslation } from "react-i18next";
//import NameForm from "./otp";
//import { BrowserRouter, Route, Link } from "react-router-dom";

// OTP Verification Functions Start
let numberInput, check;
const token = 123456789;
//let phno = 0;

class PersonalInsert extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      Fname: "",
      Mname: "",
      Lname: "",
      Gender: "",
      FH: "",
      FHFname: "",
      FHMname: "",
      FHLname: "",
      MFname: "",
      MMname: "",
      MLname: "",
      DOB: "",
      Category: "",
      Aadhar: "",
      AddressOne: "",
      DistrictOne: "",
      StateOne: "",
      PinCodeOne: "",
      AddressTwo: "",
      DistrictTwo: "",
      StateTwo: "",
      PinCodeTwo: "",
      Phone1: "",
      Email1: "",
      Phone2: "",
      Email2: "",
    };
  }

  handleChangeFname = async (event) => {
    const Fname = event.target.value;
    this.setState({ Fname });
  };
  handleChangeMname = async (event) => {
    const Mname = event.target.value;
    this.setState({ Mname });
  };
  handleChangeLname = async (event) => {
    const Lname = event.target.value;
    this.setState({ Lname });
  };
  handleChangeGender = async (event) => {
    const Gender = event.target.value;
    this.setState({ Gender });
  };
  handleChangeFH = async (event) => {
    const FH = event.target.value;
    this.setState({ FH });
  };
  handleChangeFHFname = async (event) => {
    const FHFname = event.target.value;
    this.setState({ FHFname });
  };
  handleChangeFHMname = async (event) => {
    const FHMname = event.target.value;
    this.setState({ FHMname });
  };
  handleChangeFHLname = async (event) => {
    const FHLname = event.target.value;
    this.setState({ FHLname });
  };
  handleChangeMFname = async (event) => {
    const MFname = event.target.value;
    this.setState({ MFname });
  };
  handleChangeMMname = async (event) => {
    const MMname = event.target.value;
    this.setState({ MMname });
  };
  handleChangeMLname = async (event) => {
    const MLname = event.target.value;
    this.setState({ MLname });
  };
  handleChangeDOB = async (event) => {
    const DOB = event.target.value;
    this.setState({ DOB });
  };
  handleChangeCategory = async (event) => {
    const Category = event.target.value;
    this.setState({ Category });
  };
  handleChangeAadhar = async (event) => {
    const Aadhar = event.target.value;
    numberInput = Aadhar;
    this.setState({ Aadhar });
  };
  handleChangeAddress1 = async (event) => {
    const AddressOne = event.target.value;
    this.setState({ AddressOne });
  };
  handleChangeDistrict1 = async (event) => {
    const DistrictOne = event.target.value;
    this.setState({ DistrictOne });
  };
  handleChangeState1 = async (event) => {
    const StateOne = event.target.value;
    this.setState({ StateOne });
  };
  handleChangePincode1 = async (event) => {
    const PinCodeOne = event.target.value;
    this.setState({ PinCodeOne });
  };
  handleChangePhone1 = async (event) => {
    const Phone1 = event.target.value;
    this.setState({ Phone1 });
  };
  handleChangeEmail1 = async (event) => {
    const Email1 = event.target.value;
    this.setState({ Email1 });
  };
  handleChangeAddress2 = async (event) => {
    const AddressTwo = event.target.value;
    this.setState({ AddressTwo });
  };
  handleChangeDistrict2 = async (event) => {
    const DistrictTwo = event.target.value;
    this.setState({ DistrictTwo });
  };
  handleChangeState2 = async (event) => {
    const StateTwo = event.target.value;
    this.setState({ StateTwo });
  };
  handleChangePincode2 = async (event) => {
    const PinCodeTwo = event.target.value;
    this.setState({ PinCodeTwo });
  };
  handleChangePhone2 = async (event) => {
    const Phone2 = event.target.value;
    this.setState({ Phone2 });
  };
  handleChangeEmail2 = async (event) => {
    const Email2 = event.target.value;
    this.setState({ Email2 });
  };

  onSubmit(event) {
    event.preventDefault();
    const {
      Fname,
      Mname,
      Lname,
      Gender,
      FH,
      FHFname,
      FHMname,
      FHLname,
      MFname,
      MMname,
      MLname,
      DOB,
      Category,
      Aadhar,
      AddressOne,
      DistrictOne,
      StateOne,
      PinCodeOne,
      Phone1,
      Email1,
      AddressTwo,
      DistrictTwo,
      StateTwo,
      PinCodeTwo,
      Phone2,
      Email2,
    } = this.state;
    const payload = {
      Fname,
      Mname,
      Lname,
      Gender,
      FH,
      FHFname,
      FHMname,
      FHLname,
      MFname,
      MMname,
      MLname,
      DOB,
      Category,
      Aadhar,
      AddressOne,
      DistrictOne,
      StateOne,
      PinCodeOne,
      Phone1,
      Email1,
      AddressTwo,
      DistrictTwo,
      StateTwo,
      PinCodeTwo,
      Phone2,
      Email2,
    };
    //console.log(payload);

    if (check.checked) {
      axios
        .post(`${API_URL}/details/personal`, payload)
        .then((res) => {
          window.alert(`Personal Details Updated Successfully`);
          this.setState({
            Fname: "",
            Mname: "",
            Lname: "",
            Gender: "",
            FH: "",
            FHFname: "",
            FHMname: "",
            FHLname: "",
            MFname: "",
            MMname: "",
            MLname: "",
            DOB: "",
            Category: "",
            Aadhar: "",
            AddressOne: "",
            DistrictOne: "",
            StateOne: "",
            PinCodeOne: "",
            Phone1: "",
            Email1: "",
            AddressTwo: "",
            DistrictTwo: "",
            StateTwo: "",
            PinCodeTwo: "",
            Phone2: "",
            Email2: "",
          });
          window.location.assign("/academic");
        })
        .catch((err) => {
          window.alert(err.response.error);
        });
    } else {
      window.alert("Please check the checkbox!");
    }
  }

  render() {
    const { t } = this.props;
    const {
      Fname,
      Mname,
      Lname,
      Gender,
      FH,
      FHFname,
      FHMname,
      FHLname,
      MFname,
      MMname,
      MLname,
      DOB,
      Category,
      Aadhar,
      AddressOne,
      DistrictOne,
      StateOne,
      PinCodeOne,
      Phone1,
      Email1,
      AddressTwo,
      DistrictTwo,
      StateTwo,
      PinCodeTwo,
      Phone2,
      Email2,
    } = this.state;
    return (
      <div className="container1">
        <Navbar />
        <br />
        <form onSubmit={this.onSubmit}>
          <div className="meter">
            <span id="myspan2"></span>
          </div>

          <div className="myheader">
            <h2>{t("welcome.PersonalInfo")}</h2>
          </div>

          <p>{t("welcome.CandidateName")}</p>
          <label htmlFor="fname">{t("welcome.FirstName")}</label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Your name.."
            value={Fname}
            onChange={this.handleChangeFname}
          />

          <label htmlFor="mname">{t("welcome.MiddleName")}</label>
          <input
            type="text"
            id="mname"
            name="middlename"
            placeholder="Your middle name.."
            value={Mname}
            onChange={this.handleChangeMname}
          />

          <label htmlFor="lname">{t("welcome.LastName")}</label>
          <input
            type="text"
            id="lname"
            name="lastname"
            placeholder="Your last name.."
            value={Lname}
            onChange={this.handleChangeLname}
          />

          <p>{t("welcome.Pleaseselectyourgender")}</p>
          <select
            name="gender"
            id="gender"
            className="form-control"
            onChange={this.handleChangeGender}
            value={Gender}
          >
            <option value="none">{t("welcome.None")}</option>
            <option value="Male">{t("welcome.Male")}</option>
            <option value="Female">{t("welcome.Female")}</option>
            <option value="Other">{t("welcome.Other")}</option>
          </select>
          <br />
          <br />

          <p>{t("welcome.CandidateFatherName")}</p>
          <p>{t("welcome.FatherHusband")}</p>
          <select
            name="father_husband"
            id="father_husband"
            className="form-control"
            onChange={this.handleChangeFH}
            value={FH}
          >
            <option value="none">{t("welcome.None")}</option>
            <option value="father">{t("welcome.Father")}</option>
            <option value="husband">{t("welcome.Husband")}</option>
            <option value="other">{t("welcome.Other")}</option>
          </select>
          <br />
          <br />
          <label htmlFor="fname">{t("welcome.FirstName")}</label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Your name.."
            value={FHFname}
            onChange={this.handleChangeFHFname}
          />

          <label htmlFor="mname">{t("welcome.MiddleName")}</label>
          <input
            type="text"
            id="mname"
            name="middlename"
            placeholder="Your middle name.."
            value={FHMname}
            onChange={this.handleChangeFHMname}
          />

          <label htmlFor="lname">{t("welcome.LastName")}</label>
          <input
            type="text"
            id="lname"
            name="lastname"
            placeholder="Your last name.."
            value={FHLname}
            onChange={this.handleChangeFHLname}
          />
          <p>{t("welcome.CandidateMotherName")}</p>

          <label htmlFor="fname">{t("welcome.FirstName")}</label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Your name.."
            value={MFname}
            onChange={this.handleChangeMFname}
          />

          <label htmlFor="mname">{t("welcome.MiddleName")}</label>
          <input
            type="text"
            id="mname"
            name="middlename"
            placeholder="Your middle name.."
            value={MMname}
            onChange={this.handleChangeMMname}
          />

          <label htmlFor="lname">{t("welcome.LastName")}</label>
          <input
            type="text"
            id="lname"
            name="lastname"
            placeholder="Your last name.."
            value={MLname}
            onChange={this.handleChangeMLname}
          />

          <label htmlFor="birthday">
            <p>{t("welcome.DateOfBirth")}</p>
          </label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={DOB}
            onChange={this.handleChangeDOB}
          />

          <label htmlFor="community">
            <p>{t("welcome.Community")}</p>
          </label>
          <select
            name="community"
            id="state"
            className="form-control"
            value={Category}
            onChange={this.handleChangeCategory}
          >
            <option value="none">{t("welcome.None")}</option>
            <option value="GEN">{t("welcome.General")}</option>
            <option value="OBC">{t("welcome.OBC")}</option>
            <option value="SC">{t("welcome.SC")}</option>
            <option value="ST">{t("welcome.ST")}</option>
          </select>

          <p>{t("welcome.AadharNo")}</p>
          <label htmlFor="aadhar"></label>
          <input
            type="number"
            id="aadhar"
            name="aadhar"
            placeholder="Aadhar No.."
            value={Aadhar}
            onChange={this.handleChangeAadhar}
          />

          <div className="myheader">
            <h2>{t("welcome.PostalAddress")}</h2>
          </div>

          <p>{t("welcome.Address1")}</p>
          <label htmlFor="address1">{t("welcome.Address1")}</label>
          <input
            type="text"
            id="address1"
            name="address1"
            placeholder="Address1.."
            value={AddressOne}
            onChange={this.handleChangeAddress1}
          />
          <label htmlFor="city">{t("welcome.District1")}</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="District.."
            value={DistrictOne}
            onChange={this.handleChangeDistrict1}
          />

          <label htmlFor="country">{t("welcome.State1")}</label>
          <select
            background-color="white"
            name="state"
            id="state"
            className="form-control"
            value={StateOne}
            onChange={this.handleChangeState1}
          >
            <option value="none">{t("welcome.None")}</option>
            <option value="Andhra Pradesh">{t("welcome.AndhraPradesh")}</option>
            <option value="Andaman and Nicobar Islands">
              {t("welcome.AndamanandNicobarIslands")}
            </option>
            <option value="Arunachal Pradesh">
              {t("welcome.ArunachalPradesh")}
            </option>
            <option value="Assam">{t("welcome.Assam")}</option>
            <option value="Bihar">{t("welcome.Bihar")}</option>
            <option value="Chandigarh">{t("welcome.Chandigarh")}</option>
            <option value="Chhattisgarh">{t("welcome.Chhattisgarh")}</option>
            <option value="Dadar and Nagar Haveli">
              {t("welcome.DadarandNagarHaveli")}
            </option>
            <option value="Daman and Diu">{t("welcome.DamanandDiu")}</option>
            <option value="Delhi">{t("welcome.Delhi")}</option>
            <option value="Lakshadweep">{t("welcome.Lakshadweep")}</option>
            <option value="Puducherry">{t("welcome.Puducherry")}</option>
            <option value="Goa">{t("welcome.Goa")}</option>
            <option value="Gujarat">{t("welcome.Gujarat")}</option>
            <option value="Haryana">{t("welcome.Haryana")}</option>
            <option value="Himachal Pradesh">
              {t("welcome.HimachalPradesh")}
            </option>
            <option value="Jammu and Kashmir">
              {t("welcome.JammuandKashmir")}
            </option>
            <option value="Jharkhand">{t("welcome.Jharkhand")}</option>
            <option value="Karnataka">{t("welcome.Karnataka")}</option>
            <option value="Kerala">{t("welcome.Kerala")}</option>
            <option value="Madhya Pradesh">{t("welcome.MadhyaPradesh")}</option>
            <option value="Maharashtra">{t("welcome.Maharashtra")}</option>
            <option value="Manipur">{t("welcome.Manipur")}</option>
            <option value="Meghalaya">{t("welcome.Meghalaya")}</option>
            <option value="Mizoram">{t("welcome.Mizoram")}</option>
            <option value="Nagaland">{t("welcome.Nagaland")}</option>
            <option value="Odisha">{t("welcome.Odisha")}</option>
            <option value="Punjab">{t("welcome.Punjab")}</option>
            <option value="Rajasthan">{t("welcome.Rajasthan")}</option>
            <option value="Sikkim">{t("welcome.Sikkim")}</option>
            <option value="Tamil Nadu">{t("welcome.TamilNadu")}</option>
            <option value="Telangana">{t("welcome.Telangana")}</option>
            <option value="Tripura">{t("welcome.Tripura")}</option>
            <option value="Uttar Pradesh">{t("welcome.UttarPradesh")}</option>
            <option value="Uttarakhand">{t("welcome.Uttarakhand")}</option>
            <option value="West Bengal">{t("welcome.WestBengal")}</option>
          </select>

          <label htmlFor="zip1">
            <p>{t("welcome.PinCode1")}</p>
          </label>
          <input
            type="number"
            id="zip1"
            name="Zip1"
            placeholder="Pin Code.."
            value={PinCodeOne}
            onChange={this.handleChangePincode1}
          />

          <label htmlFor="zip1">
            <p>{t("welcome.PhoneNumber1")}</p>+91-
          </label>
          <input
            type="number"
            id="zip1"
            name="phone1"
            placeholder="Phone Number.."
            value={Phone1}
            onChange={this.handleChangePhone1}
          />
          <br />

          <label htmlFor="email1">
            <p>{t("welcome.E-mail1")}</p>
          </label>
          <input
            type="text"
            id="email1"
            name="email1"
            placeholder="abc@gmail.com....."
            value={Email1}
            onChange={this.handleChangeEmail1}
          />
          <p>{t("welcome.Address2")}</p>
          <label htmlFor="address">{t("welcome.Address2")}</label>
          <input
            type="text"
            id="address2"
            name="address2"
            placeholder="Address.."
            value={AddressTwo}
            onChange={this.handleChangeAddress2}
          />
          <label htmlFor="city">{t("welcome.District2")}</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="District.."
            value={DistrictTwo}
            onChange={this.handleChangeDistrict2}
          />

          <label htmlFor="country">{t("welcome.State2")}</label>
          <select
            background-color="white"
            name="state2"
            id="state2"
            className="form-control"
            value={StateTwo}
            onChange={this.handleChangeState2}
          >
            <option value="none">{t("welcome.None")}</option>
            <option value="Andhra Pradesh">{t("welcome.AndhraPradesh")}</option>
            <option value="Andaman and Nicobar Islands">
              {t("welcome.AndamanandNicobarIslands")}
            </option>
            <option value="Arunachal Pradesh">
              {t("welcome.ArunachalPradesh")}
            </option>
            <option value="Assam">{t("welcome.Assam")}</option>
            <option value="Bihar">{t("welcome.Bihar")}</option>
            <option value="Chandigarh">{t("welcome.Chandigarh")}</option>
            <option value="Chhattisgarh">{t("welcome.Chhattisgarh")}</option>
            <option value="Dadar and Nagar Haveli">
              {t("welcome.DadarandNagarHaveli")}
            </option>
            <option value="Daman and Diu">{t("welcome.DamanandDiu")}</option>
            <option value="Delhi">{t("welcome.Delhi")}</option>
            <option value="Lakshadweep">{t("welcome.Lakshadweep")}</option>
            <option value="Puducherry">{t("welcome.Puducherry")}</option>
            <option value="Goa">{t("welcome.Goa")}</option>
            <option value="Gujarat">{t("welcome.Gujarat")}</option>
            <option value="Haryana">{t("welcome.Haryana")}</option>
            <option value="Himachal Pradesh">
              {t("welcome.HimachalPradesh")}
            </option>
            <option value="Jammu and Kashmir">
              {t("welcome.JammuandKashmir")}
            </option>
            <option value="Jharkhand">{t("welcome.Jharkhand")}</option>
            <option value="Karnataka">{t("welcome.Karnataka")}</option>
            <option value="Kerala">{t("welcome.Kerala")}</option>
            <option value="Madhya Pradesh">{t("welcome.MadhyaPradesh")}</option>
            <option value="Maharashtra">{t("welcome.Maharashtra")}</option>
            <option value="Manipur">{t("welcome.Manipur")}</option>
            <option value="Meghalaya">{t("welcome.Meghalaya")}</option>
            <option value="Mizoram">{t("welcome.Mizoram")}</option>
            <option value="Nagaland">{t("welcome.Nagaland")}</option>
            <option value="Odisha">{t("welcome.Odisha")}</option>
            <option value="Punjab">{t("welcome.Punjab")}</option>
            <option value="Rajasthan">{t("welcome.Rajasthan")}</option>
            <option value="Sikkim">{t("welcome.Sikkim")}</option>
            <option value="Tamil Nadu">{t("welcome.TamilNadu")}</option>
            <option value="Telangana">{t("welcome.Telangana")}</option>
            <option value="Tripura">{t("welcome.Tripura")}</option>
            <option value="Uttar Pradesh">{t("welcome.UttarPradesh")}</option>
            <option value="Uttarakhand">{t("welcome.Uttarakhand")}</option>
            <option value="West Bengal">{t("welcome.WestBengal")}</option>
          </select>

          <label htmlFor="zip2">
            <p>{t("welcome.PinCode2")}</p>
          </label>
          <input
            type="number"
            id="zip"
            name="Zip"
            placeholder="Pin Code.."
            value={PinCodeTwo}
            onChange={this.handleChangePincode2}
          />

          <label htmlFor="zip2">
            <p>{t("welcome.PhoneNumber2")}</p>+91-
          </label>
          <input
            type="number"
            id="zip2"
            name="phone2"
            placeholder="Phone Number.."
            value={Phone2}
            onChange={this.handleChangePhone2}
          />
          <br />

          <label htmlFor="email">
            <p>{t("welcome.E-mail2")}</p>
          </label>
          <input
            type="text"
            id="email2"
            name="email2"
            placeholder="abc@gmail.com....."
            value={Email2}
            onChange={this.handleChangeEmail2}
          />

          <div className="myheader">
            <input
              type="checkbox"
              name="check"
              id="check"
              value="1"
              required
              ref={(e) => {
                check = e;
              }}
            />
            {t("welcome.checkme")}
            <br />
          </div>
          <div className="myheader">
            <input type="submit" value="Add Personal Details" />
            {/* <Link to="/"> Go to previous page </Link>
            <Link to="/Academic"> Go to Academic part </Link> */}
          </div>
          <br />
        </form>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default withTranslation("common")(PersonalInsert);
