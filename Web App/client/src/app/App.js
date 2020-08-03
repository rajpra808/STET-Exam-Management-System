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
  Faq,
  Contact,
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
        <Route exact path="/confirm" component={Confirm} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/validate" component={Validate} />
        <Route exact path="/admit" component={AdmitCard} />
        <Route exact path="/Faq" component={Faq} />
        <Route exact path="/contact" component={Contact} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
