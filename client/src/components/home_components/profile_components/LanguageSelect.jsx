import { useId } from 'react';
import { allLanguages } from '../../../static/js/main/countries-languages';
import {
    FormHelperText,
    Chip,
    Select,
    FormControl,
    MenuItem,
    InputLabel,
    OutlinedInput,
    Box
} from '@mui/material';
import { styled } from "@mui/material/styles";

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
        borderWidth: 3
    } : {
        borderWidth: 2,
        borderColor: "var(--colorDark)",
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: isError ? 2 : 1,
    }
}));

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: "200px"
        },
    },
};

export default function LanguageSelect({ isError, currentValue, updateValues }) {
    const id = useId();
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        updateValues(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChipDelete = (selected, chipValue) => () => {
        let newValues = selected.filter(s => s !== chipValue)
        updateValues(newValues);
    }

    return (
        <div>
            <FormControl error={isError} sx={{ backgroundColor: "var(--colorWhite)" }} fullWidth>
                <InputLabel id={id} color='colorDark'>Languages</InputLabel>
                <CssSelect
                    labelId={id}
                    isError={isError}
                    multiple
                    value={currentValue}
                    onChange={handleChange}
                    input={<OutlinedInput label="Languages"/>}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, marginBottom: 1 }}>
                            {selected.map((value) => (
                                <Chip key={value}
                                    label={value}
                                    onDelete={handleChipDelete(selected, value)}
                                    onMouseDown={(e) => { e.stopPropagation(); }}
                                    sx={{
                                        backgroundColor: "var(--colorMiddle)",
                                        '& .MuiChip-deleteIcon': {
                                            color: 'var(--colorLight)',
                                        },
                                        '&:hover .MuiChip-deleteIcon': {
                                            color: 'var(--colorDark)',
                                        },
                                    }} />
                            ))}
                            <FormHelperText className='my-profile__helper-text' sx={{ right: 10, color: "var(--colorDark)" }}>Maximum 3 languages</FormHelperText>
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {allLanguages.map((language) => (
                        <MenuItem
                            key={language}
                            value={language}
                            disabled={currentValue.length >= 3 && !currentValue.includes(language)}
                        >
                            {language}
                        </MenuItem>
                    ))}
                </CssSelect>
            </FormControl>
        </div>
    );
}