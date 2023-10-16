import React from "react";
import { Stack, Typography, Box, Button, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"
import { connect } from "react-redux";
import { logout } from "actions/auth";

const UserAvatarWrap = styled(Button)(({ theme }) => ({
  gap: 12,
  [theme.breakpoints.down('md')]: {
      flexDirection: 'row-reverse'
  }
}));

const ImageWrap = styled(Stack)({
  width: 56,
  height: 56,
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  '&:before': {
      content: '""',
      position: 'absolute',
      height: `100%`,
      width: `100%`,
      background: 'linear-gradient(132.56deg, #61CAFF 18.46%, #6651CE 54.34%, #FBB05B 83.84%)',
      zIndex: 0,
      borderRadius: '30px',
      opacity: 1,
  },
  '& img': {
      borderRadius: '30px',
      width: 52,
      height: 52,
      zIndex: 1
  }
});

const Text1 = styled(Typography)({
  color: '#F0F0F0',
  fontSize: 14,
});

const Text2 = styled(Typography)({
  color: '#F0F0F0',
  fontSize: 14,
  fontWeight: 600,
});

function UserAvatar({ user, logout }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate()

  return (
    <Box>
      <UserAvatarWrap onClick={handleClick}>
        <ImageWrap>
          <Box
            component="img"
            src={user?.avatar}
          />
        </ImageWrap>
        <Stack
          alignItems={{md: 'start', xs: 'end'}}
        >
          <Text1>
            Welcome Back
          </Text1>
          <Text2>
            {user?.name}
          </Text2>
        </Stack>
      </UserAvatarWrap>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{ width: 150 }}
      >
        <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { logout })(UserAvatar);
