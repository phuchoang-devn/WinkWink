import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "../styles/profile.scss"


const MIN_DISTANCE = 10;

export default function AgeSlider({ currentValue, updateValue }) {

    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < MIN_DISTANCE) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - MIN_DISTANCE);
                updateValue([clamped, clamped + MIN_DISTANCE]);
            } else {
                const clamped = Math.max(newValue[1], 18 + MIN_DISTANCE);
                updateValue([clamped - MIN_DISTANCE, clamped]);
            }
        } else {
            updateValue(newValue);
        }
    };

    return (
        <Box sx={{ width: 320 }}>
            <Typography gutterBottom sx={{ fontFamily: "Anonymous Pro, monospace" }}>{currentValue[0]} - {currentValue[1]} years old</Typography>
            <PrettoSlider
                valueLabelDisplay="auto"
                value={currentValue}
                onChange={handleChange}
                min={18}
                disableSwap
                sx={{ 
                fontFamily: "Anonymous Pro, monospace", 
                '& .MuiInputBase-input': {
                    fontFamily: "Anonymous Pro, monospace", 
                },
                '& .MuiInputLabel-root': {
                    fontFamily: "Anonymous Pro, monospace", 
                }
            }}
            />
        </Box>
    );
}

const PrettoSlider = styled(Slider)({
    color: 'var(--colorLight)',
    height: 8,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: 'var(--colorDark)',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&::before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontFamily: "Anonymous Pro, monospace",
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: 'var(--colorDark)',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&::before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
});