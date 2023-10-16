import { Link, useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';

const StyledLink = styled(Link)(({ theme, selected }) => ({
  fontSize: 14,
  fontWeight: 700,
  color: 'white',
  textDecoration: 'none',
  lineHeight: 2,
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    color: '#010616',
  },
  '&:before': {
    transform: selected ? 'scaleX(1)' : 'scaleX(0)'
  }
}));

const GenerateLink = ({ selected }) => {
  const location = useLocation();

  return (
    <StyledLink className="underline-animation" selected={location.pathname === '/'} to="/">
      Generate
    </StyledLink>
  )
}

export default GenerateLink;