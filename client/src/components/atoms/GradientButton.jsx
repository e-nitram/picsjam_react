import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)({
  background: 'linear-gradient(79.75deg, #61CAFF -2.6%, #6651CE 58.93%, #FBB05B 98.9%)',
  borderRadius: '30px',
  color: 'white',
  textTransform: 'capitalize',
  textAlign: 'center',
  fontSize: 14,
  fontWeight: 700,
  padding: '5px 25px',
  width: 'fit-content',
  '&:hover': {
    animation: 'ani 8s linear infinite',
    border: 'none',
    '&:before': {
      filter: 'blur(10px)'
    }
  },
  '&:active': {
    background: 'linear-gradient(32deg, #61CAFF -2.6%, #6651CE 58.93%, #FBB05B 98.9%)'
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '-5px',
    left: '-5px',
    right: '-5px',
    bottom: '-5px',
    zIndex: -1,
    background: 'linear-gradient(79.75deg, #61CAFF -2.6%, #6651CE 58.93%, #FBB05B 98.9%)',
    backgroundSize: '100%',
    borderRadius: '35px',
    transition: '1s',
  }
});

const GradientButton = ({ select, children, onClick, style }) =>
  <StyledButton
    disabled={select}
    onClick={onClick}
    sx={style}
  >
    {children}
  </StyledButton>

export default GradientButton;