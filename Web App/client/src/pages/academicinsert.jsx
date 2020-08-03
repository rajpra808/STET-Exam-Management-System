import React, { Component } from "react";
//import { Link } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../components/index";
import { API_URL } from "../config";
import { withTranslation } from "react-i18next";

class AcademicInsert extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      App_Category: "",
      Language: "",
      Min_Qual: "",
      Percentage: "",
      Pro_Qual: "",
      University: "",
      currentUser: "",
    };
  }
  componentDidMount = () => {
    fetch(`${API_URL}/details/currentUser`)
      .then((res) => res.json())
      .then((data) => {
        const Name = localStorage.getItem(data.phone_no);
        this.setState({
          currentUser: Name,
        });
      })
      .catch((err) => console.log(err));
  };

 /* componentDidMount = () => {
    fetch(`${API_URL}/details/currentUser`, {
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.phone_no != null){
          this.setState({
            currentUser: data.phone_no
          });
        }
        else
        {
          window.alert("Session Expired");
          window.location.assign("/");
        }
      })
      .catch((err) => console.log(err));
  }; */

  handleChangeAppCat = async (event) => {
    const App_Category = event.target.value;
    console.log(App_Category);
    this.setState({ App_Category });
  };
  handleChangeLang = async (event) => {
    const Language = event.target.value;
    console.log(Language);
    this.setState({ Language });
  };
  handleChangeQual = async (event) => {
    const Min_Qual = event.target.value;
    console.log(Min_Qual);
    this.setState({ Min_Qual });
  };
  handleChangePer = async (event) => {
    const Percentage = event.target.value;
    console.log(Percentage);
    this.setState({ Percentage });
  };
  handleChangeProQual = async (event) => {
    const Pro_Qual = event.target.value;
    console.log(Pro_Qual);
    this.setState({ Pro_Qual });
  };
  handleChangeUni = async (event) => {
    const University = event.target.value;
    console.log(University);
    this.setState({ University });
  };

  onSubmit(event) {
    event.preventDefault();
    const {
      App_Category,
      Language,
      Min_Qual,
      Percentage,
      Pro_Qual,
      University,
    } = this.state;
    const payload = {
      App_Category,
      Language,
      Min_Qual,
      Percentage,
      Pro_Qual,
      University,
    };
    console.log(payload);

    axios.post(`${API_URL}/details/academic`, payload).then((res) => {
      window.alert(`Academic Details Updated Successfully`);
      this.setState({
        App_Category: "",
        Language: "",
        Min_Qual: "",
        Percentage: "",
        Pro_Qual: "",
        University: "",
      });
      window.location.assign("/payment");
    });
  }

  render() {
    const {
      App_Category,
      Language,
      Min_Qual,
      Percentage,
      Pro_Qual,
      University,
      currentUser,
    } = this.state;
    const { t } = this.props;
    return (
      <div className="container1">
        <Navbar />
        <br />
        <p>Current User : {currentUser}</p>
        <form onSubmit={this.onSubmit}>
          <div className="meter">
            <span id="myspan2"></span>
          </div>

          <div className="myheader">
            <h2>{t("welcome.AcademicInfo")}</h2>
          </div>

          <label htmlFor="app_cat">
            <p>{t("welcome.ApplicationCategory")}</p>
          </label>
          <select
            name="App_Category"
            id="App_Category"
            className="form-control"
            onChange={this.handleChangeAppCat}
            value={App_Category}
          >
            <option value="none">{t("welcome.None")}</option>
            <option value="Primary Teacher">
              {t("welcome.PrimaryTeacher")}
            </option>
            <option value="GT Art">{t("welcome.GTART(1to8)")}</option>
            <option value="GT Science">{t("welcome.GTSCIENCE(1to8)")}</option>
          </select>

          <label htmlFor="language">
            <p>{t("welcome.LanguagePaperChoice")}</p>
          </label>
          <select
            name=""
            id="language"
            className="form-control"
            onChange={this.handleChangeLang}
            value={Language}
          >
            <option value="none">{t("welcome.None")}</option>
            <option value="Hindi">{t("welcome.Hindi")}</option>
            <option value="Nepali">{t("welcome.Nepali")}</option>
            <option value="English ">{t("welcome.English")}</option>
            <option value="Limboo">{t("welcome.Limboo")}</option>
            <option value="Bhutia">{t("welcome.Bhutiya")}</option>
            <option value="Lepcha">{t("welcome.Lepcha")}</option>
          </select>

          <label htmlFor="min_qual">
            <p>{t("welcome.MinimumQualification")}</p>
          </label>
          <select
            name="Min_Qual"
            id="Min_Qual"
            className="form-control"
            onChange={this.handleChangeQual}
            value={Min_Qual}
          >
            <option value="none">{t("welcome.None")}</option>
            <option value="XII">{t("welcome.XII")}</option>
            <option value="Graduation">{t("welcome.Graduation")}</option>
          </select>

          <label htmlFor="percentage">
            <p>{t("welcome.Percentage")}</p>
          </label>
          <input
            type="text"
            id="percentage"
            name="percentage"
            placeholder="Percentage.."
            value={Percentage}
            onChange={this.handleChangePer}
          />

          <label htmlFor="prof_qual">
            <p>{t("welcome.ProfessionalQualification")}</p>
          </label>
          <select
            name="Pro_Qual"
            id="Pro_Qual"
            className="form-control"
            onChange={this.handleChangeProQual}
            value={Pro_Qual}
          >
            <option value="none">{t("welcome.None")}</option>
            <option value="D.EI.Ed">{t("welcome.DElEd")}</option>
            <option value="B.Ed">{t("welcome.BEd")}</option>
            <option value="BA B.Ed">{t("welcome.BABed")}</option>
            <option value="BSc B.Ed">{t("welcome.BScBed")}</option>
          </select>

          <label htmlFor="univesity">
            <p>{t("welcome.Univesity")}</p>
          </label>
          <input
            type="text"
            id="univesity"
            name="univesity"
            placeholder="Univesity.."
            value={University}
            onChange={this.handleChangeUni}
          />

          <div className="myheader">
            {/* <input type="checkbox" name="check" id="check" value="1" required />
            I have downloaded Information Bulletin, read and understood all the
            instructions. <br /> */}
            <br />
            <div className="myheader">
              <input type="submit" value="Add Academic Details" />
              <br />
            </div>
            {/* <Link to="/Academic">Go to Academic</Link>
            <Link to="/Payment">Go for the payment</Link> */}
          </div>
        </form>
        <br />
        <br />
      </div>
    );
  }
}

export default withTranslation("common")(AcademicInsert);
