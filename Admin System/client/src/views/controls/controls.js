import React, {useState, useEffect  } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CLabel,
  CTextarea,
} from '@coreui/react'

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"  
import Loader from 'react-loader-spinner'
import axios from 'axios'
import CIcon from '@coreui/icons-react'

const { ServerPORT } = require('../newports');
const uri = "http://localhost:"+ServerPORT;

const Controls = () => {
  const [isBusy, setBusy] = useState(true)
  // const [isBusy1, setBusy1] = useState(false)
  // const [isBusy2, setBusy2] = useState(false)
  // const [isBusy3, setBusy3] = useState(false)
  // const [isBusy4, setBusy4] = useState(false)
  const [phone_no,setPhone] = useState(1234567890)
  async function fetchData() {
    if(isBusy===true)
    {
      //specify any get request to load it before page      
    }
    setBusy(false)
  }

  const generate_one = async(e) =>
  {
      e.preventDefault()
      // setBusy1(true); 
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const res = await axios(uri+"/pdf/generate", {
          mode: 'cors',
          method: 'POST',
          headers: headers,
          data: {
            phone:phone_no,
          }
      }).then(function (response) {
        console.log(response);
        return "hello";
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log(res);
      console.log("gen" + phone_no);
      // setBusy1(false);  
  }

  const regenerate_one = async(e) =>
  {
      e.preventDefault()
      // setBusy2(true)
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const res = await axios(uri+"/pdf/regenerate", {
          mode: 'cors',
          method: 'POST',
          headers: headers,
          data: {
            phone:phone_no,
          }
      }).then(function (response) {
        console.log(response);
        return "hello";
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log(res);
      console.log("regen" + phone_no);
      // setBusy2(false);
  }

  const generate_all = async(e) =>  
  {
    e.preventDefault()
    // setBusy3(true);
    // setBusy3(false);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const res = await axios(uri+"/generate_all", {
          mode: 'cors',
          method: 'POST',
          headers: headers
      }).then(function (response) {
        console.log(response);
        return "hello";
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log(res);
      console.log("genall");
  }

  const regenerate_all = async(e) =>
  {
      e.preventDefault()
      // setBusy4(true);
      // setBusy4(false);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const res = await axios(uri+"/regenerate_all", {
          mode: 'cors',
          method: 'POST',
          headers: headers
      }).then(function (response) {
        console.log(response);
        return "hello";
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log(res);
      console.log("gen all");
  }

  useEffect(() => {
    fetchData();
  }); 

  

  const handleChange = (e) => {
    setPhone(e.target.value.trim())
  };

  
  return (
      <div>
        {isBusy ? (
                  <Loader
                    type="Circles"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    
                  />
                ) : (
                 <>   
              
                <CRow>
                  <CCol>
                    <CCard>
                      <CCardHeader>
                        Controls
                      </CCardHeader>
                      <CCardBody>
                        <CRow>
                          <CCol xs="12" md="6" xl="6">
                            <CCard>
                              <CCardHeader>
                                Generate Admit Cards
                              </CCardHeader>
                              <CCardBody>
                                <CButton variant="outline" color="info" onClick={generate_all} size="lg" block>Generate</CButton>
                              </CCardBody>
                            </CCard>

                            <CCard>
                              <CCardHeader>
                                Rgenerate Admit Cards
                              </CCardHeader>
                              <CCardBody>
                                <CButton variant="outline" color="info" onClick={regenerate_all} size="lg" block>Regenerate</CButton>
                              </CCardBody>
                            </CCard>
                            <CCard>
                              <CCardHeader>
                                Update Result
                              </CCardHeader>
                              <CCardBody>
                                <CForm action="" method="post">
                                    <CFormGroup row>
                                      <CCol md="3">
                                        <CLabel htmlFor="textarea-input">Roll Numbers</CLabel>
                                      </CCol>
                                      <CCol xs="12" md="9">
                                        <CTextarea 
                                          pattern="[0-9]*,"
                                          name="textarea-input" 
                                          id="textarea-input" 
                                          rows="9"
                                          placeholder="Mobile Numbers of Selected Candidates" 
                                        />
                                      </CCol>
                                    </CFormGroup>
                                    <CFormGroup className="form-actions">
                                      <CButton type="submit" size="sm" color="success">Submit</CButton>
                                    </CFormGroup>
                                  </CForm>
                              </CCardBody>
                            </CCard>
                          </CCol>
                          <CCol>
                              <CCard>
                              <CCardHeader>
                                Generate Admit-Card
                              </CCardHeader>
                              <small className="text-muted">Using Student Mobile Number</small> 
                              <CCardBody>
                                <CForm action="" method="post">
                                    <CFormGroup>
                                      <CInputGroup>
                                        <CInputGroupPrepend>
                                          <CInputGroupText><CIcon name="cil-phone" /></CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput type="number" id="MobNumber" onChange={handleChange} required name="MobNumber" placeholder="Mobile" autoComplete="current-number"/>
                                      </CInputGroup>
                                    </CFormGroup>
                                    <CFormGroup className="form-actions">
                                      <CButton type="submit" size="sm" onClick={generate_one} color="success">Submit</CButton>
                                    </CFormGroup>
                                  </CForm>
                              </CCardBody>
                            </CCard>
                            <CCard>
                              <CCardHeader>
                                Regenerate Admit-Card
                              </CCardHeader>
                              <small className="text-muted">Using Student Mobile Number</small> 
                              <CCardBody>
                                <CForm action="" method="post">
                                    <CFormGroup>
                                      <CInputGroup>
                                        <CInputGroupPrepend>
                                          <CInputGroupText><CIcon name="cil-phone" /></CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput type="number" id="MobNumber2" required onChange={handleChange} name="MobNumber" placeholder="Mobile" autoComplete="current-number"/>
                                      </CInputGroup>
                                    </CFormGroup>
                                    <CFormGroup className="form-actions">
                                      <CButton type="submit" size="sm" onClick={regenerate_one} color="success">Submit</CButton>
                                    </CFormGroup>
                                  </CForm>
                              </CCardBody>
                            </CCard>
                          <br />
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
               </>
                )          
        }
      </div>
  )
}

export default Controls
