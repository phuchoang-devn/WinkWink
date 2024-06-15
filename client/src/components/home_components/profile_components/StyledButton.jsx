import { Button } from '@mui/material';
import "../styles/profile.css"

const StyledButton = ({type, onClick, ortherProps, children}) => {
    return (
        <Button type={type} 
            variant="contained" 
            color="colorDark" 
            sx={{ backgroundColor: "var(--colorDark)", color:"var(--colorDark)", borderRadius: "10px", fontFamily: "Anonymous Pro" }}
            onClick={onClick}
            {...ortherProps}
            fullWidth>
            {children}
        </Button>
    )
}

export default StyledButton;

