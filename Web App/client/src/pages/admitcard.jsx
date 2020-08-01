import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { Navbar } from "../components/index";
import { withTranslation } from "react-i18next";

class AdmitCard extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      fname: "",
      mname: "",
      lname: "",
      ffname: "",
      fmname: "",
      flname: "",
      mfname: "",
      mmname: "",
      mlname: "",
      category: "",
      aadhar: "",
      dob: "",
      address: "",
      district: "",
      state: "",
      pincode: "",
      sex: "",
      phone: "",
      email: "",
      exam: "",
    };
  }

  componentDidMount = () => {
    fetch(`${API_URL}/details/registrationdetails`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          fname: data.fname,
          mname: data.mname,
          lname: data.lname,
          ffname: data.ffname,
          fmname: data.fmname,
          flname: data.flname,
          mfname: data.mfname,
          mmname: data.mmname,
          mlname: data.mlname,
          category: data.category,
          aadhar: data.aadhar,
          dob: data.dob,
          address: data.address,
          district: data.district,
          state: data.state,
          pincode: data.pincode,
          sex: data.sex,
          phone: data.phone,
          email: data.email,
          exam: data.exam,
        });
        window.alert(data.msg);
      })
      .catch((err) => console.log(err));
  };
  handleChangeFname = async (event) => {
    const fname = event.target.value;
    this.setState({ fname });
  };
  handleChangeMname = async (event) => {
    const mname = event.target.value;
    this.setState({ mname });
  };
  handleChangeLname = async (event) => {
    const lname = event.target.value;
    this.setState({ lname });
  };
  handleChangeGender = async (event) => {
    const sex = event.target.value;
    this.setState({ sex });
  };
  handleChangeFHFname = async (event) => {
    const ffname = event.target.value;
    this.setState({ ffname });
  };
  handleChangeFHMname = async (event) => {
    const fmname = event.target.value;
    this.setState({ fmname });
  };
  handleChangeFHLname = async (event) => {
    const flname = event.target.value;
    this.setState({ flname });
  };
  handleChangeMFname = async (event) => {
    const mfname = event.target.value;
    this.setState({ mfname });
  };
  handleChangeMMname = async (event) => {
    const mmname = event.target.value;
    this.setState({ mmname });
  };
  handleChangeMLname = async (event) => {
    const mlname = event.target.value;
    this.setState({ mlname });
  };
  handleChangeDOB = async (event) => {
    const dob = event.target.value;
    this.setState({ dob });
  };
  handleChangeCategory = async (event) => {
    const category = event.target.value;
    this.setState({ category });
  };
  handleChangeAadhar = async (event) => {
    const aadhar = event.target.value;
    this.setState({ aadhar });
  };
  handleChangeAddress1 = async (event) => {
    const address = event.target.value;
    this.setState({ address });
  };
  handleChangeDistrict1 = async (event) => {
    const district = event.target.value;
    this.setState({ district });
  };
  handleChangeState1 = async (event) => {
    const state = event.target.value;
    this.setState({ state });
  };
  handleChangePincode1 = async (event) => {
    const pincode = event.target.value;
    this.setState({ pincode });
  };
  handleChangePhone1 = async (event) => {
    const phone = event.target.value;
    this.setState({ phone });
  };
  handleChangeEmail1 = async (event) => {
    const email = event.target.value;
    this.setState({ email });
  };
  handleChangeAppCat = async (event) => {
    const exam = event.target.value;
    this.setState({ exam });
  };
  onSubmit(event) {
    event.preventDefault();
    const {
      fname,
      mname,
      lname,
      ffname,
      fmname,
      flname,
      mfname,
      mmname,
      mlname,
      category,
      aadhar,
      dob,
      address,
      district,
      state,
      pincode,
      sex,
      phone,
      email,
      exam,
    } = this.state;
    const payload = {
      fname,
      mname,
      lname,
      ffname,
      fmname,
      flname,
      mfname,
      mmname,
      mlname,
      category,
      aadhar,
      dob,
      address,
      district,
      state,
      pincode,
      sex,
      phone,
      email,
      exam,
    };
    console.log(payload);

    axios
      .post(`${API_URL}/details/registration`, payload)
      .then((res) => {
        console.log(res);
        window.alert(`You Have been Registered`);
      })
      .catch((err) => {
        window.alert(`Error : ` + err.response);
      });
  }

  render() {
    const {
      fname,
      mname,
      lname,
      ffname,
      fmname,
      flname,
      mfname,
      mmname,
      mlname,
      category,
      aadhar,
      dob,
      address,
      district,
      state,
      pincode,
      sex,
      phone,
      email,
      exam,
    } = this.state;
    const { t } = this.props;
    return (
      <div className="container1">
        <Navbar />
        <br />
        <form onSubmit={this.onSubmit}>
          <div className="meter">
            <span id="myspan2"></span>
          </div>

          <div className="myheader">
            <h2>Admit Card</h2>
          </div>

          <p>{t("welcome.CandidateName")}</p>
          <label htmlFor="fname">{t("welcome.FirstName")}</label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Your name.."
            value={fname}
            onChange={this.handleChangeFname}
          />

          <label htmlFor="mname">{t("welcome.MiddleName")}</label>
          <input
            type="text"
            id="mname"
            name="middlename"
            placeholder="Your middle name.."
            value={mname}
            onChange={this.handleChangeMname}
          />

          <label htmlFor="lname">{t("welcome.LastName")}</label>
          <input
            type="text"
            id="lname"
            name="lastname"
            placeholder="Your last name.."
            value={lname}
            onChange={this.handleChangeLname}
          />

          <p>{t("welcome.Pleaseselectyourgender")}</p>
          <select
            name="gender"
            id="gender"
            className="form-control"
            onChange={this.handleChangeGender}
            value={sex}
          >
            <option value="none">{t("welcome.None")}</option>
            <option value="Male">{t("welcome.Male")}</option>
            <option value="Female">{t("welcome.Female")}</option>
            <option value="Other">{t("welcome.Other")}</option>
          </select>
          <br />
          <br />

          <p>{t("welcome.CandidateFatherName")}</p>

          <br />
          <br />
          <label htmlFor="fname">{t("welcome.FirstName")}</label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Your name.."
            value={ffname}
            onChange={this.handleChangeFHFname}
          />

          <label htmlFor="mname">{t("welcome.MiddleName")}</label>
          <input
            type="text"
            id="mname"
            name="middlename"
            placeholder="Your middle name.."
            value={fmname}
            onChange={this.handleChangeFHMname}
          />

          <label htmlFor="lname">{t("welcome.LastName")}</label>
          <input
            type="text"
            id="lname"
            name="lastname"
            placeholder="Your last name.."
            value={flname}
            onChange={this.handleChangeFHLname}
          />
          <p>{t("welcome.CandidateMotherName")}</p>

          <label htmlFor="fname">{t("welcome.FirstName")}</label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Your name.."
            value={mfname}
            onChange={this.handleChangeMFname}
          />

          <label htmlFor="mname">{t("welcome.MiddleName")}</label>
          <input
            type="text"
            id="mname"
            name="middlename"
            placeholder="Your middle name.."
            value={mmname}
            onChange={this.handleChangeMMname}
          />

          <label htmlFor="lname">{t("welcome.LastName")}</label>
          <input
            type="text"
            id="lname"
            name="lastname"
            placeholder="Your last name.."
            value={mlname}
            onChange={this.handleChangeMLname}
          />

          <label htmlFor="birthday">
            <p>{t("welcome.DateOfBirth")}</p>
          </label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={dob}
            onChange={this.handleChangeDOB}
          />

          <label htmlFor="app_cat">
            <p>Application Catogary:</p>
          </label>
          <select
            name="App_Category"
            id="App_Category"
            className="form-control"
            onChange={this.handleChangeAppCat}
            value={exam}
          >
            <option value="none">None</option>
            <option value="Primary Teacher">Primary Teacher</option>
            <option value="GT Art">GT ART(1 to 8)</option>
            <option value="GT Science">GT SCIENCE(1 to 8)</option>
          </select>

          <label htmlFor="community">
            <p>{t("welcome.Community")}</p>
          </label>
          <select
            name="community"
            id="state"
            className="form-control"
            value={category}
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
            value={aadhar}
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
            value={address}
            onChange={this.handleChangeAddress1}
          />
          <label htmlFor="city">{t("welcome.District1")}</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="District.."
            value={district}
            onChange={this.handleChangeDistrict1}
          />

          <label htmlFor="country">{t("welcome.State1")}</label>
          <select
            background-color="white"
            name="state"
            id="state"
            className="form-control"
            value={state}
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
            value={pincode}
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
            value={phone}
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
            value={email}
            onChange={this.handleChangeEmail1}
          />
          <div className="myheader">
            <input type="submit" value="Register Candidate" />
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

export default withTranslation("common")(AdmitCard);
