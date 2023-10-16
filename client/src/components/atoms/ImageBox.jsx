import { Box, Stack } from "@mui/material";

const ImageBox = ({ style, src }) => {
  return (
    <Stack sx={style}>
      <Box
        component="img"
        src={src}
      />
    </Stack>
  )
}

export default ImageBox;