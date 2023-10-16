import { Stack, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FooterLogo } from "components/atoms";
import { SocialLinks } from "components/molecules";
import { Link } from "react-router-dom";

const FooterWrap = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 72,
  borderTop: '1px solid #F0F0F0',
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  },
}));

const FooterContent = styled(Stack)({
  maxWidth: 1400,
  width: '90%',
  height: 72,
  margin: '0 auto',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '20px'
});

const SideWrap = styled(Stack)({
    width: '25%',
    height: '52px',
    justifyContent: 'center'
});

const MidWrap = styled(Stack)({
  width: '50%',
  alignItems: 'center',
  justifyContent: 'center'
});

const TermsLink = styled(Link)({
  color: '#F0F0F0',
  textDecoration: 'none'
});

export default function Footer() {
  return (
    <FooterWrap>
      <FooterContent>
        <SideWrap alignItems="start">
          <FooterLogo />
        </SideWrap>
        <MidWrap>
          <TermsLink to="/terms">Terms and Conditions</TermsLink>
        </MidWrap>
        <SideWrap alignItems="end">
          <SocialLinks />
        </SideWrap>
      </FooterContent>
    </FooterWrap>
  );
}
