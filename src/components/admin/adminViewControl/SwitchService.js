import '../../../style/App.css';
import { Button, ButtonGroup } from '@mui/material';


export default function SwitchService(props) {

    return (
        <>

            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={() => { props.updateCurrentComponent('TextSearchForm') }}>Text search</Button>
                <Button onClick={() => { props.updateCurrentComponent('ImageSearchForm') }}>Image search</Button>
                <Button onClick={() => { props.updateCurrentComponent('PiplineIDForm') }}> Pipline ID</Button>
            </ButtonGroup>


        </>
    );
}


