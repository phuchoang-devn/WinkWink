import {
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@mui/material';
import { styled } from "@mui/material/styles";
import { useId } from 'react';

const options = {
  shouldForwardProp: (prop) => prop !== 'isError',
};

const outlinedSelectors = [
  '&:hover .MuiOutlinedInput-notchedOutline',
  '&.Mui-focused .MuiOutlinedInput-notchedOutline',
];

const CssSelect = styled(
  Select,
  options,
)(({isError}) => ({
  backgroundColor: "var(--colorWhite)",

  [outlinedSelectors.join(',')]: isError ? {
    borderWidth: 3,
  } : {
    borderWidth: 2,
    borderColor: "var(--colorDark)",
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderWidth: isError ? 2 : 1,
  },
  '& .MuiInputBase-input': {
    fontFamily: "Anonymous Pro, monospace", // Schriftart für die Eingabe
  }
}));

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: "200px",
      fontFamily: "Anonymous Pro, monospace"
    },
  },
};

const Dropdown = ({ isError, currentValue, options, onSelect, label }) => {
  const dropdownId = useId();

  return (
    <FormControl error={isError} sx={{ backgroundColor: "var(--colorWhite)", fontFamily: "Anonymous Pro, monospace" }} fullWidth>
      <InputLabel
        color='colorDark'
        id={dropdownId}
        sx={{ fontFamily: "Anonymous Pro, monospace" }}
      >
        {label}
      </InputLabel>

      <CssSelect
        isError={isError}
        labelId={dropdownId}
        label={label}
        value={currentValue || ""}
        onChange={onSelect}
        MenuProps={MenuProps}
        sx={{ fontFamily: "Anonymous Pro, monospace" }}
      >
        {options.map(option => (
          <MenuItem key={option} value={option} sx={{ fontFamily: "Anonymous Pro, monospace" }}>{option}</MenuItem>
        ))}
      </CssSelect>
    </FormControl>
  );
};

export default Dropdown;
