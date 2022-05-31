import { useState } from 'react'
import '../../style/App.css';
import imageHelp from '../../assets/help/company.png'
import { doAppExists } from '../../services/azureBlobController';
import { Alert, Box, Button, Modal, TextField, Checkbox, FormControlLabel } from '@mui/material';


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


export default function CompanyForm(props) {

    //Handle Modal Show
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [checking, setChecking] = useState({ msg: '', variant: '' })
    const [alert, setAlert] = useState(false)
    const [submitShow, setSubmitShow] = useState(false)
    const [appName, setAppName] = useState('')
    const [deployApp, setDeployApp] = useState(true)

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        props.handler(appName, deployApp)
    };

    const handleAppName = (event) => {

        const str = event.target.value
        if (str.length < 2) {
            setChecking({ msg: 'at least 2 characters', variant: 'error' })
            setSubmitShow(false)
            setAlert(true)
            return
        }

        if (!str.match("^[A-Za-z0-9-]+$")) {
            setChecking({ msg: 'can only contains letters, numbers and dash', variant: 'error' })
            setAlert(true)
            setSubmitShow(false)
            return
        }

        setAlert(true)
        doAppExists(event.target.value)
            .then((resolve) => {
                setSubmitShow(false)
                setChecking({ msg: `${str} is already exists!`, variant: 'error' })
                //setChecking({ msg: `Do you want to update ${str}?`, variant: 'warning' })
            }).catch(reject => {
                setAppName(event.target.value)
                console.log(event.target.value)
                setSubmitShow(true)
                setChecking({ msg: 'App name is valid', variant: 'success' })
            });

    }

    return (
        <form onSubmit={handleSubmit} >
            <div style={{ maxWidth: 210, paddingTop: 5 }}>
                <TextField
                    id="outlined"
                    label="App name"
                    onChange={handleAppName}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                {alert ? <Alert severity={checking.variant}>{checking.msg}</Alert> : null}
            </div>

            {submitShow ?
                <>
                    <FormControlLabel
                        label='Deploy app'
                        control={<Checkbox size="small" checked={deployApp} onChange={() => { setDeployApp(!deployApp) }} color="primary" />}
                    />
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
                                    <img src={imageHelp} className="img-fluid" />
                                </Box>
                            </Modal>
                            {/* <Button
                            disabled={props.currentIndex === 0}
                            onClick={props.handleBack}
                            sx={{ mt: 1, mr: 1 }}
                        >
                            Back
                        </Button> */}

                        </div>
                    </Box>
                </>
                : null
            }
        </form>
    );
}










