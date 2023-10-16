import { useEffect, useState } from 'react';
import { Box, Stack, Button, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';
import ReplyIcon from '@mui/icons-material/Reply';
import { GradientButton, ImageBox } from "components/atoms";
import { GradientAnimation } from "utils";
import api from 'utils/api';
import { connect } from "react-redux";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckout from './StripeCheckout'; // This is the new component we'll create

const stripePromise = loadStripe('YOUR_PUBLIC_KEY');


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
  margin: '0 auto 150px',
  maxWidth: 725,
  fontSize: 14,
  [theme.breakpoints.down('sm')]: {
    marginBottom: 40,
  },
}));

const SubTitle = styled(Typography)({
  fontSize: 18,
  color: '#F0F0F0'
});

const IconButton = styled(Button)({
  color: 'white',
  textTransform: 'capitalize',
  backgroundColor: 'transparent !important',
  '& svg': {
    fontSize: '22px !important',
  }
});

const ResolutionButton = styled(Button)(({ selected }) => ({
  color: '#F0F0F0',
  textTransform: 'capitalize',
  flexDirection: 'column',
  backgroundColor: 'transparent !important',
  justifyContent: 'space-between',
  border: '1px solid transparent',
  gap: 8,
  '& img': {
    height: 40,
    borderRadius: 8,
    border: `2px solid ${selected ? 'white' : 'transparent'}`,
  },
}));

const ImageItem = styled(Button)(({ theme }) => ({
  color: '#F0F0F0',
  textTransform: 'capitalize',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: 88,
  gap: 10,
  width: 80,
  fontSize: 12,
  position: 'relative',
  backgroundColor: 'transparent !important',
  '& img': {
    width: '100%',
  },
  ...GradientAnimation(75, 85),
  [theme.breakpoints.down('md')]: {
    ...GradientAnimation(60, 85),
  },
}));

const StyleBox = styled(Stack)(({ theme }) => ({
  maxWidth: 485,
  width: '100%',
  height: 190,
  flexWrap: 'wrap',
  overflow: 'auto',
  padding: '16px 16px',
  flexDirection: 'row',
  gap: 16,
  border: '1px solid #F0F0F0',
  justifyContent: 'center',
  marginTop: 10,
  [theme.breakpoints.down('md')]: {
    height: 98,
    justifyContent: 'start',
    flexWrap: 'inherit',
  },
}))

const DownloadImage = styled(Box)({
  maxWidth: '512px',
  width: '100%',
  margin: '0 auto'
});

const ImageList = Array.from(Array(15).keys())

function Landing({ isAuthenticated, user }) {
  const [loading, setLoading] = useState(false);
  const [resolution, setResolution] = useState(1);
  const [generatedImage, setGeneratedImage] = useState('/empty-image.png');
  const [selectedImage, setSelectedImage] = useState('/UploadImage.svg');
  const [btnSetting, setBtnSetting] = useState()
  const [ip, setIp] = useState('')

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setIp(data.ip)
        if (isAuthenticated) {
          const ipdata = {
            ip: data.ip,
            userId: user._id
          }
          api.post(`generate-image/images`, ipdata)
            .then(res => {
              setBtnSetting(res.data.disable)
              console.log('disable', res.data.disable)
            })
        } else {
          const ipdata = {
            ip: data.ip,
          }
          api.post(`generate-image/images`, ipdata)
            .then(res => {
              setBtnSetting(res.data.disable)
              console.log('disable', res.data.disable)
            })
        }

      })
      .catch(error => {
        console.error('Error fetching IP', error);
      });
  }, [user, ip])

  const generate = () => {
    setLoading(true);
    console.log('111')
    const data = {
      user: user,
      image: selectedImage,
      ip: ip
    }

    api.post('/generate-image/generate-image', data)
      .then(res => {
        console.log('resss', res.data)
        if (res.data.status === "pending") {
          checkStatus(res.data.id);
        }
        setGeneratedImage(res.data.originalImageLink);
      })
  }

  const checkStatus = (imageId) => {
    let newInterval = setInterval(() => {
      api.get(`/generate-image/iscompleted/${imageId}`).then(res => {
        if (res.data.completed === true) {
          clearInterval(newInterval);
          setLoading(false);
        }
      }).catch(err => {
        console.error(err);
      })
    }, 1000);
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  return (
    <Box>
      <Elements stripe={stripePromise}>
        <StripeCheckout />
      </Elements>
      <Title>Tell a story with each photo you take</Title>
      <Stack
        mb={{ md: '80px', xs: '60px' }}
        alignItems='center'
      >
        <Stack
          direction={{ md: 'row', xs: 'column' }}
          mb={{ md: '80px', xs: '40px' }}
          gap={{ md: 10, xs: 8 }}
          sx={{ width: '100%' }}
        >
          <Stack
            gap={2}
            alignItems={{ md: 'start', xs: 'center' }}
          >
            <SubTitle>
              Upload your photo
            </SubTitle>
            <div>
              {selectedImage ? (
                <img
                  style={{
                    borderRadius: '20px',
                    maxWidth: 352,
                    width: '100%'
                  }}
                  src={selectedImage}
                  alt="Uploaded"
                  onClick={() => document.getElementById('fileInput').click()} />
              ) : (
                <div onClick={() => document.getElementById('fileInput').click()}>
                  Click here to upload an image
                </div>
              )}
              <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </Stack>
          <Stack gap={{ md: 3, xs: 8 }}>
            <Stack gap={1} alignItems={{ md: 'start', xs: 'center' }}>
              <SubTitle>
                Choose a style
              </SubTitle>
              <StyleBox>
                {
                  ImageList.map(data => (
                    <ImageItem disableRipple key={data}>
                      <ImageBox src="/image.svg" />
                      {`Image${data + 1}`}
                    </ImageItem>
                  ))
                }
              </StyleBox>
            </Stack>
            <Stack gap={1} alignItems={{ md: 'start', xs: 'center' }}>
              <SubTitle>
                Select resolution
              </SubTitle>
              <Stack
                direction="row"
                px={{ md: 2, xs: 0 }}
                gap={{ md: 2, xs: 0 }}
                justifyContent="space-around"
                sx={{
                  width: '100%',
                  minWidth: 300,
                  maxWidth: 400,
                }}
              >
                <ResolutionButton
                  selected={resolution === 1}
                  disableRipple
                  onClick={() => setResolution(1)}
                >
                  <ImageBox
                    src="/icons/Square.svg"
                    style={GradientAnimation(50, 70)}
                  />
                  Square
                </ResolutionButton>
                <ResolutionButton
                  selected={resolution === 2}
                  disableRipple
                  onClick={() => setResolution(2)}
                >
                  <ImageBox
                    src="/icons/Landscape.svg"
                    style={GradientAnimation(50, 85)}
                  />
                  Landscape
                </ResolutionButton>
                <ResolutionButton
                  selected={resolution === 3}
                  disableRipple
                  onClick={() => setResolution(3)}
                >
                  <ImageBox
                    src="/icons/Portrait.svg"
                    style={GradientAnimation(50, 55)}
                  />
                  Portrait
                </ResolutionButton>
                <ResolutionButton
                  selected={resolution === 4}
                  disableRipple
                  onClick={() => setResolution(4)}
                >
                  <ImageBox
                    src="/icons/Vertical.svg"
                    style={GradientAnimation(50, 43)}
                  />
                  Vertical
                </ResolutionButton>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <GradientButton select={btnSetting} onClick={generate}>Generate</GradientButton>
      </Stack>
      <DownloadImage
        mb={{ md: '100px', xs: '40px' }}
      >
        <Stack
          sx={{
            width: '100%',
            minHeight: '400px'
          }}
          alignItems='center'
          justifyContent='center'
        >
          {
            loading ?
              <CircularProgress />
              :
              <Box
                component="img"
                src={generatedImage}
                sx={{
                  borderRadius: '20px',
                  width: '100%'
                }}
              />
          }
        </Stack>
        <Stack
          direction="row"
          mt={2}
          gap={2}
        >
          <IconButton startIcon={<ReplyIcon />}>
            Share
          </IconButton>
          <IconButton startIcon={<DownloadIcon />}>
            Download
          </IconButton>
        </Stack>
      </DownloadImage>
      {console.log('btnSetting', btnSetting)}
      {console.log('frontend user', user)}
      <Text textAlign={{ md: 'left', xs: 'center' }}>
        In in odio suscipit, elementum augue in, tempor lorem. Nunc sed nibh lacus. Ut ut nunc ac erat lacinia semper at sed risus. Maecenas vitae turpis velit. Nulla lobortis molestie leo ut tincidunt. Vivamus vitae ultrices dolor. Duis tincidunt sem arcu, vitae vulputate est posuere vitae. In ut fringilla neque. Nunc turpis ante, accumsan fermentum tortor vitae, porttitor aliquet sem. Nunc eu rutrum tortor, ac commodo dolor. Nunc tortor justo, commodo eget tellus interdum, luctus feugiat lorem.
      </Text>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps)(Landing);