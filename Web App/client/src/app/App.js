import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Header, Footer } from "../components";

import {
  AcademicInsert,
  PersonalInsert,
  DocumentUpload,
  NameForm,
  PaymentForm,
  SignUp,
  LogIn,
  Confirm,
  Home,
  Validate,
  AdmitCard,
} from "../pages/pages";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/personal" exact component={PersonalInsert} />
        <Route path="/academic" exact component={AcademicInsert} />
        <Route path="/payment" exact component={PaymentForm} />
        <Route path="/docs" exact component={DocumentUpload} />
        <Route path="/otp" component={NameForm} />
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/confirm/:id" component={Confirm} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/validate" component={Validate} />
        <Route exact path="/admit" component={AdmitCard} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
