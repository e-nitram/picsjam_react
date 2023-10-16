import { Stack } from "@mui/material";
import { LogInButton, SignUpButton } from "components/atoms";

export default function AuthButton() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={2}
    >
      <LogInButton />
      <SignUpButton />
    </Stack>
  );
}
