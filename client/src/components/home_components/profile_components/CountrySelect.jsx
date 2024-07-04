import { Box, TextField, Autocomplete } from '@mui/material';
import { styled } from "@mui/material/styles";
import { v4 as uuidv4 } from 'uuid';
import { allCountries, getSrcByCountryCode } from '../../../static/js/countries-languages';

const options = {
    shouldForwardProp: (prop) => prop !== 'isError',
};

const outlinedSelectors = [
    '&:hover .MuiOutlinedInput-notchedOutline',
    '& .Mui-focused .MuiOutlinedInput-notchedOutline',
];

const CssTextField = styled(
    TextField,
    options,
)(({ isError }) => ({
    backgroundColor: "var(--colorWhite)",
    [outlinedSelectors.join(',')]: isError ? {
        borderWidth: 3,
    } : {
        borderColor: "var(--colorDark)",
        borderWidth: 2,
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: isError ? 2 : 1,
    },
    '& .MuiInputBase-input': {
        fontFamily: "Anonymous Pro, monospace",
    },
    '& .MuiInputLabel-root': {
        fontFamily: "Anonymous Pro, monospace",
    },
}));

export default function CountrySelect({ isError, currentValue, onSelectCountry }) {

    return (
        <Autocomplete
            fullWidth
            sx={{ backgroundColor: "var(--colorWhite)", fontFamily: "Anonymous Pro, monospace" }}
            value={currentValue ?? ""}
            isOptionEqualToValue={() => true} //disable check value in allCountries
            options={allCountries}
            autoHighlight
            onChange={(event, option) => onSelectCountry(option?.label)}
            renderOption={(props, option) => {
                const { key, ...otherProps } = props;
                return (
                    <Box key={uuidv4()} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } ,fontFamily: "Anonymous Pro, monospace" }} {...otherProps}>
                        <img width="20" alt="" src={getSrcByCountryCode(option.code)} />
                        {option.label} ({option.code})
                    </Box>
                );
            }}
            renderInput={(params) => (
                <CssTextField
                    error={isError}
                    color='colorDark'
                    isError={isError}
                    {...params}
                    label="Country"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    );
}