import { useState, useEffect } from 'react'
import '../../style/App.css';
import loginHelp from '../../assets/help/listview.png'
import { Modal, Typography, Button, FormControlLabel, Checkbox, Alert } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/styles';


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

export default function ListViewForm(props) {

    const FormName = 'listView'

    //Handle Modal Show
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //Data
    const fields = props.getFields()
    const [state, setState] = useState([])

    useEffect(() => {
        const checkedFields = Object.keys(fields).map(key => {
            console.log(key)
            return ({
                "dataId": fields[key].dataId,
                "translationId": fields[key].translationId,
                "checked": false
            })
        })
        console.log(checkedFields)
        setState(checkedFields)
    }, []);



    const isValid = () => {
        // no validation in this form.
        return true
    }

    //process state input before submit 
    const processStateInput = () => {
        return {
            "itemInfoFields": Object.keys(state).map(key => {
                return {
                    "fieldId": state[key].dataId,
                    "translationId": state[key].translationId,
                }
            }) //fieldId, translationId
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!isValid()) return
        console.log(processStateInput())
        props.handleNext(FormName, processStateInput())

    };

    const handleChange = (e) => {

        const newState = Object.keys(state).map(key => {
            if (key !== e.target.name) {
                return state[key]
            }
            return { ...state[key], checked: !state[e.target.name].checked }
        })

        setState(newState)

    }

    const handleChangeParent = (e, isInputChecked) => {

        const newState = Object.keys(state).map(key => { return { ...state[key], checked: isInputChecked } })
        console.log(newState, 'parent')
        setState(newState)
    }

    console.log(state, 'state!!!!')
    return (
        <form onSubmit={handleSubmit}>
            {fields.length === 0 && <Alert severity='error'>List is empty! Add fields in partDetails form</Alert>}
            <div>
                {fields.length !== 0 &&
                    <FormControlLabel
                        label={<Typography variant="overline" display="block" gutterBottom>
                            List view
                        </Typography>}
                        control={
                            <Checkbox
                                checked={Object.keys(state).map(i => state[i].checked)
                                    .reduce((sum, item) => sum && item, true)}
                                onChange={handleChangeParent}
                                color="primary"
                            />
                        }
                    />}
                <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3, flexWrap: 'wrap' }}>
                    {
                        Object.keys(state).map((checkedField, index) => {
                            console.log(index)
                            console.log(state[checkedField].checked)
                            return (
                                <FormControlLabel
                                    label={`${state[checkedField].dataId}`}
                                    key={state[checkedField].dataId}
                                    control={<Checkbox size="small" checked={state[checkedField].checked} name={`${index}`} onChange={handleChange} color="primary" />}
                                />
                            )
                        })
                    }
                </Box>
            </div>
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


















