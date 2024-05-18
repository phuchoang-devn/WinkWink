import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const style = {
    color: "var(--colorLight)",
    '&.Mui-checked': {
        color: "var(--colorDark)",
    },
};

export default function PrefSexRadio({ currentValue, handleChange }) {
    return (
        <FormControl fullWidth>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={currentValue}
                onChange={handleChange}
                sx={{ display: "flex" , justifyContent: "space-around"}}>
                <FormControlLabel value="female" control={<Radio sx={style}/>} label="Female" />
                <FormControlLabel value="male" control={<Radio sx={style}/>} label="Male" />
                <FormControlLabel value="divers" control={<Radio sx={style}/>} label="Divers" />
            </RadioGroup>
        </FormControl>
    );
}