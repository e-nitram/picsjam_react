import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const Logo = () => {
  return (
    <Link to="/">
      <Box
        sx={{height: "100%"}}
        component="img"
        src="Logo.svg"
        alt="logo"
      />
    </Link>
  )
}

export default Logo;