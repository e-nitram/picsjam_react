import React, { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GradientButton } from "components/atoms";
import { GradientAnimation } from "utils";
import { Link, useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import api from 'utils/api';


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

const Text = styled(Typography)(({ theme }) => ({
  color: '#F0F0F0',
  fontSize: 14,
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center'
  },
}));

const CardItem = styled(Stack)(({ selected }) => ({
  alignItems: 'center',
  width: 270,
  height: 370,
  borderRadius: '18px',
  backgroundColor: '#F0F0F0',
  cursor: 'pointer',
  position: 'relative',
  transition: 'transform .2s',
  '& p': {
    width: '100%',
    textAlign: 'center'
  },
  border: `3px solid ${selected ? '#F0F0F0' : '#010616'}`,
  ...GradientAnimation(100, 100, 20),
  '&:hover': {
    transform: 'scale(1.05)',
    '&:before': {
      opacity: 1,
    },
  }
}));

const CardContent = styled(Stack)({
  width: '100%',
  height: '100%',
  borderRadius: '0 0 12px 12px',
  backgroundColor: '#F0F0F0',
  alignItems: 'center'
})

function Plan({ isAuthenticated }) {
  const [plan, setPlan] = useState(1);
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')


  const onPayment = async () => {
    if (!isAuthenticated) {
      navigate('/signin')
    } else {
      api.post("/stripe/checkout").then(res => {
        window.location.href = res.data.url;
      }).catch(err => {
        console.error(err)
      })
    }

  }

  console.log('isauthenticated', isAuthenticated)
  return (
    <Box>
      <Title>Picsjam txt-to-img Offers</Title>
      <Stack
        mb={{ md: '80px', xs: '40px' }}
        alignItems='center'
      >
        <Stack
          direction={{ md: 'row', xs: 'column' }}
          mb={10}
          gap={3}
        >
          <CardItem selected={plan === 1} onClick={() => setPlan(1)}>
            <Typography
              sx={{
                backgroundColor: '#4688AA',
                padding: '20px 0',
                color: 'white',
                borderRadius: '12px 12px 0 0'
              }}
              fontSize={20}
            >
              <b>PicsJam</b> Basic
            </Typography>
            <CardContent>
              <Typography
                sx={{
                  padding: '50px 0',
                }}
                fontSize={36}
              >
                Free
              </Typography>
              <Box sx={{ width: '70%' }}>
                <ul style={{ paddingLeft: '20px' }}>
                  <li>3 image generation per day</li>
                  <li>Low Generating speed</li>
                  <li>Limited Styles</li>
                </ul>
              </Box>
            </CardContent>
          </CardItem>
          <CardItem selected={plan === 2} onClick={() => setPlan(2)}>
            <Box
              sx={{
                borderRadius: '12px 12px 0 0',
                backgroundColor: '#31275F',
                padding: '20px 0',
                width: '100%'
              }}
            >
              <Typography
                sx={{
                  color: 'white',
                  borderRadius: '12px 12px 0 0',
                  fontWeight: 600,
                  background: 'linear-gradient(94.08deg, #61CAFF 46.67%, #6651CE 71.01%, #FBB05B 92.84%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  width: 'fit-content !important',
                  margin: '0 auto'
                }}
                fontSize={20}
              >
                <span style={{ WebkitTextFillColor: 'white' }}>PicsJam</span> PRO+
              </Typography>
            </Box>
            <CardContent>
              <Typography
                sx={{
                  padding: '50px 0',
                }}
                fontSize={36}
              >
                4.99$<span style={{ fontSize: 20 }}>/mo</span>
              </Typography>
              <Box sx={{ width: '70%' }}>
                <ul style={{ paddingLeft: '20px' }}>
                  <li>1000 image generation per month</li>
                  <li>Fast Generating speed</li>
                  <li>Unlimited Styles</li>
                </ul>
              </Box>
            </CardContent>
          </CardItem>
          <CardItem selected={plan === 3} onClick={() => setPlan(3)}>
            <Typography
              sx={{
                backgroundColor: '#DB974A',
                padding: '20px 0',
                color: 'white',
                borderRadius: '12px 12px 0 0'
              }}
              fontSize={20}
            >
              <b>PicsJam</b> Unlimited
            </Typography>
            <CardContent>
              <Typography
                sx={{
                  padding: '50px 0',
                }}
                fontSize={36}
              >
                14.99$<span style={{ fontSize: 20 }}>/mo</span>
              </Typography>
              <Box sx={{ width: '70%' }}>
                <ul style={{ paddingLeft: '20px' }}>
                  <li>3 image generation per day</li>
                  <li>Low Generating speed</li>
                  <li>Limited Styles</li>
                </ul>
              </Box>
            </CardContent>
          </CardItem>
        </Stack>
        <GradientButton onClick={onPayment}>Continue to payment</GradientButton>
      </Stack>
      <Stack mb='100px' gap={2}>
        <Text>This is an AI Image Generator. It creates an image from scratch from a text description.</Text>
        <Text>Yes, this is the one you've been waiting for. Text-to-image uses AI to understand your words and convert them to a unique image each time. Like magic.</Text>
        <Text>This can be used to generate AI art, or for general silliness.</Text>
        <Text>Don't expect the quality to be photorealistic, however. You would need a really really big AI to do that, and have you priced those lately?</Text>
        <Text>If you can't think of something, try "Balloon in the shape of X" where X is something you wouldn't find in balloon form.</Text>
      </Stack>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});


export default connect(mapStateToProps)(Plan);
