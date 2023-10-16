import { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormInput } from "components/molecules";
import { GradientButton } from "components/atoms";

const Title = styled(Typography)(({ theme }) => ({
  color: '#F0F0F0',
  marginTop: 20,
  marginBottom: 60,
  fontSize: '36px',
  fontWeight: 700,
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',
    marginBottom: 40,
  },
}));

const FormWrap = styled(Stack)(({ theme }) => ({
  backgroundColor: '#F0F0F0',
  padding: '15px 30px',
  width: 400,
  borderRadius: 10,
  position: 'relative',
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
  marginBottom: 60,
  [theme.breakpoints.down('md')]: {
    alignItems: 'center',
    width: 250,
  },
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: 700,
  textAlign: 'start',
  color: '#343a40'
}));

function Billing() {
  const [cardnumber, setCardnumber] = useState("");
  const [cardname, setCardname] = useState("");

  return (
    <Box>
      <Title>Update Billing Information</Title>
      <Stack
        direction={{md: 'row', xs: 'column-reverse'}}
        alignItems={{md: 'start', xs: 'center'}}
        justifyContent="space-between"
        gap={3}
      >
        <FormWrap
          sx={{
            height: 150,
            width: 200,
            justifyContent: 'center'
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 600,
              position: "absolute",
              top: 70,
            }}
          >
            {cardnumber ? cardnumber : "**** **** **** ****"}
          </Typography>
          <Stack
            position="absolute"
            bottom={10}
            left={20}
          >
              <Typography sx={{fontSize: 12}}>
                CARD HOLDER
              </Typography>
              <Typography sx={{fontSize: 16, fontWeight: 600, height: 20}}>
                {cardname}
              </Typography>
          </Stack>
          <Stack
            position="absolute"
            bottom={10}
            right={20}
          >
            <Typography sx={{fontSize: 12}}>
              EXPIRES
            </Typography>
            <Typography sx={{fontSize: 16, fontWeight: 600}}>
              00/00
            </Typography>
          </Stack>
        </FormWrap>
        <FormWrap>
          <FormTitle>Card Detail</FormTitle>
          <FormInput
            label="Card Holder Name"
            value={cardname}
            onChange={setCardname}
          />
          <FormInput
            label="Card Number"
            placeholder="**** **** **** ****"
            value={cardnumber}
            onChange={(val) => {
              if(val.length <= 16)setCardnumber(val)
            }}
          />
          <FormInput
            label="Expiry Month"
          />
          <FormInput
            label="Expiry Year"
          />
          <FormInput
            label="CVV"
          />
          <GradientButton
            style={{
              width: '100%',
              padding: '10px',
              my: 3,
            }}
          >
            Confirm
          </GradientButton>
        </FormWrap>
      </Stack>
    </Box>
  );
}

export default Billing;
