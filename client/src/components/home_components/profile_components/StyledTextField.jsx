import { TextField } from '@mui/material';
import { styled } from "@mui/material/styles";


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
    '& .MuiFormHelperText-root': {
        fontFamily: "Anonymous Pro, monospace",
    }
}));

const multipleLineProps = (currentValue) => ({
    multiline: true,
    rows: 5,
    inputProps: { maxLength: 125 },
    helperText: `${currentValue.length}/${125}`,
    FormHelperTextProps: {
        className: "my-profile__helper-text",
        sx: { fontFamily: "Anonymous Pro, monospace" }
    }
});

const StyledTextField = ({ isError, isAboutMe, label, currentValue, handleChange }) => {

    const otherProps = isAboutMe ? multipleLineProps(currentValue) : null

    return (
        <CssTextField label={label}
            color='colorDark'
            isError={isError}
            error={isError}
            variant="outlined"
            value={currentValue}
            onChange={handleChange}
            {...otherProps}
            sx={{ 
                fontFamily: "Anonymous Pro, monospace",
                '& .MuiInputBase-input': {
                    fontFamily: "Anonymous Pro, monospace",
                },
                '& .MuiInputLabel-root': {
                    fontFamily: "Anonymous Pro, monospace",
                },
                '& .MuiFormHelperText-root': {
                    fontFamily: "Anonymous Pro, monospace",
                }
            }}
        />
    )
}

export default StyledTextField;