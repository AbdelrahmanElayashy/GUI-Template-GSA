import { useState } from 'react'
import '../../style/App.css';
import loginHelp from '../../assets/help/menu.png'
import { Modal, Typography, Grid, Button } from '@mui/material';
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

export default function MenuForm(props) {

    const FormName = 'menu'

    //Handle Modal Show
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    //Form
    const [state, handleState] = useForm({
        backgroundColor: '#1976d2',
        color: '#FFFFFF'
    })

    const isValid = () => {
        // no validation in this form.
        return true
    }

    //process state input before submit 
    const processStateInput = () => {
        // no processing input in this form.
        return state
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


                <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="overline" display="block" gutterBottom>
                        Text-Color
                    </Typography>

                    <input type="color" className="ColorInput"
                        value={state.color} onChange={handleState} name="color" />

                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="overline" display="block" gutterBottom>
                        Background
                    </Typography>
                    <input type="color" className="ColorInput"
                        value={state.backgroundColor} onChange={handleState} name="backgroundColor" />
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





