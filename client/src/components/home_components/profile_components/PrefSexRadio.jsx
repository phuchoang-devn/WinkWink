import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const style = {
    color: "var(--colorLight)",
    transition: "background-color 0.3s ease",
    '&.Mui-checked': {
        color: "var(--colorDark)",
    },
    '&:hover': {
        backgroundColor: "rgb(248, 231, 246,0.25)", // Setze hier die gewünschte Hintergrundfarbe beim Hover
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
                <FormControlLabel value="non-binary" control={<Radio sx={style}/>} label="Non-Binary" sx={labelStyle} />
            </RadioGroup>
        </FormControl>
    );
}