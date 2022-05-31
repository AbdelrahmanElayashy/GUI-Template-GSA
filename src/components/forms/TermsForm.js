import { useState } from 'react'
import '../../style/App.css';
import loginHelp from '../../assets/help/term.png'
import { Modal, TextField, Typography, Grid, Button, FormHelperText } from '@mui/material';
import { Box} from '@mui/system';
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

export default function TermsForm(props) {

    const FormName = 'termsAndConditions'

    //Handle Modal Show
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //validations
    const [widthError, setWidthError] = useState(false)
    //const [supergrahicError, setSupergraphicError] = useState(false)


    //Form
    const [state, handleState, setValue] = useForm({
        acceptButton: {
            width: '100',
            backgroundColor: '#1976d2',
            color: '#FFFFFF'
        },
        supergraphic: process.env.REACT_APP_SUPERGRAPIC
    })

    const isValid = () => {
        if (widthError) return false

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
        processedInput['acceptButton']['width'] += '%'
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

                <Grid item sm={12} md={12}>
                    <TextField
                        id="filled-number"
                        label="Button-Width"
                        type="number"
                        name="acceptButton-width"
                        value={state.acceptButton.width}
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
                        Button-Color
                    </Typography>

                    <input type="color" className="ColorInput" value={state.acceptButton.color}
                        onChange={handleState} name="acceptButton-color" />

                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="overline" display="block" gutterBottom>
                        Button-Background
                    </Typography>
                    <input type="color" className="ColorInput"
                        value={state.acceptButton.backgroundColor} onChange={handleState} name="acceptButton-backgroundColor" />
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










