import { Stack, Box } from '@mui/material';
import { GenerateLink, PROLink, TermsLink } from "components/atoms";
import { styled } from '@mui/material/styles';

const SidebarItem = styled(Box)({
  padding: '10px 25px',
  borderBottom: '1px solid #010616'
});

export default function SidebarLinks() {
  return (
    <Stack>
      <SidebarItem>
        <GenerateLink />
      </SidebarItem>
      <SidebarItem>
        <PROLink />
      </SidebarItem>
      <SidebarItem>
        <TermsLink />
      </SidebarItem>
    </Stack>
  );
}
