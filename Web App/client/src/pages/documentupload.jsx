import React, { Component } from "react";
import axios from "axios";
import { Navbar } from "../components/index";
import { API_URL } from "../config";

class DocumentUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passport_photo: null,
      upload: null,
      community_certificate: null,
      scanned_signature: null,
      sikkim_sub_certificate: null,
      aadhar_card: null,
      eleven_marksheet: null,
      twelve_marksheet: null,
      graduation_marksheet: null,
      graduation_certificate: null,
    };

    this.onChangepp = this.onChangepp.bind(this);
    this.onChangebc = this.onChangebc.bind(this);
    this.onChangecc = this.onChangecc.bind(this);
    this.onChangess = this.onChangess.bind(this);
    this.onChangessc = this.onChangessc.bind(this);
    this.onChangeac = this.onChangeac.bind(this);
    this.onChangeem = this.onChangeem.bind(this);
    this.onChangetm = this.onChangetm.bind(this);
    this.onChangegm = this.onChangegm.bind(this);
    this.onChangegc = this.onChangegc.bind(this);
    this.onSubmitbc = this.onSubmitbc.bind(this);
    this.onSubmitac = this.onSubmitac.bind(this);
    this.onSubmitpp = this.onSubmitpp.bind(this);
    this.onSubmitcc = this.onSubmitcc.bind(this);
    this.onSubmitss = this.onSubmitss.bind(this);
    this.onSubmitsc = this.onSubmitsc.bind(this);
    this.onSubmitem = this.onSubmitem.bind(this);
    this.onSubmitgm = this.onSubmitgm.bind(this);
    this.onSubmittm = this.onSubmittm.bind(this);
    this.onSubmitgc = this.onSubmitgc.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    //const formData = new FormData();

    // formData.append("passport_photo", this.state.passport_photo);
    // formData.append("birth_certificate", this.state.birth_certificate);
    // formData.append("community_certificate", this.state.community_certificate);
    // formData.append("scanned_signature", this.state.scanned_signature);
    // formData.append(
    //   "sikkim_sub_certificate",
    //   this.state.sikkim_sub_certificate
    // );
    // formData.append("aadhar_card", this.state.aadhar_card);
    // formData.append("eleven_marksheet", this.state.eleven_marksheet);
    // formData.append("twelve_marksheet", this.state.twelve_marksheet);
    // formData.append("graduation_marksheet", this.state.graduation_marksheet);
    // formData.append(
    //   "graduation_certificate",
    //   this.state.graduation_certificate
    // );
    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // };
    // axios
    //   .post("http://localhost:5000/details/upload", formData, config)
    //   .then((response) => {
    //     alert("Files Successfully Uploaded!");
    //   })
    //   .catch((error) => {
    //     alert("Files not Uploaded!");
    //   });
  }
  onChangepp(e) {
    this.setState({ passport_photo: e.target.files[0] });
  }
  onChangebc(e) {
    this.setState({ upload: e.target.files[0] });
  }
  onChangecc(e) {
    this.setState({ community_certificate: e.target.files[0] });
  }
  onChangess(e) {
    this.setState({ scanned_signature: e.target.files[0] });
  }
  onChangessc(e) {
    this.setState({ sikkim_sub_certificate: e.target.files[0] });
  }
  onChangeac(e) {
    this.setState({ aadhar_card: e.target.files[0] });
  }
  onChangeem(e) {
    this.setState({ eleven_marksheet: e.target.files[0] });
  }
  onChangetm(e) {
    this.setState({ twelve_marksheet: e.target.files[0] });
  }
  onChangegm(e) {
    this.setState({ graduation_marksheet: e.target.files[0] });
  }
  onChangegc(e) {
    this.setState({ graduation_certificate: e.target.files[0] });
  }
  onSubmitbc(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("upload", this.state.upload);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    console.log(formData);
    axios
      .post(`${API_URL}/details/uploadBirth`, formData, config)
      .then((response) => {
        alert("File Uploaded Successfully!");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        alert("Files not Uploaded!");
      });
  }
  onSubmitac(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("upload", this.state.aadhar_card);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    console.log(formData);
    axios
      .post(`${API_URL}/details/uploadAadhar`, formData, config)
      .then((response) => {
        alert("File Uploaded Successfully!");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        alert("Files not Uploaded!");
      });
  }
  onSubmitpp(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("upload", this.state.passport_photo);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    console.log(formData);
    axios
      .post(`${API_URL}/details/uploadPhoto`, formData, config)
      .then((response) => {
        alert("File Uploaded Successfully!");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        alert("Files not Uploaded!");
      });
  }
  onSubmitcc(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("upload", this.state.community_certificate);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    console.log(formData);
    axios
      .post(`${API_URL}/details/uploadComm`, formData, config)
      .then((response) => {
        alert("File Uploaded Successfully!");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        alert("Files not Uploaded!");
      });
  }
  onSubmitss(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("upload", this.state.scanned_signature);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    console.log(formData);
    axios
      .post(`${API_URL}/details/uploadSign`, formData, config)
      .then((response) => {
        alert("File Uploaded Successfully!");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        alert("Files not Uploaded!");
      });
  }
  onSubmitsc(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("upload", this.state.sikkim_sub_certificate);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    console.log(formData);
    axios
      .post(`${API_URL}/details/uploadSubject`, formData, config)
      .then((response) => {
        alert("File Uploaded Successfully!");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        alert("Files not Uploaded!");
      });
  }
  onSubmitem(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("upload", this.state.eleven_marksheet);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    console.log(formData);
    axios
      .post(`${API_URL}/details/uploadTenth`, formData, config)
      .then((response) => {
        alert("File Uploaded Successfully!");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        alert("Files not Uploaded!");
      });
  }
  onSubmitgm(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("upload", this.state.graduation_marksheet);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    console.log(formData);
    axios
      .post(`${API_URL}/details/uploadGradMark`, formData, config)
      .then((response) => {
        alert("File Uploaded Successfully!");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        alert("Files not Uploaded!");
      });
  }
  onSubmittm(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("upload", this.state.twelve_marksheet);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    console.log(formData);
    axios
      .post(`${API_URL}/details/uploadTwelveth`, formData, config)
      .then((response) => {
        alert("File Uploaded Successfully!");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        alert("Files not Uploaded!");
      });
  }
  onSubmitgc(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("upload", this.state.graduation_certificate);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    console.log(formData);
    axios
      .post(`${API_URL}/details/uploadGradCir`, formData, config)
      .then((response) => {
        alert("File Uploaded Successfully!");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        alert("Files not Uploaded!");
      });
  }

  render() {
    return (
      <div>
        <Navbar />
        <br />
        <form>
          <div className="meter">
            <span id="myspan"></span>
          </div>
          <div className="myheader">
            <h2>Upload Your file</h2>
          </div>
          <br />
          <p>Upload your passport size photo.</p>
          <input type="file" name="passport_photo" onChange={this.onChangepp} />
          <input
            type="button"
            name="passport_button"
            value="Upload Passport Photo"
            onClick={this.onSubmitpp}
          />
          <hr id="myhr" />
          <p>Upload your Birth Certificate.</p>
          <input type="file" name="upload" onChange={this.onChangebc} />
          <input
            type="button"
            name="birth_certificate_button"
            value="Upload Birth Certificate"
            onClick={this.onSubmitbc}
          />

          <hr id="myhr" />
          <p>Upload your Community Certificate.</p>

          <input
            type="file"
            name="community_certificate"
            onChange={this.onChangecc}
          />
          <input
            type="button"
            name="passport_button"
            value="Upload Community Certificate."
            onClick={this.onSubmitcc}
          />

          <hr id="myhr" />
          <p>Upload your scanned signature.</p>

          <input
            type="file"
            name="scanned_signature"
            onChange={this.onChangess}
          />
          <input
            type="button"
            name="passport_button"
            value="Upload scanned signature."
            onClick={this.onSubmitss}
          />

          <hr id="myhr" />

          <p>Upload Sikkim subject Certificate.</p>

          <input
            type="file"
            name="sikkim_sub_certificate"
            onChange={this.onChangessc}
          />
          <input
            type="button"
            name="passport_button"
            value="Upload Sikkim subject Certificate."
            onClick={this.onSubmitsc}
          />

          <hr id="myhr" />
          <p>Upload your scanned Aadhar Card.</p>

          <input type="file" name="aadhar_card" onChange={this.onChangeac} />
          <input
            type="button"
            name="passport_button"
            value="Upload scanned Aadhar Card"
            onClick={this.onSubmitac}
          />
          <hr id="myhr" />
          <p>Upload your scanned 11th Marksheet/Certificate.</p>

          <input
            type="file"
            name="eleven_marksheet"
            onChange={this.onChangeem}
          />
          <input
            type="button"
            name="passport_button"
            value="Upload scanned 11th Marksheet/Certificate."
            onClick={this.onSubmitem}
          />
          <hr id="myhr" />
          <p>Upload your scanned 12th Marksheet/Certificate.</p>

          <input
            type="file"
            name="twelve_marksheet"
            onChange={this.onChangetm}
          />
          <input
            type="button"
            name="passport_button"
            value="Upload scanned 12th Marksheet/Certificate"
            onClick={this.onSubmittm}
          />
          <hr id="myhr" />
          <p>Upload your scanned Graduation Marksheet.</p>

          <input
            type="file"
            name="graduation_marksheet"
            onChange={this.onChangegm}
          />
          <input
            type="button"
            name="passport_button"
            value="Upload scanned Graduation Marksheet"
            onClick={this.onSubmitgm}
          />
          <hr id="myhr" />
          <p>Upload your scanned Graduation Certificate.</p>

          <input
            type="file"
            name="graduation_certificate"
            onChange={this.onChangegc}
          />
          <input
            type="button"
            name="passport_button"
            value="Upload scanned Graduation Certificate"
            onClick={this.onSubmitgc}
          />
          <hr id="myhr" />
        </form>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default DocumentUpload;
