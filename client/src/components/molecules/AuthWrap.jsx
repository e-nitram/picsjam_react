import {
  Stack,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Logo } from "components/atoms";

const Wrap = styled(Stack)(({ theme }) => ({
  margin: '80px auto 0',
  width: '90%',
  maxWidth: 600,
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    marginTop: 40,
  },
}));

const FormWrap = styled(Stack)(({ theme }) => ({
  backgroundColor: '#F0F0F0',
  padding: '15px 30px',
  width: '100%',
  borderRadius: 10,
  position: 'relative',
  alignItems: 'center',
  '&:before': {
    content: '""',
    position: 'absolute',
    height: `100%`,
    width: `100%`,
    background: 'linear-gradient(132.56deg, #61CAFF 18.46%, #6651CE 54.34%, #FBB05B 83.84%)',
    zIndex: -1,
    top: 0,
    left: 0,
    filter: `blur(10px)`,
    borderRadius: '5px',
  },
  marginTop: 20,
  marginBottom: 60,
  [theme.breakpoints.down('md')]: {
    width: '80%',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: 30,
  fontWeight: 700,
  textAlign: 'center'
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  textAlign: 'center',
  color: 'rgb(112, 123, 139)'
}));

function AuthWrap({title, subtitle, children}) {
  return (
    <Wrap>
      <Logo />
      <FormWrap>
        <Title>{title}</Title>
        <SubTitle>{subtitle}</SubTitle>
        {children}
      </FormWrap>
    </Wrap>
  );
}

export default AuthWrap;
