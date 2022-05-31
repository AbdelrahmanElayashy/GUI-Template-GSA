import { useState } from 'react'
import '../../style/App.css';
import { Modal, Button } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/styles';
import { addListCommonTranslationEN } from '../../translation/en';
import { addListCommonTranslationDE } from '../../translation/de';
import { FilterSpin } from './FilterSpin';
import { Actions } from './Actions'
import { FilterMore } from './FilterMore';
import imageHelp from '../../assets/help/partdetails.png'
import { Divider } from '@material-ui/core';
import { FieldList } from './FieldList';

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

export default function PartDetailsForm(props) {

    const FormName = 'partDetails'

    //Handle Modal Show
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Attributes of the Form
    var spinAngle = [];
    var filterMore = [];
    var actions = [];
    var fields = [];
    var en = [];
    var de = [];


    const isValid = () => {
        // no validation in this form.
        return true
    }

    //process state input before submit 
    const processStateInput = () => {
        const state = ({
            "filterSpin": spinAngle[0],
            "filterMore": filterMore[0],
            "fields": fields,
            "actions": actions
        })
        return state
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!isValid()) return

        props.handleNext(FormName, processStateInput())
        addListCommonTranslationDE(de.filter(Boolean))
        addListCommonTranslationEN(en.filter(Boolean))

    };

    return (
        <form onSubmit={handleSubmit}>
            <FieldList fieldName={'dataId'} fields={fields} en={en} de={de} />
            <Divider />

            <FilterMore state={filterMore} />
            <Divider />

            <FilterSpin state={spinAngle} />
            <Divider />
            <Actions state={actions} />


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



