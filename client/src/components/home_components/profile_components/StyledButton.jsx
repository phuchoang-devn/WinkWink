import { Button } from '@mui/material';

const StyledButton = ({type, onClick, ortherProps, children}) => {
    return (
        <Button type={type} 
            variant="contained" 
            color="colorDark" 
            sx={{ backgroundColor: "var(--colorDark)", color:"white", borderRadius: "10px" }}
            onClick={onClick}
            {...ortherProps}
            fullWidth>
            {children}
        </Button>
    )
}

export default StyledButton;

