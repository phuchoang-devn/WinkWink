import "./styles/setting.scss"
import TextField from '@mui/material/TextField';
import { AlertSnackbar, StyledButton } from './profile_components';
import { useState } from "react";
import { useAuth } from "../../context_providers/auth_provider";
import close from '../../static/image/close.svg'
import {useNavigate} from "react-router-dom";

const textStyle = {
    '& .MuiInputBase-input': {
        fontFamily: "Anonymous Pro, monospace",
    }
}

const getHintStyle = (isValid) => {
    return !isValid ? {
        fontWeight: "600",
        color: "var(--colorDark)"
    } : {
        opacity: 0.25
    }
}

const HomeSetting = () => {
    const [currentPass, setCurrentPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [passForDelete, setPassForDelete] = useState("");
    const { logout } = useAuth()

    const isAtLeast8Char = currentPass.length >= 8
        && newPass.length >= 8
        && confirmPass.length >= 8
    const isNewPassDifferent = currentPass !== newPass
    const isConfirmPassValid = confirmPass === newPass

    const [submitStatus, setSubmitStatus] = useState({
        isOpen: false,
    });

    const handleChangePassword = async (event) => {
        event.preventDefault()

        const response = await fetch(`/api/account/password`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                currentPassword: currentPass,
                newPassword: newPass
            })
        });

        if (response.ok) {
            setSubmitStatus({
                isOpen: true,
                isSuccess: true
            })

            setCurrentPass("")
            setNewPass("")
            setConfirmPass("")
        } else if (response.status === 400) {
            setSubmitStatus({
                isOpen: true,
                isSuccess: false
            })
        }
    }

    const handleDeleteAccount = async (event) => {
        event.preventDefault()

        const response = await fetch(`/api/account`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                currentPassword: passForDelete
            })
        });

        if (response.ok) {
            logout()
        } else if (response.status === 400) {
            setSubmitStatus({
                isOpen: true,
                isSuccess: false
            })
            setPassForDelete("")
        }
    }

    const navigate = useNavigate();

    return (
        <>
            <div className='setting'>
                <div className='setting-container'>
                    <button className='close-btn' onClick={() => navigate('/')}><img src={close} alt='close-icon'/></button>
                    <form className='password-form' onSubmit={handleChangePassword}>
                        <div>
                            <div className="hint-text"
                                 style={getHintStyle(isAtLeast8Char)}
                            >
                                Passwords must have at least 8 characters.
                            </div>

                            <div className="hint-text"
                                 style={getHintStyle(isNewPassDifferent)}
                            >
                                New password must be different.
                            </div>

                            <div className="hint-text"
                                 style={getHintStyle(isConfirmPassValid)}
                            >
                                Confirm and new passwords must be the same.
                            </div>
                        </div>

                        <TextField sx={textStyle}
                                   color="colorDark"
                                   type='password'
                                   placeholder="Current Password"
                                   variant="outlined"
                                   size='small'
                                   value={currentPass}
                                   onChange={e => setCurrentPass(e.target.value)}
                        />

                        <TextField sx={textStyle}
                                   color="colorDark"
                                   type='password'
                                   placeholder="New Password"
                                   variant="outlined"
                                   size='small'
                                   value={newPass}
                                   onChange={e => setNewPass(e.target.value)}
                        />

                        <TextField sx={textStyle}
                                   color="colorDark"
                                   type='password'
                                   placeholder="Confirm New Password"
                                   variant="outlined"
                                   size='small'
                                   value={confirmPass}
                                   onChange={e => setConfirmPass(e.target.value)}
                        />

                        <StyledButton type="submit"
                                      ortherProps={{disabled: !(isAtLeast8Char && isNewPassDifferent && isConfirmPassValid)}}
                        >
                            CHANGE PASSWORD
                        </StyledButton>
                    </form>

                    <hr/>

                    <form className="delete-form" onSubmit={handleDeleteAccount}>
                        <StyledButton type="submit"
                                      ortherProps={{disabled: passForDelete.length < 8}}
                        >
                            DELETE ACCOUNT
                        </StyledButton>

                        <TextField sx={textStyle}
                                   color="colorDark"
                                   type='password'
                                   placeholder="Enter Password to confirm delete"
                                   variant="outlined"
                                   size='small'
                                   value={passForDelete}
                                   onChange={e => setPassForDelete(e.target.value)}
                        />
                    </form>
                </div>
            </div>
            <AlertSnackbar status={submitStatus}
                           errorMessage={"Current Password is wrong!"} />
        </>
    );
}

export default HomeSetting;