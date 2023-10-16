import { useState } from "react";
import { Divider } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { AuthWrap, FormInput } from "components/molecules";
import { GradientButton } from "components/atoms";
import { login } from "actions/auth";
import { connect } from "react-redux";

function SignIn({ login, isAuthenticated }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = () => {
    login(email, password)
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <AuthWrap
      title="Welcome Back"
      subtitle="Log in using your account"
    >
      <FormInput
        label="Your Email"
        onChange={setEmail}
        value={email}
      />
      <FormInput
        label="Your Password"
        type="password"
        onChange={setPassword}
        value={password}
      />
      <GradientButton
        style={{
          width: "100%",
          padding: "10px",
          mt: 5,
        }}
        onClick={onSubmit}
      >
        Sign In
      </GradientButton>
      <Divider sx={{my: 3, width: "100%"}}>Or</Divider>
      <Link
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: "rgb(112, 123, 139)",
          textAlign: "center"
        }}
        to="/signup"
      >
        Don’t have an account yet?
      </Link>
    </AuthWrap>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(SignIn);
