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
const labelStyle = {
    fontFamily: "Anonymous Pro, monospace",
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
                sx={{ display: "flex", justifyContent: "space-around"}}>
                <FormControlLabel value="female" control={<Radio sx={style}/>} label="Female" sx={labelStyle} />
                <FormControlLabel value="male" control={<Radio sx={style}/>} label="Male" sx={labelStyle} />
                <FormControlLabel value="non-binary" control={<Radio sx={style}/>} label="Non-binary" sx={labelStyle} />
            </RadioGroup>
        </FormControl>
    );
}