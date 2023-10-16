import { Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AuthButton, UserAvatar, SidebarLinks, SocialLinks } from "components/molecules";
import { connect } from "react-redux";

const SidebarHeader = styled(Stack)({
  height: '70px',
  backgroundColor: '#2C3759',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
});

const SidebarWrapper = styled(Box)({
  width: '15%',
  minWidth: '250px',
  minHeight: '100vh',
  backgroundColor: '#F0F0F0',
  position: 'relative',
  display: 'block'
});

const SidebarFooter = styled(Box)({
  height: '50px',
  borderTop: '1px solid #010616',
  position: 'absolute',
  width: '100%',
  bottom: 0
});

const FooterLogo = styled('img')({
  height: '30px'
});

function Sidebar({ isAuthenticated }) {
  return (
    <SidebarWrapper>
      <SidebarHeader>
        {isAuthenticated ? <UserAvatar /> : <AuthButton />}
      </SidebarHeader>
      <SidebarLinks />
      <SidebarFooter>
        <Stack
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
          px={2}
          sx={{height: '100%'}}
        >
          <FooterLogo src="/BlackLogo.svg" alt="logo" />
          <SocialLinks />
        </Stack>
      </SidebarFooter>
    </SidebarWrapper>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Sidebar);
