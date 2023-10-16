import { Link, useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';

const StyledLink = styled(Link)(({ theme, selected }) => ({
  fontSize: 14,
  fontWeight: 700,
  color: 'white',
  textDecoration: 'none',
  lineHeight: 2,
  [theme.breakpoints.down('md')]: {
    color: '#010616',
  },
  '&:before': {
    transform: selected ? 'scaleX(1)' : 'scaleX(0)'
  }
}));

const TermsLink = ({ selected }) => {
  const location = useLocation();

  return (
    <StyledLink className="underline-animation" selected={location.pathname === '/terms'} to="/terms">
      Terms and Conditions
    </StyledLink>
  )
}

export default TermsLink;