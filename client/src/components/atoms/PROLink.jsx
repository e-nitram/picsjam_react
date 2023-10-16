import { Link, useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';

const StyledSpan = styled('span')(({ theme }) => ({
  WebkitTextFillColor: 'white',
  [theme.breakpoints.down('md')]: {
    WebkitTextFillColor: '#010616',
  }
}));

const StyledLink = styled(Link)(({ theme, selected }) => ({
  fontSize: 14,
  fontWeight: 700,
  textDecoration: 'none',
  '&:before': {
    transform: selected ? 'scaleX(1)' : 'scaleX(0)'
  },
  lineHeight: 2,
  background: 'linear-gradient(94.08deg, #61CAFF 46.67%, #6651CE 71.01%, #FBB05B 92.84%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const PROLink = ({ selected }) => {
  const location = useLocation();

  return (
    <StyledLink className="underline-animation" selected={location.pathname === '/plan'} to="/plan">
      <StyledSpan>PicsJam</StyledSpan> PRO+
    </StyledLink>
  )
}

export default PROLink;
