import { Button } from '@mui/material';
import "../styles/profile.scss"

const StyledButton = ({type, onClick, ortherProps, children}) => {
    return (
        <Button type={type} 
            variant="contained" 
            color="colorDark" 
            sx={{ backgroundColor: "var(--colorDark)", color:"var(--colorLight)", borderRadius: "20px", fontFamily: "Anonymous Pro", fontSize:"16px"}}
            onClick={onClick}
            {...ortherProps}
            fullWidth>
            {children}
        </Button>
    )
}

export default StyledButton;

