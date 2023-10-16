import { useState } from "react";
import { Divider } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { AuthWrap, FormInput } from "components/molecules";
import { GradientButton } from "components/atoms";
import { register } from "actions/auth";
import { connect } from "react-redux";

function SignUp({ register, isAuthenticated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onSubmit = async () => {
    console.log('aaa')
    if (password !== password2) {
      window.alert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <AuthWrap
      title="Welcome"
      subtitle="Create Your Account"
    >
      <FormInput
        label="Your Email"
        onChange={setEmail}
        value={email}
      />
      <FormInput
        label="Your Name"
        onChange={setName}
        value={name}
      />
      <FormInput
        label="Password"
        type="password"
        onChange={setPassword}
        value={password}
      />
      <FormInput
        label="Confirm Password"
        type="password"
        onChange={setPassword2}
        value={password2}
      />
      <GradientButton
        style={{
          width: '100%',
          padding: '10px',
          mt: 5,
        }}
        onClick={onSubmit}
      >
        Sign Up
      </GradientButton>
      <Divider sx={{my: 3, width: '100%'}}>Or</Divider>
      <Link
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: 'rgb(112, 123, 139)',
          textAlign: 'center'
        }}
        to="/signin"
      >
        Already have an account?
      </Link>
    </AuthWrap>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(SignUp);
