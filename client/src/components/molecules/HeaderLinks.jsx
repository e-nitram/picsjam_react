import { Stack } from "@mui/material";
import { GenerateLink, PROLink, TermsLink } from "components/atoms";

export default function HeaderLinksLaptop() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      gap={3}
    >
      <GenerateLink />
      <PROLink />
      <TermsLink />
    </Stack>
  );
}
