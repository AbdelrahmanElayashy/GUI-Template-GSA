import { useState } from 'react'
import '../../style/App.css';
import loginHelp from '../../assets/help/login.png'
import { Modal, TextField, Typography, Grid, Button, FormHelperText } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/styles';
import { useForm } from '../../hooks/useForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Input = styled('input')({
    display: 'none',
});

export default function LoginForm(props) {

    const FormName = 'login'

    //Handle Modal Show
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //validations
    const [widthError, setWidthError] = useState(false)
    const [logoError, setLogoError] = useState(false)
    // const [supergrahicError, setSupergraphicError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    //Form
    const [state, handleState, setValue] = useForm({
        image: '',
        supergraphic: process.env.REACT_APP_SUPERGRAPIC,
        password: '',
        loginButton: {
            width: '100',
            backgroundColor: '#1976d2',
            color: '#FFFFFF'
        }
    })

    const isValid = () => {
        if (widthError) return false

        if (state.password === '') {
            setPasswordError(true)
            return false
        }
        setPasswordError(false)
        if (state.image === '') {
            setLogoError(true)
            return false
        }
        setLogoError(false)
        // if (state.supergraphic === '') {
        //     setSupergraphicError(true)
        //     return false
        // }
        // setSupergraphicError(false)

        return true
    }

    //process state input before submit 
    const processStateInput = () => {
        let processedInput = state
        processedInput['loginButton']['width'] += '%'
        return processedInput
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!isValid()) return

        props.handleNext(FormName, processStateInput())

    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3} mt={1} mb={3}>

                <Grid item sm={12} md={6}>
                    <TextField
                        id="filled-number"
                        label="Button-Width"
                        type="number"
                        name="loginButton-width"
                        value={state.loginButton.width}
                        onChange={e => {
                            setWidthError(false)
                            if (e.target.value < 10 || e.target.value > 100) {
                                setWidthError(true)
                            }
                            handleState(e)
                        }
                        }
                        variant="filled"
                        size="small"
                        helperText="Enter value between 10 and 100"
                        error={widthError}
                    />
                </Grid>

                <Grid item sm={12} md={6}>
                    <TextField
                        name="password"
                        error={passwordError}
                        value={state.password}
                        onChange={handleState}
                        id="filled-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="filled"
                        size="small"
                        helperText="*required"

                    />
                </Grid>

                <Grid item sm={12} md={12}>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" type="file" onChange={handleState} name="image" />
                        <Button variant="contained" component="span"  >
                            Upload  #Logo-Login-Img
                        </Button>
                        <FormHelperText style={{ marginLeft: 15, color: 'red' }}>{logoError ? '*required' : null}</FormHelperText>
                    </label>
                </Grid>

{/* 
                <Grid item sm={12} md={6}>
                    <label htmlFor="contained-button-file1">
                        <Input accept="image/*" id="contained-button-file1" type="file" onChange={handleState} name="supergraphic" />
                        <Button variant="contained" component="span">
                            Upload #Supergraphic
                        </Button>
                        <FormHelperText style={{ marginLeft: 15, color: 'red' }}>{supergrahicError ? '*required' : null}</FormHelperText>
                    </label>
                </Grid> */}


       
                <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="overline" display="block" gutterBottom>
                        Button-Background
                    </Typography>
                    <input type="color" className="ColorInput"
                        value={state.loginButton.backgroundColor} onChange={handleState} name="loginButton-backgroundColor" />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="overline" display="block" gutterBottom>
                        Button-Color
                    </Typography>

                    <input type="color" className="ColorInput"
                        value={state.loginButton.color} onChange={handleState} name="loginButton-color" />

                </Grid>


            </Grid>
            <Box sx={{ mb: 2, mt: 6 }}>
                <div>

                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ mt: 1, mr: 1 }}
                    >
                        {props.currentIndex === props.numSteps - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button sx={{ mt: 1, mr: 1 }} onClick={handleOpen}>Help</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <img src={loginHelp} className="img-fluid" />
                        </Box>
                    </Modal>
                    <Button
                        disabled={props.currentIndex === 0}
                        onClick={props.handleBack}
                        sx={{ mt: 1, mr: 1 }}
                    >
                        Back
                    </Button>

                </div>
            </Box>
        </form>

    );
}