import {
  Stack,
  Typography,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const InputWrap = styled(Stack)({
  width: '100%',
  marginTop: 24,
  alignItems: 'start',
  gap: 8
});

const Label = styled(Typography)({
  color: 'rgb(50, 50, 50)',
  fontWeight: 600,
  fontSize: 14
});

const StyledInput = styled(TextField)({
  width: '100%',
  borderRadius: 12,
  '& .MuiInputBase-root': {
    borderRadius: 8
  }
});

export default function FormInput({
  label,
  value,
  onChange,
  placeholder,
  type="text"
}) {
  return (
    <InputWrap>
      <Label>{label}</Label>
      <StyledInput
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder={placeholder}
        type={type}
      />
    </InputWrap>
  );
}
