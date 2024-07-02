import { Snackbar, Alert, Grow } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { useEffect, useRef, useState } from 'react';


function GrowTransition(props) {
    return <Grow {...props} />;
}

export default function AlertSnackbar({ status, errorMessage }) {
    const lastIsSuccess = useRef(status.isSuccess);
    const [open, setOpen] = useState(true);

    useEffect(() => {
        setOpen(false);
        let openSnackbar = setTimeout(() => {
            setOpen(true);
            lastIsSuccess.current = status.isSuccess;
        }, 150);
        return () => clearTimeout(openSnackbar);
    }, [status]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <Snackbar open={status.isOpen && open}
                autoHideDuration={5000}
                TransitionComponent={GrowTransition}
                onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={lastIsSuccess.current ? "success" : "error"}
                    variant="filled"
                    sx={{ 
                        width: '100%',
                    fontFamily: "Anonymous Pro, monospace",
                        '& .MuiAlert-icon': {
                            fontFamily: "Anonymous Pro, monospace",
                        },
                        '& .MuiAlert-message': {
                            fontFamily: "Anonymous Pro, monospace",
                        },
                        '& .MuiAlert-action': {
                            fontFamily: "Anonymous Pro, monospace",
                        } }}
                    iconMapping={{
                        success: <FavoriteIcon fontSize="inherit" />,
                        error: <HeartBrokenIcon fontSize="inherit"/>
                    }}
                >
                    {lastIsSuccess.current ? "Successfully updated!" : errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}