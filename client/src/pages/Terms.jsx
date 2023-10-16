import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Title = styled(Typography)(({ theme }) => ({
  color: '#F0F0F0',
  marginTop: 20,
  marginBottom: 120,
  fontSize: '36px',
  fontWeight: 700,
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',
    marginBottom: 40,
  },
}));

const Text = styled(Typography)({
  color: '#F0F0F0',
  marginBottom: 150,
  fontSize: 14
});

function Terms() {
  return (
    <Box>
      <Title>Terms</Title>
      <Text></Text>
    </Box>
  );
}

export default Terms;
