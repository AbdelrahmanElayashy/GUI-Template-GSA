import { useState } from 'react'
import '../../style/App.css';
import loginHelp from '../../assets/help/home.png'
import { Modal, TextField, Typography, Grid, Button, FormHelperText } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/styles';
import { useForm } from '../../hooks/useForm';
import { FormControlLabel, Switch } from '@material-ui/core';

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

export default function HomeForm(props) {

    const FormName = 'home'

    //Handle Modal Show
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //validations
    const [widthError1, setWidthError1] = useState(false)
    const [widthError2, setWidthError2] = useState(false)
    const [logoError, setLogoError] = useState(false)

    //Form
    const [state, handleState, setValue] = useForm({
        askForGeoLocation: false,
        image: '',
        searchButton: {
            width: '100',
            backgroundColor: '#1976d2',
            color: '#FFFFFF'
        },
        cameraButton: {
            width: '100',
            backgroundColor: '#1976d2',
            color: '#FFFFFF'
        }
    })


    const isValid = () => {
        if (widthError1 || widthError2) return false

        if (state.image === '') {
            setLogoError(true)
            return false
        }
        setLogoError(false)


        return true
    }

    //process state input before submit 
    const processStateInput = () => {
        let processedInput = state
        processedInput['searchButton']['width'] += '%'
        processedInput['cameraButton']['width'] += '%'
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
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" type="file" onChange={handleState} name="image" />
                        <Button variant="contained" component="span"  >
                            Upload  #Logo-Login-Img
                        </Button>
                        <FormHelperText style={{ marginLeft: 15, color: 'red' }}>{logoError ? '*required' : null}</FormHelperText>
                    </label>
                </Grid>

                <Grid item sm={12} md={6}>
                    <FormControlLabel control={<Switch onChange={() => {
                        setValue('askForGeoLocation', !state.askForGeoLocation)
                    }} name="askForGeoLocation" checked={state.askForGeoLocation} />} label="askForGeoLocation" />

                </Grid>

                <Grid item sm={12} md={6}>
                    <TextField
                        id="filled-number"
                        label="Text-Width"
                        type="number"
                        name="searchButton-width"
                        value={state.searchButton.width}
                        onChange={e => {
                            setWidthError1(false)
                            if (e.target.value < 10 || e.target.value > 100) {
                                setWidthError1(true)
                            }
                            handleState(e)
                        }
                        }
                        variant="filled"
                        size="small"
                        helperText="Enter value between 10 and 100"
                        error={widthError1}
                    />
                </Grid>
                <Grid item sm={12} md={6}>
                    <TextField
                        id="filled-number"
                        label="Image-Width"
                        type="number"
                        name="cameraButton-width"
                        value={state.cameraButton.width}
                        onChange={e => {
                            setWidthError2(false)
                            if (e.target.value < 10 || e.target.value > 100) {
                                setWidthError2(true)
                            }
                            handleState(e)
                        }
                        }
                        variant="filled"
                        size="small"
                        helperText="Enter value between 10 and 100"
                        error={widthError2}
                    />
                </Grid>


                <Grid item xs={6} sm={6} md={6}>
                    <Typography variant="overline" display="block" gutterBottom>
                        Text-Color
                    </Typography>

                    <input type="color" className="ColorInput"
                        value={state.searchButton.color} onChange={handleState} name="searchButton-color" />

                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                    <Typography variant="overline" display="block" gutterBottom>
                        Text-Background
                    </Typography>
                    <input type="color" className="ColorInput"
                        value={state.searchButton.backgroundColor} onChange={handleState} name="searchButton-backgroundColor" />
                </Grid>

                <Grid item xs={6} sm={6} md={6}>
                    <Typography variant="overline" display="block" gutterBottom>
                        Image-Color
                    </Typography>

                    <input type="color" className="ColorInput" value={state.cameraButton.color}
                        onChange={handleState} name="cameraButton-color" />

                </Grid>


                <Grid item xs={6} sm={6} md={6}>
                    <Typography variant="overline" display="block" gutterBottom>
                        Image-Background
                    </Typography>
                    <input type="color" className="ColorInput"
                        value={state.cameraButton.backgroundColor} onChange={handleState} name="cameraButton-backgroundColor" />
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


