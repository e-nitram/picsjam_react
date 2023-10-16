import { useState } from 'react';
import {
  Divider,
  Button,
  Checkbox,
  FormControlLabel,
  Stack
} from '@mui/material';
import { Navigate } from "react-router-dom";
import { AuthWrap, FormInput } from "components/molecules";
import { GradientButton } from "components/atoms";
import { update, deleteUser } from "actions/auth";
import { connect } from "react-redux";

function Profile({ user, isAuthenticated, update, deleteUser }) {
  const [checkbox, setCheckbox] = useState(false);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onSubmit = async () => {
    if(checkbox) {
      if (password === '' || password !== password2) {
        window.alert('Passwords do not match', 'danger');
      } else {
        update({ id: user._id, name, email, currentPassword, password });
      }
    } else {
      update({ id: user._id, name, email });
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  const onDelete = async () => {
    if(window.confirm("Do you really wanna delete your account?")) {
      deleteUser(user._id);
    }
  };

  return (
    <AuthWrap
      title="Your Profile"
      subtitle="Edit your profile info"
    >
      <FormInput
        label="Your Email"
        value={email}
        onChange={setEmail}
      />
      <FormInput
        label="Your Name"
        value={name}
        onChange={setName}
      />
      <Stack
        sx={{
          width: '100%',
          mt: 3,
          '& span': {
            py: 0
          }
        }}
      >
        <FormControlLabel
          control={
            <Checkbox checked={checkbox} onChange={(e) => setCheckbox(e.target.checked)} name="gilad" />
          }
          label="Change Password?"
        />
      </Stack>
      {
        checkbox && <>
          <FormInput
            label="Old Password"
            type="password"
            value={currentPassword}
            onChange={setCurrentPassword}
          />

          <FormInput
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />

          <FormInput
            label="Confirm Password"
            type="password"
            value={password2}
            onChange={setPassword2}
          />
        </>
      }
      <GradientButton
        style={{
          width: '100%',
          padding: '10px',
          mt: 5,
        }}
        onClick={onSubmit}
      >
          Submit
      </GradientButton>
      <Divider sx={{my: 3, width: '100%'}}>Or</Divider>
      <Button
        sx={{
          fontSize: 14,
          fontWeight: 700,
          color: 'red',
          textAlign: 'center'
        }}
        onClick={onDelete}
      >
        Delete Your Account
      </Button>
    </AuthWrap>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { update, deleteUser })(Profile);
