import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Logo } from "components/atoms";
import { AuthButton, UserAvatar, HeaderLinks } from "components/molecules";
import { connect } from "react-redux";

const HeaderWrapLaptop = styled(Stack)(({ theme }) => ({
  maxWidth: 1400,
  width: '90%',
  height: 72,
  margin: '20px auto 0',
  alignItems: 'center',
  flexDirection: 'row',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  },
}));

const SideWrap = styled(Stack)({
  width: '25%',
  height: '52px',
  justifyContent: 'center'
});

const LinksWrap = styled(Stack)({
  width: '50%',
  height: '52px',
  alignItems: 'center',
  justifyContent: 'center'
});

function HeaderLaptop({ isAuthenticated }) {
  return (
    <HeaderWrapLaptop>
      <SideWrap alignItems="start">
        <Logo />
      </SideWrap>
      <LinksWrap>
        <HeaderLinks />
      </LinksWrap>
      <SideWrap alignItems="end">
        {isAuthenticated ? <UserAvatar /> : <AuthButton />}
      </SideWrap>
    </HeaderWrapLaptop>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(HeaderLaptop);
