import { Stack, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Logo } from "components/atoms";
import MenuIcon from '@mui/icons-material/Menu';

const HeaderWrapMobile = styled(Stack)(({ theme }) => ({
  height: 56,
  alignItems: 'center',
  padding: '20px 30px',
  [theme.breakpoints.up('md')]: {
    display: 'none'
  },
  [theme.breakpoints.down('sm')]: {
    height: 40
  },
}));

const ToggleButton = styled(Button)({
  position: 'absolute',
  top: 24,
  right: 0,
  '& svg': {
    color: '#F0F0F0'
  }
});

export default function HeaderMobile({ open }) {
  return (
    <HeaderWrapMobile>
      <Logo />
      <ToggleButton onClick={open}>
        <MenuIcon />
      </ToggleButton>
    </HeaderWrapMobile>
  );
}
