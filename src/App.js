import React from "react";
// import Form from "./Form/Form";
import ResetPasswordForm from "./Form/reset.password.form";
import SignUpForm from "./Form/sign.up.form";
import ChangePassword from "./Form/change.password.form";
import SignInForm from "./Form/sign.in.form";
import ProfileUser from "./Form/profile";

import "./App.css";

function App() {
  return (
    <div className="App">
      {/* <Form /> */}
      <SignUpForm/>
    </div>
  );
}

export default App;
