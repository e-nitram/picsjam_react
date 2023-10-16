import { Stack, Link } from "@mui/material";
import { styled } from '@mui/material/styles';

const IconButton = styled(Link)(({ theme }) => ({
  width: '40px',
  height: '40px',
  '& img': {
    width: '100%'
  },
  [theme.breakpoints.down('md')]: {
    width: '30px',
    height: '30px',
  },
}));

export default function SocialLinks() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
    >
      <IconButton href="/">
        <img src="/icons/google.svg" alt="google" />
      </IconButton>
      <IconButton href="/">
        <img src="/icons/instagram.svg" alt="instagram" />
      </IconButton>
      <IconButton href="/">
        <img src="/icons/facebook.svg" alt="facebook" />
      </IconButton>
    </Stack>
  );
}
