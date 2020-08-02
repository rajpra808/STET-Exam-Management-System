import React from 'react'
import {Redirect} from 'react-router-dom'
// import Alert from 'react-bootstrap/Alert'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
var cred = require('./cred.js');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password: '',
      loggedIn:false,
    };
    this.handleUserName = this.handleUserName.bind(this);
    this.handleUserPassword = this.handleUserPassword.bind(this);
    this.OnSubmit = this.OnSubmit.bind(this);
  }

  handleUserName(e) {
    this.setState({
      username: e.target.value,
    });
  }
  handleUserPassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  renderRedirect = () => {
    if (this.state.loggedIn) {
      return <Redirect to='/dashboard' />
    }
  }

  OnSubmit(e)
  {
    console.log(this.state.username,process.env.REACT_APP_USER)
    console.log(this.state.password,process.env.REACT_APP_Password)
    if(this.state.username===cred.USER && this.state.password===cred.Password)
    {
      this.setState({
        loggedIn:true
      })
    }
    else{
      // [
      //   'danger',
      //   'warning',
      // ].map((variant, idx) => (
      //   <Alert key={idx} variant={variant}>
      //     This is a {variant} alert—check it out!
      //   </Alert>
      // ));
      alert("Wrong Username or password");
    }
  }

  render(){
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" value={this.username} onChange={this.handleUserName}  autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" value={this.username} onChange={this.handleUserPassword} autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                        {this.renderRedirect()}
                        <CCol xs="6">
                              <CButton color="primary" onClick={this.OnSubmit} className="px-4">Login</CButton>
                        </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
  }
}
export default Login
